let searchBtnElement = document.getElementById('searchButton');

let addToCart = function (shoe) {
    shoes.addToCart(shoe);
    let prevSpecs = JSON.parse(localStorage.getItem('specs'));
    displayShoes(shoes.getShoes(prevSpecs));
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

let cartModalAction = function (action) {
    if (action == 'activate') {
        document.querySelector('.bg-modal').style.display = "flex";
    }
    if (action == 'deactivate') {
        document.querySelector('.bg-modal').style.display = "none";
    }
}

cartModalAction('activate');

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