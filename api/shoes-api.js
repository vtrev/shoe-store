module.exports = function (shoesInstance) {
    let all = async function (req, res) {
        try {
            let result = await shoesInstance.getAll({
                brand: 'all'
            });
            res.json({
                status: 'success',
                data: result
            });
        } catch (err) {
            console.log(err);
        };
    };
    // method to get shoes by brand name
    let brand = async function (req, res) {
        let specs = {
            brand: req.params.brand
        }
        try {
            let result = await shoesInstance.getBrand(specs);
            res.json({
                status: 'success',
                data: result
            });
        } catch (err) {
            console.log(err)
        };
    };

    // method to get shoes by size
    let size = async function (req, res) {
        let specs = {
            size: req.params.size
        };
        try {
            let result = await shoesInstance.getSize(specs);
            res.json({
                status: 'success',
                data: result
            });
        } catch (err) {
            console.log(err)
        };
    };
    // get shoes by brand name and size
    let brandSize = async function (req, res) {
        let specs = {
            brand: req.params.brandname,
            size: req.params.size
        }
        try {
            result = await shoesInstance.getBrandSize(specs);
            res.json({
                status: 'success',
                data: result
            });

        } catch (err) {
            console.log(err)
        };


    };
    // post route to add shoes into the database
    let addShoe = async function (req, res) {
        let addSpecs = req.body;
        try {
            result = await shoesInstance.addShoe(addSpecs);
            res.json({
                status: 'success',
                data: result
            });

        } catch (err) {
            console.log(err)
        };
        console.log();
    }

    return {
        all,
        brand,
        size,
        brandSize,
        addShoe
    };

};