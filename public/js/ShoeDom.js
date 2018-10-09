let searchBtnElement = document.getElementById('searchButton');
let inCartBtn = document.getElementById('in-cart-btn');
let noStockBtn = document.getElementById('no-stock-btn');
// a little halper that re-renders the template to keep data alive 
let refresh = function () {
    let prevSpecs = localStorage.getItem('prevSpecs');
    axios.get(prevSpecs).then(function (res) {
        displayShoes(res.data.data);
    });
};
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
            refresh();
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
};
let displayShoes = function (shoesToDisplay) {
    let shoesData = {};
    shoesData['shoes'] = shoesToDisplay
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
        document.querySelector(`#${modal}`).style.display = "none";
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
            let route = 'api/shoes';
            axios.get(route).then(function (res) {
                displayShoes(res.data.data);
            });
            localStorage.setItem('prevSpecs', route);
        } else if (specs.brand !== 'null' && specs.size == 'null') {
            let route = `api/shoes/brand/${specs.brand}`;
            axios.get(route).then(function (res) {
                displayShoes(res.data.data);
            });
            localStorage.setItem('prevSpecs', route);
        } else if (specs.brand !== 'null' && specs.size !== 'null') {
            let route = `api/shoes/brand/${specs.brand}/size/${specs.size}`;
            axios.get(route).then(function (res) {
                displayShoes(res.data.data)
            });
            localStorage.setItem('prevSpecs', route);
        } else if (specs.brand == 'null' && specs.size !== 'null') {
            let route = `api/shoes/size/${specs.size}`;
            axios.get(route).then(function (res) {
                displayShoes(res.data.data)
            });
            localStorage.setItem('prevSpecs', route);
        };
    } finally {


    }

});
// EVENTS FOR MODALS
inCartBtn.addEventListener('click', function () {
    cartModalAction('inCartModal', 'deactivate')
}, false)

noStockBtn.addEventListener('click', function () {
    cartModalAction('noStockModal', 'deactivate')
}, false)