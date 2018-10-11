// get elements from the HTML
let addBtnElement = document.querySelector('#addButton');
let addShoeBrand = document.querySelector('#addShoeBrand');
let addShoeColor = document.querySelector('#addShoeColor');
let addShoeSize = document.querySelector('#addShoeSize');
let addShoeQty = document.querySelector('#addShoeQty');
let addShoePrice = document.querySelector('#addShoePrice');
let modalOkay = document.querySelector('.modal-ok-button');

// take values and send shoe to the server side
let sendShoe = function () {
    let addSpecs = {};
    addSpecs.brand = addShoeBrand.value;
    addSpecs.color = addShoeColor.value;
    addSpecs.size = addShoeSize.value;
    addSpecs.price = addShoePrice.value;
    addSpecs.qty = addShoeQty.value;
    addSpecs["img_link"] = 0;


    if (Object.values(addSpecs).includes("")) {
        //just do nothing
        // even if ragex will handle empty values,code must not query with empty values
        //since the submit method will still run
        //this if statement will stop the code from querying
    } else {
        axios.post('/api/shoes', addSpecs)
            .then(function (response) {
                if (response.data.data[0].id) {
                    document.getElementById('shoeAddedModal').style.display = "flex";
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
};
modalOkay.addEventListener('click', function () {
    document.getElementById('shoeAddedModal').style.display = "none";
    location.reload();
}, false)