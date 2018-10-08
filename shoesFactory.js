module.exports = function ShoeServices(pool) {

    //given specifications from the DOM, get color,size and brand id from the database.
    let getIds = async function (specs) {
        let res = {};
        try {
            let specsKeys = Object.keys(specs);
            for (let i = 0; i < specsKeys.length; i++) {
                let sql = `SELECT id FROM ${specsKeys[i]}s WHERE ${specsKeys[i]}=$1`;
                let params = [specs[specsKeys[i]]];
                let result = await pool.query(sql, params);
                if (result.rowCount == 1) {
                    res[`${specsKeys[i]}Id`] = result.rows[0].id;
                };
            };
        } finally {
            return res
        };
    };
    // This methods fetch the shoes(s) from the database given the specifications object.
    let getAll = async function (specs) {
        let sql = 'SELECT shoes.id,qty,price,brand,color,img_link,size from shoes join sizes on size_id=sizes.id join brands on shoes.brand_id=brands.id join colors on shoes.color_id=colors.id join images on shoes.image_id=images.id'
        let result = await pool.query(sql);
        return result.rows
    };
    // get brand/size and brand+size
    let getBrandSize = async function (specs) {
        let getSpecKeys = Object.keys(specs);
        let specsIds = await getIds(specs);
        let filter = Object.keys(specs)[0];
        let sql = `SELECT shoes.id,qty,price,brand,color,img_link,size from shoes join sizes on size_id=sizes.id join brands on shoes.brand_id=brands.id join colors on shoes.color_id=colors.id join images on shoes.image_id=images.id WHERE ${filter}_id=${specsIds[filter + 'Id']}`;

        if (getSpecKeys.length == 1) {
            let result = await pool.query(sql);
            return result.rows
        } else if (getSpecKeys.length == 2) {
            let filter1 = Object.keys(specs)[1];
            sql = sql + ` AND ${filter1}_id=${specsIds[filter1+'Id']}`
            let result = await pool.query(sql);
            return result.rows
        };
    };


    // Add a shoe item into the database.
    let addShoe = async function (addSpecs) {
        let shoeAddIds = await getIds(addSpecs);
        try {
            //slice the keys array to get only brand,color and size
            let addSpecsKeys = Object.keys(addSpecs).slice(0, 3);
            for (let i = 0; i < addSpecsKeys.length; i++) {
                if (!shoeAddIds[`${addSpecsKeys[i]}Id`]) {
                    let sql = `INSERT INTO ${addSpecsKeys[i]}s (${addSpecsKeys[i]}) values($1) RETURNING id`;
                    let params = [addSpecs[addSpecsKeys[i]]];
                    let result = await pool.query(sql, params);
                    shoeAddIds[`${addSpecsKeys[i]}Id`] = result.rows[0].id
                }
            }
        } finally {
            // Check if shoe exists in the database, if not proceed and insert it.
            let selectSql = 'select exists(select 1 from shoes WHERE color_id=$1 AND brand_id=$2 AND size_id=$3);';
            let selectParams = [shoeAddIds.colorId, shoeAddIds.brandId, shoeAddIds.sizeId];
            let selectResult = await pool.query(selectSql, selectParams);
            let exists = selectResult.rows[0].exists;

            if (exists) {
                return 'shoe already in store'
            } else {
                let sql = 'INSERT INTO shoes (qty,price,size_id,brand_id,image_id,color_id) values ($1,$2,$3,$4,$5,$6) RETURNING id;';
                let params = [addSpecs.qty, addSpecs.price, shoeAddIds.sizeId, shoeAddIds.brandId, addSpecs['img_link'], shoeAddIds.colorId];
                let result = await pool.query(sql, params);
                return result.rows
            };
        };
    };
    // reduce or gain stock during sales and shoe returns
    let updateStock = async function (shoeId, action) {
        if (action == 'reduce') {
            // check if the shoe is not already in the cart
            let checkCart = await pool.query('SELECT FROM cart WHERE shoe_id=$1', [shoeId]);
            if (checkCart.rowCount == 0) {
                // first check if the quantity is at least 1 and only reduce if true
                let checkQty = await pool.query('SELECT qty FROM shoes WHERE id=$1', [shoeId]);
                if (checkQty.rows[0].qty > 0) {
                    let sql = 'UPDATE shoes SET qty = qty-1 WHERE id=$1';
                    let params = [shoeId];
                    await pool.query(sql, params);
                    updateCart(shoeId, 'add');
                    return 'addedToCart'
                } else {
                    return 'emptyStock'
                };
            } else if (checkCart.rowCount == 1) {
                return 'shoeInCart'
            };
        };
        if (action == 'gain') {
            let sql = 'UPDATE shoes SET qty = qty+1 WHERE id=$1';
            let params = [shoeId];
            await pool.query(sql, params);
            updateCart(shoeId, 'remove');
            return 'shoeRemoved'
        } else {
            return 'failure'
        };
    };
    //clear,remove or add shoes into the cart
    let updateCart = async function (shoeId, action) {
        if (!shoeId && action == 'clear') {
            await pool.query('DELETE FROM cart');
            return 'cartCleared'
        } else {
            if (action == 'add') {
                await pool.query('INSERT INTO cart (shoe_id) values ($1)', [shoeId]);
            };
            if (action == 'remove') {
                await pool.query('DELETE FROM cart WHERE shoe_id=$1', [shoeId]);
            }
        };
    };
    let getCart = async function () {
        let cart = [];
        //get ids of shoes in stock,make join for all of them and display
        let result = await pool.query('SELECT * FROM cart');
        let shoesInCart = result.rows;
        try {
            for (let i = 0; i < shoesInCart.length; i++) {
                let sql = `SELECT shoes.id,qty,price,brand,color,img_link,size from shoes join sizes on size_id=sizes.id join brands on shoes.brand_id=brands.id join colors on shoes.color_id=colors.id join images on shoes.image_id=images.id WHERE shoes.id=${shoesInCart[i].shoe_id}`;
                let cartShoes = await pool.query(sql);
                cart.push(cartShoes.rows[0]);
            }
        } finally {
            return cart
        }
    }
    return {
        getAll,
        getBrandSize,
        getIds,
        addShoe,
        updateStock,
        getCart,
        updateCart
    }
};