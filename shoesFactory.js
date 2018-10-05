module.exports = function ShoeServices(pool) {

    //given specifications from the DOM, get color,size and brand id from the database.
    let getIds = async function (specs) {
        let res = {};
        try {
            if (specs.brand) {
                let sql = 'SELECT id FROM brands WHERE brand=$1';
                let params = [specs.brand];
                let result = await pool.query(sql, params);
                if (result.rows[0].id) {
                    res.brandId = result.rows[0].id;
                };
            };
            if (specs.size) {
                let sql = 'SELECT id FROM sizes WHERE size=$1';
                let params = [specs.size];
                let result = await pool.query(sql, params);
                if (result.rows[0].id) {
                    res.sizeId = result.rows[0].id;
                };
            };
            if (specs.color) {
                let sql = 'SELECT id FROM colors WHERE color=$1';
                let params = [specs.color];
                let result = await pool.query(sql, params);
                if (result.rows[0].id) {
                    res.colorId = result.rows[0].id
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

    let getBrand = async function (specs) {
        let brandId = await getIds(specs);
        let sql = 'SELECT qty,price,brand,color,img_link,size from shoes join sizes on size_id=sizes.id join brands on shoes.brand_id=brands.id join colors on shoes.color_id=colors.id join images on shoes.image_id=images.id WHERE brand_id=$1'
        let params = [brandId.brandId];
        let result = await pool.query(sql, params);
        return result.rows
    };

    let getSize = async function (specs) {
        let sizeId = await getIds(specs);
        let sql = 'SELECT qty,price,brand,color,img_link,size from shoes join sizes on size_id=sizes.id join brands on shoes.brand_id=brands.id join colors on shoes.color_id=colors.id join images on shoes.image_id=images.id WHERE size_id=$1';
        let params = [sizeId.sizeId];
        let result = await pool.query(sql, params);
        return result.rows
    };

    let getBrandSize = async function (specs) {
        let sizeBrandIds = await getIds(specs);
        let sql = 'SELECT qty,price,brand,color,img_link,size from shoes join sizes on size_id=sizes.id join brands on shoes.brand_id=brands.id join colors on shoes.color_id=colors.id join images on shoes.image_id=images.id WHERE brand_id=$1 AND size_id=$2';
        let params = [sizeBrandIds.brandId, sizeBrandIds.sizeId];
        let result = await pool.query(sql, params);
        return result.rows
    };
    // Add a shoe item into the database.
    let addShoe = async function (addSpecs) {
        let shoeAddIds = await getIds(addSpecs);
        try {
            // Check if there are id's that do not exist in the current stock, if found create the brand,color or size and write the id into the shoeAddIds object.
            if (!shoeAddIds.sizeId) {
                let sql = 'INSERT INTO sizes (size) values($1) RETURNING id';
                let params = [addSpecs.size];
                let result = await pool.query(sql, params);
                shoeAddIds.sizeId = result.rows[0].id
            };
            if (!shoeAddIds.colorId) {
                let sql = 'INSERT INTO colors (color) values($1) RETURNING id';
                let params = [addSpecs.color];
                let result = await pool.query(sql, params);
                shoeAddIds.colorId = result.rows[0].id;
            };
            if (!shoeAddIds.brandId) {
                let sql = 'INSERT INTO brands (brand) values($1) RETURNING id';
                let params = [addSpecs.brand];
                let result = await pool.query(sql, params);
                shoeAddIds.brandId = result.rows[0].id;
            };
        } finally {
            // Check if shoe exists in the database, if not proceed and insert it.
            let selectSql = 'select exists(select 1 from shoes WHERE color_id=$1 AND brand_id=$2 AND size_id=$3);';
            let selectParams = [shoeAddIds.colorId, shoeAddIds.brandId, shoeAddIds.sizeId];
            let selectResult = await pool.query(selectSql, selectParams);
            let exists = selectResult.rows[0].exists;

            if (exists) {
                return 'shoe already in store'
            } else {
                let sql = 'INSERT INTO shoes (qty,price,size_id,brand_id,image_id,color_id) values ($1,$2,$3,$4,$5,$6);';
                let params = [addSpecs.qty, addSpecs.price, shoeAddIds.sizeId, shoeAddIds.brandId, addSpecs['img-link'], shoeAddIds.colorId];
                await pool.query(sql, params);
                return 'shoe added successfully'
            };
        };
    };

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

    let updateCart = async function (shoeId, action) {
        if (action == 'add') {
            await pool.query('INSERT INTO cart (shoe_id) values ($1)', [shoeId]);
        };
        if (action == 'remove') {
            await pool.query('DELETE FROM cart WHERE shoe_id=$1', [shoeId]);
        };
    };
    let getCart = async function () {
        let result = await pool.query('SELECT * FROM cart JOIN shoes ON cart.shoe_id=shoes.id;');
        return result.rows;
    }
    return {
        getAll,
        getBrand,
        getSize,
        getBrandSize,
        addShoe,
        updateStock,
        getCart
    }
};