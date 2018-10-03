module.exports = function ShoeServices(pool) {

    let getIds = async function (specs) {
        let res = {};
        try {
            if (specs.brand) {
                const sql = 'SELECT id FROM brands WHERE brand=$1';
                const params = [specs.brand];
                const result = await pool.query(sql, params);
                res.brandId = result.rows[0].id;
            }
        } finally {
            return res
        }
    }

    let getAll = async function (specs) {
        const sql = 'SELECT qty,price,brand,color,img_link,size from shoes join sizes on size_id=sizes.id join brands on shoes.brand_id=brands.id join colors on shoes.color_id=colors.id join images on shoes.image_id=images.id'
        let result = await pool.query(sql);
        return result.rows
    }
    let getBrand = async function (specs) {
        let brandId = await getIds(specs);
        let sql = 'SELECT qty,price,brand,color,img_link,size from shoes join sizes on size_id=sizes.id join brands on shoes.brand_id=brands.id join colors on shoes.color_id=colors.id join images on shoes.image_id=images.id WHERE brand_id=$1'
        let params = [brandId.brandId];
        let result = await pool.query(sql, params);
        return result.rows
    }
    let getSize = async function (specs) {
        let sql = 'SELECT * FROM shoes WHERE size=$1';
        let params = [specs.size];
        let result = await pool.query(sql, params);
        return result.rows
    }
    let getBrandSize = async function (specs) {
        let sql = 'SELECT * FROM shoes WHERE brand=$1 AND size=$2';
        let params = [specs.brand, specs.size];
        let result = await pool.query(sql, params)
        return result.rows
    }
    return {
        getAll,
        getBrand,
        getSize,
        getBrandSize
    };

};