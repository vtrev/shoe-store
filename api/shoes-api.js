module.exports = function (shoesInstance) {
    // get shoes apis
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

    let brand = async function (req, res) {
        let specs = {
            brand: req.params.brand
        }
        try {
            let result = await shoesInstance.getBrandSize(specs);
            res.json({
                status: 'success',
                data: result
            });
        } catch (err) {
            console.log(err)
        };
    };

    let size = async function (req, res) {
        let specs = {
            size: req.params.size
        };
        try {
            let result = await shoesInstance.getBrandSize(specs);
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
            let result = await shoesInstance.getBrandSize(specs);
            res.json({
                status: 'success',
                data: result
            });

        } catch (err) {
            console.log(err)
        };
    };
    // add shoes into the catalogue
    let addShoe = async function (req, res) {
        let addSpecs = req.body;
        try {
            let result = await shoesInstance.addShoe(addSpecs);
            res.json({
                status: 'success',
                data: result
            });

        } catch (err) {
            console.log(err)
        };
    };
    //update the quantity of the shoes in stock
    let updateQty = async function (req, res) {
        let shoeId = req.body.shoeId;
        let action = req.body.action;
        try {
            let result = await shoesInstance.updateStock(shoeId, action);
            res.json({
                status: 'success',
                data: result
            });

        } catch (err) {
            console.log(err)
        };

    }
    let cart = async function (req, res) {
        try {
            let result = await shoesInstance.getCart();
            res.json({
                status: 'success',
                data: result
            });
        } catch (err) {
            console.log(err)
        };
    }

    return {
        all,
        brand,
        size,
        brandSize,
        addShoe,
        updateQty,
        cart

    };
};