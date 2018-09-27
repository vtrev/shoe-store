module.exports = function (shoesInstance) {
    let all = async function (req, res) {
        try {
            let result = await shoesInstance.getShoes({
                shoeBrand: 'all'
            });
            res.json({
                status: 'success',
                data: result
            });
        } catch (err) {
            console.log(err);
        };
    };

    let brand = async function (req, res) {
        let specs = {
            brand: req.params.brand,
            color: req.params.color
        }
        try {

            let result = await shoesInstance.getShoes(specs);

            console.log(result);

            res.json({
                status: 'success',
                data: result
            });

        } catch (err) {
            console.log(err)
        }
    }

    return {
        all,
        brand
    }

};