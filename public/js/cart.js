let checkOutBtn = document.getElementById('checkOutBtn');

// fetch the shoes in the cart then display them
let showCart = function () {
    axios.get('api/shoes/cart').then(function (res) {
        if (res.data.data.length == 0) {
            displayCart('Sorry you have not added any items to the cart :(')
        } else {
            checkOutBtn.style.display = 'inline-block';
            displayCart(res.data.data);
        };
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
            if (response.data.data > 0) {
                checkOutBtn.style.display = 'inline-block';
                showCart();
            } else {
                displayCart("We are sad to see you remove all the shoes,we'll make sure to have the ones you'll love next time!");
                checkOutBtn.style.display = 'none';
            }
        })
        .catch(function (error) {
            console.log(error);
        });
};
//CHECKOUT
let checkOut = function () {
    axios.post('/api/shoes/cart/')
        .then(function (response) {
            if (response.data.data == "cartCleared") {
                displayCart('Thanks for shopping with us, have a lovely day!');
                checkOutBtn.style.display = 'none';

            }
        })
        .catch(function (error) {
            console.log(error);
        });
};