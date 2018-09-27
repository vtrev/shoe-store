module.exports = function ShoeServices(pool) {

    let getShoes = async function (id) {
        if (id == 'all') {
            let sql = 'SELECT * FROM shoes'
            let result = await pool.query(sql);
            return result.rows
        };
    };

    return {
        getShoes
    };

};