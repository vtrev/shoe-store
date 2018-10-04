module.exports = function ShoeServices(pool) {
    let getIds = async function (specs) {
        let res = {};
        try {
            if (specs.brand) {
                let sql = 'SELECT id FROM brands WHERE brand=$1';
                let params = [specs.brand];
                let result = await pool.query(sql, params);
                res.brandId = result.rows[0].id;
            }
            if (specs.size) {
                let sql = 'SELECT id FROM sizes WHERE size=$1';
                let params = [specs.size];
                let result = await pool.query(sql, params);
                res.sizeId = result.rows[0].id;
            }
        } finally {
            return res
        }
    }

    let getAll = async function (specs) {
        let sql = 'SELECT qty,price,brand,color,img_link,size from shoes join sizes on size_id=sizes.id join brands on shoes.brand_id=brands.id join colors on shoes.color_id=colors.id join images on shoes.image_id=images.id'
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
        let sizeId = await getIds(specs);
        let sql = 'SELECT qty,price,brand,color,img_link,size from shoes join sizes on size_id=sizes.id join brands on shoes.brand_id=brands.id join colors on shoes.color_id=colors.id join images on shoes.image_id=images.id WHERE size_id=$1';
        let params = [sizeId.sizeId];
        let result = await pool.query(sql, params);
        return result.rows
    }
    let getBrandSize = async function (specs) {
        let sizeBrandIds = await getIds(specs);
        let sql = 'SELECT qty,price,brand,color,img_link,size from shoes join sizes on size_id=sizes.id join brands on shoes.brand_id=brands.id join colors on shoes.color_id=colors.id join images on shoes.image_id=images.id WHERE brand_id=$1 AND size_id=$2';
        let params = [sizeBrandIds.brandId, sizeBrandIds.sizeId];
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