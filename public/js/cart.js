let checkOutBtn = document.getElementById('checkOutBtn');


// fetch the shoes in the cart then display them
axios.get('api/shoes/cart').then(function (res) {
    displayCart(res.data.data);
});

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
let removeFromCart = function (shoeId) {
    axios.post(`/api/shoes/sale/${shoeId}`, {
            shoeId,
            action: 'gain'
        })
        .then(function (response) {


            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });









    // let tmpCart = JSON.parse(localStorage.getItem('cart'));
    // let shoeToRemove = shoes.getShoes({
    //     id: item
    // })[0];
    // //overwrite the cart with itself excluding the shoe being removed
    // try {
    //     tmpCart = tmpCart.filter(function (shoe) {
    //         return parseInt(item) !== shoe.id;
    //     });
    // } finally {
    //     shoeToRemove.qty++;
    //     localStorage.setItem('shoesData', JSON.stringify(shoesData));
    //     localStorage.setItem('cart', JSON.stringify(tmpCart));
    //     displayCart(tmpCart);
    // }
};

// =========================================CHECKOUT==========================================================//

checkOutBtn.addEventListener('click', function checkout() {
    localStorage.setItem('cart', JSON.stringify([]));
    displayCart([]);
    alert('Proceeding to payment');
});