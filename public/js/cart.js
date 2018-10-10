let checkOutBtn = document.getElementById('checkOutBtn');

// fetch the shoes in the cart then display them
let showCart = function () {
    axios.get('api/shoes/cart').then(function (res) {
        displayCart(res.data.data);
    });
};
showCart()


//DISPLAY THE SHOES IN THE CART 

let displayCart = function (shoesToDisplay) {
    let cartData = {};
    if (typeof (shoesToDisplay) == 'object') {
        cartData['shoes'] = shoesToDisplay.reverse()
    } else {
        cartData['message'] = shoesToDisplay;
    }
    var cartDataElement = document.getElementById("cartArea");
    var cartDataTemplateSource = document.getElementById("cartTemplate").innerHTML;
    var cartTemplate = Handlebars.compile(cartDataTemplateSource);
    var cartHTML = cartTemplate(cartData);
    cartDataElement.innerHTML = cartHTML;
};
// REMOVE SHOE FROM CART 
let removeFromCart = function (shoeId) {
    axios.post(`/api/shoes/sale/${shoeId}`, {
            shoeId,
            action: 'gain'
        })
        .then(function (response) {
            showCart();
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}
//CHECKOUT
// REMOVE SHOE FROM CART 
let checkOut = function () {
    axios.post('/api/shoes/cart/')
        .then(function (response) {
            showCart()
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
};