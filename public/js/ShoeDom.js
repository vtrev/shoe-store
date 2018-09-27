let localShoes = JSON.parse(localStorage.getItem('shoesData'));

let shoes;
// console.log(localShoes);
if (localShoes) {
    console.log('found catalogue on local storage')
    shoes = ShoeFactory(localShoes);
} else {
    console.log('using defualt catalogue')
    shoes = ShoeFactory(shoesArray);
}


let searchBtnElement = document.getElementById('searchButton');

let addToCart = function (shoe) {
    shoes.addToCart(shoe);
    let prevSpecs = JSON.parse(localStorage.getItem('specs'));
    displayShoes(shoes.getShoes(prevSpecs));

}

let displayShoes = function (shoesToDisplay) {

    let shoesData = {};
    shoesData['shoes'] = shoesToDisplay.reverse()
    var shoesDataElement = document.getElementById("shoesArea");
    var shoesDataTemplateSource = document.getElementById("shoesTemplate").innerHTML;
    var shoesTemplate = Handlebars.compile(shoesDataTemplateSource);
    var shoesHTML = shoesTemplate(shoesData);
    shoesDataElement.innerHTML = shoesHTML;
};

searchBtnElement.addEventListener('click', function search() {

    // let shoeBrand = document.getElementById('shoeBrand').value;
    // let shoeColor = document.getElementById('shoeColor').value;
    // let shoeSize = document.getElementById('shoeSize').value;
    // let specs = {};
    try {
        axios.get('api/shoes').then(function (res) {
            // console.log(res.data.data)
            displayShoes(res.data.data);
        })
        //     if (shoeBrand !== 'null') {
        //         specs.brand = shoeBrand
        //     }
        //     if (shoeColor !== 'null') {
        //         specs.color = shoeColor
        //     }
        //     if (shoeSize !== 'null') {
        //         specs.size = shoeSize
    } finally {


    }

});