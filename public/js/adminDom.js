let addBtnElement = document.getElementById('addButton');


addBtnElement.addEventListener('click', function run() {
    let addShoeBrand = document.getElementById('addShoeBrand').value;
    let addShoeColor = document.getElementById('addShoeColor').value;
    let addShoeSize = document.getElementById('addShoeSize').value;
    let addShoeQty = document.getElementById('addShoeQty').value;
    let addShoePrice = document.getElementById('addShoePrice').value;
    let addSpecs = {};
    if ((addShoeBrand !== "null") && (addShoeColor !== "null") && (addShoeSize !== "null") && (addShoeQty !== "") && (addShoePrice !== "")) {
        addSpecs.brand = addShoeBrand;
        addSpecs.color = addShoeColor;
        addSpecs.size = addShoeSize;
        addSpecs.price = addShoePrice;
        addSpecs.qty = addShoeQty;
        addSpecs["img-link"] = 0;
        axios.post('/api/shoes', addSpecs)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

});