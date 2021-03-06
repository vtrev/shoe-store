let searchBtnElement = document.querySelectorAll('.searchButton');
let noStockBtn = document.getElementById('no-stock-btn');
//shoe shoes on load

axios.get('/api/shoes').then(function (res) {
    displayShoes(res.data.data);
});



//create drop down selectors with data from the api
let makeSelectors = function () {
    axios.get('/api/shoes').then(function (res) {
        let shoes = res.data.data;
        let brands = [];
        let colors = [];
        let sizes = [];
        try {
            for (let i = 0; i < shoes.length; i++) {
                let shoeItem = shoes[i];
                if (!brands.includes(shoeItem.brand)) {
                    brands.push(shoeItem.brand);
                    brands = brands.sort();
                };
                if (!colors.includes(shoeItem.color)) {
                    colors.push(shoeItem.color);
                    colors = colors.sort();
                };
                if (!sizes.includes(shoeItem.size)) {
                    sizes.push(shoeItem.size);
                    sizes = sizes.sort((a, b) => a - b);
                };
            };
        } finally {
            let selectors = {
                colors,
                brands,
                sizes
            };
            var searchBarElement = document.getElementById("search-bar");
            var searchBarTemplateSource = document.getElementById("search-bar-template").innerHTML;
            var searchBarTemplate = Handlebars.compile(searchBarTemplateSource);
            var searchHtml = searchBarTemplate(selectors);
            searchBarElement.innerHTML = searchHtml;
        };
    });
}

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
            if (response.data.data == "emptyStock") {
                document.querySelector('#noStockModal').style.display = "flex";
                scrollWindow();
            }
            search();
            refresh();
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

let search = function () {
    let specs = {};
    specs.brand = document.getElementById('shoeBrand').value;
    specs.color = document.getElementById('shoeColor').value;
    specs.size = document.getElementById('shoeSize').value;
    // console.log(specs);
    // if (specs.brand == 'null' && specs.size == 'null') {
    //     let route = 'api/shoes';
    //     axios.get(route).then(function (res) {
    //         displayShoes(res.data.data);
    //     });
    //     localStorage.setItem('prevSpecs', route);
    // }
    let route = 'api/shoes';

    if (specs.brand || specs.size) {
        if (specs.brand) {
            route = `api/shoes/brand/${specs.brand}`;
        }
        if (specs.size) {
            route = `api/shoes/size/${specs.size}`;
        }
        if (specs.brand && specs.size) {
            route = `api/shoes/brand/${specs.brand}/size/${specs.size}`;
        }

    }
    axios.get(route).then(function (res) {
        displayShoes(res.data.data);
    });
    localStorage.setItem('prevSpecs', route);

    // if (specs.brand && specs.size) {
    //     let route = `api/shoes/brand/${specs.brand}/size/${specs.size}`;
    //     axios.get(route).then(function (res) {
    //         displayShoes(res.data.data)
    //     });
    //     localStorage.setItem('prevSpecs', route);
    //     return
    // } 


    // if (spec s.brand == 'null' && specs.size !== 'null') {
    //     let route = `api/shoes/size/${specs.size}`;
    //     axios.get(route).then(function (res) {
    //         displayShoes(res.data.data)
    //     });
    //     localStorage.setItem('prevSpecs', route);
    // };
};


// make selectors and display the shoes
makeSelectors();

// EVENTS FOR MODALS
noStockBtn.addEventListener('click', function () {
    document.querySelector('#noStockModal').style.display = "none";
}, false)