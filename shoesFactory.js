module.exports = function ShoeServices(pool) {

    let getShoes = async function (specs) {
        console.log(specs);
        let colors = ['Black', 'White'];
        let brands = ['Adidas', 'Nike'];

        if (specs.brand == 'all') {
            let sql = 'SELECT * FROM shoes'
            let result = await pool.query(sql);
            return result.rows
        } else {
            let color = colors.includes(specs.color);
            let brand = brands.includes(specs.brand)
            if (brand) {
                let sql = 'SELECT * FROM shoes WHERE brand=$1'
                let params = [specs.brand];
                let result = await pool.query(sql, params);
                return result.rows
            }
        }
    };

    return {
        getShoes
    };

};