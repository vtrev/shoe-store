let searchBtnElement = document.getElementById('searchButton');
let inCartBtn = document.getElementById('in-cart-btn');
let noStockBtn = document.getElementById('no-stock-btn');


let addToCart = function (shoeId) {
    axios.post(`/api/shoes/sale/${shoeId}`, {
            shoeId,
            action: 'reduce'
        })
        .then(function (response) {
            if (response.data.data == 'shoeInCart') {
                cartModalAction('inCartModal', 'activate')
            } else if (response.data.data == "emptyStock") {
                cartModalAction('noStockModal', 'activate')
            }
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
};
let displayShoes = function (shoesToDisplay) {
    let shoesData = {};
    shoesData['shoes'] = shoesToDisplay.reverse()
    var shoesDataElement = document.getElementById("shoesArea");
    var shoesDataTemplateSource = document.getElementById("shoesTemplate").innerHTML;
    var shoesTemplate = Handlebars.compile(shoesDataTemplateSource);
    var shoesHTML = shoesTemplate(shoesData);
    shoesDataElement.innerHTML = shoesHTML;
};

let cartModalAction = function (modal, action) {
    if (action == 'activate') {
        // document.querySelector('#inCartModal').style.display = "flex";
        document.querySelector(`#${modal}`).style.display = "flex";
    }
    if (action == 'deactivate') {
        document.querySelector('.bg-modal').style.display = "none";
    }
}

// cartModalAction('activate');

searchBtnElement.addEventListener('click', function search() {
    let specs = {};
    specs.brand = document.getElementById('shoeBrand').value;
    specs.color = document.getElementById('shoeColor').value;
    specs.size = document.getElementById('shoeSize').value;
    try {
        if (specs.brand == 'null' && specs.size == 'null') {
            axios.get('api/shoes').then(function (res) {
                displayShoes(res.data.data);
            });
        } else if (specs.brand !== 'null' && specs.size == 'null') {
            axios.get(`api/shoes/brand/${specs.brand}`).then(function (res) {
                displayShoes(res.data.data);
            });
        } else if (specs.brand !== 'null' && specs.size !== 'null') {
            axios.get(`api/shoes/brand/${specs.brand}/size/${specs.size}`).then(function (res) {
                displayShoes(res.data.data)
            });
        } else if (specs.brand == 'null' && specs.size !== 'null') {
            axios.get(`api/shoes/size/${specs.size}`).then(function (res) {
                displayShoes(res.data.data)
            });
        };
    } finally {


    }

});
// EVENTS FOR MODALS
inCartBtn.addEventListener('click', function () {
    cartModalAction('modal', 'deactivate')
}, false)

noStockBtn.addEventListener('click', function () {
    cartModalAction('modal', 'deactivate')
}, false)