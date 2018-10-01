module.exports = function ShoeServices(pool) {

    let getAll = async function (specs) {
        let sql = 'SELECT * FROM shoes'
        let result = await pool.query(sql);
        return result.rows
    }
    let getBrand = async function (specs) {
        let sql = 'SELECT * FROM shoes WHERE brand=$1'
        let params = [specs.brand];
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