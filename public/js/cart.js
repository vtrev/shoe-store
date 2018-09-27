let shoesData = JSON.parse(localStorage.getItem('shoesData'));
shoes = ShoeFactory(shoesData);
let cart = JSON.parse(localStorage.getItem('cart'));
let tmpCart = JSON.parse(localStorage.getItem('cart'));
let checkOutBtn = document.getElementById('checkOutBtn');

// =============================DISPLAY THE SHOES IN THE CART ===============================================// 

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
// ================================ REMOVE SHOE FROM CART ====================================================== //
let removeFromCart = function (item) {
    let tmpCart = JSON.parse(localStorage.getItem('cart'));
    let shoeToRemove = shoes.getShoes({
        id: item
    })[0];
    //overwrite the cart with itself excluding the shoe being removed
    try {
        tmpCart = tmpCart.filter(function (shoe) {
            return parseInt(item) !== shoe.id;
        });
    } finally {
        shoeToRemove.qty++;
        localStorage.setItem('shoesData', JSON.stringify(shoesData));
        localStorage.setItem('cart', JSON.stringify(tmpCart));
        displayCart(tmpCart);
    }
};

// =========================================CHECKOUT==========================================================//

checkOutBtn.addEventListener('click', function checkout() {
    localStorage.setItem('cart', JSON.stringify([]));
    displayCart([]);
    alert('Proceeding to payment');
});