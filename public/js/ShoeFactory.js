let ShoeFactory = function (shoesData) {

    let getShoes = function (specs) {

        if (!specs.id) {
            localStorage.setItem('specs', JSON.stringify(specs));
        }
        let filteredShoes = shoesData.filter(function (shoe) {
            let objectKeys = Object.keys(specs);
            let holding = 0;
            for (let i = 0; i < objectKeys.length; i++) {
                holding += (shoe[objectKeys[i]] == specs[objectKeys[i]])
            };
            if (holding == objectKeys.length) {
                return true
            };
        });
        return filteredShoes;
    };
    // ============================================= ADD TO CART ====================================================== //
    let addToCart = function (item) {
        let tmpCart = JSON.parse(localStorage.getItem('cart')) || [];
        let shoeToAdd = getShoes({
            id: item
        });

        if (!tmpCart.some(function (shoe) {
                return shoe.id === shoeToAdd[0].id;
            })) {
            if (shoeToAdd[0].qty > 0) {
                shoeToAdd[0].qty--;
                tmpCart.push(shoeToAdd[0]);
                localStorage.setItem('shoesData', JSON.stringify(shoesData));
                localStorage.setItem('cart', JSON.stringify(tmpCart));
            };

        };
    };


    // =======================================================DO SALES ========================================================//
    let doSales = function (specs) {
        let tmpShoe = getShoes(specs);
        let buyItem = function () {
            if (tmpShoe[0].qty > 0) {
                tmpShoe[0].qty--;
                return tmpShoe
            };
        };
        let returnItem = function () {
            tmpShoe[0].qty++;
            return tmpShoe
        };
        return {
            buyItem,
            returnItem
        };
    };
    // ============================================ADD SHOE================================================================== //
    // function to  add more shoes to the shoeData

    let addShoe = function (shoeObject) {

        let existingShoe = shoesData.filter(function (shoeItem) {
            return shoeItem.id == shoeObject.id;
        });
        //if the shoe does not exist, the length will be 0
        if (existingShoe.length !== 0) {
            console.log('shoe already added');
            //just gain the qty
            return shoesData
        } else {
            shoesData.push({
                brand: shoeObject.brand,
                color: shoeObject.color,
                price: shoeObject.price,
                id: shoeObject.id,
                qty: shoeObject.qty,
                size: shoeObject.size,
                "img-link": shoeObject["img-link"]
            });
            let addedShoe = getShoes({
                id: shoeObject.id
            });
            localStorage.setItem('shoesData', JSON.stringify(shoesData));
        };
        // return 
    };
    return {

        getShoes,
        addToCart,
        addShoe
    }

};