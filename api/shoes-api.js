module.exports = function (shoesInstance) {
    let all = async function (req, res) {
        try {
            let result = await shoesInstance.getShoes('all');
            res.json({
                status: 'success',
                data: result
            });
        } catch (err) {
            next(err);
        }
    }

    return {
        all
    }

};