'use strict'

const assert = require('assert');
const Shoes = require('../shoesFactory');
const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:pass@localhost:5432/shoesdb';

const pool = new Pool({
    connectionString
});

const shoeInstance = Shoes(pool);

describe('Shoe catalogue API', function () {
    beforeEach(async function () {
        await pool.query('DELETE FROM shoes');
    });

    // Testing method that handles 2 or 3 characters a registration can start with
    it('Should return specification Ids given the brand name and size', async function () {
        let specs = {
            brand: 'Adidas',
            size: '6'
        }
        //re use the size 3 with another brand from specs to check for intergrity
        let specs1 = {
            brand: 'Converse',
            size: specs.size
        }

        let expected = {
            brandId: 1,
            sizeId: 3
        };

        let expected1 = {
            brandId: 6,
            sizeId: 3
        };
        let outcome = await shoeInstance.getIds(specs);
        let outcome1 = await shoeInstance.getIds(specs1);
        assert.deepEqual(expected, outcome);
        assert.deepEqual(expected1, outcome1);
    });

    // Testing method that handles 2 or 3 characters a registration can start with
    it('Should add shoes into the database given certain specifications aand reject duplicates', async function () {
        let specs = {
            brand: 'Nike',
            color: 'Black',
            size: 7,
            price: '500',
            qty: 15,
            'img_link': 0
        };
        let add = await shoeInstance.addShoe(specs);

        let addedShoe = await shoeInstance.getBrandSize({
            brand: specs.brand,
            size: specs.size
        });
        //add the newly generated id and image link to the old object in order to assert
        specs.id = add[0].id;
        specs.img_link = addedShoe[0].img_link

        assert.deepEqual(specs, addedShoe[0]);
        // adding the shoe again
        assert.equal(await shoeInstance.addShoe(specs), 'shoe already in store')
    });
    it('Should get all the shoes that have been stored in the database', async function () {
        let shoes = [{
            brand: 'Nike',
            color: 'Black',
            size: 7,
            price: '500',
            qty: 15,
            'img_link': 0
        }, {
            brand: 'Puma',
            color: 'White',
            size: 8,
            price: '999',
            qty: 20,
            'img_link': 0
        }, {
            brand: 'Adidas',
            color: 'Black',
            size: 9,
            price: '700',
            qty: 10,
            'img_link': 0
        }];

        let addShoe1 = await shoeInstance.addShoe(shoes[0]);
        let addShoe2 = await shoeInstance.addShoe(shoes[1]);
        let addShoe3 = await shoeInstance.addShoe(shoes[2]);
        // add newly generated Ids to the shoe specs
        shoes[0].id = addShoe1[0].id;
        shoes[1].id = addShoe2[0].id;
        shoes[2].id = addShoe3[0].id;
        // update the image link
        shoes[0].img_link = "img/no-img.png";
        shoes[1].img_link = "img/no-img.png"
        shoes[2].img_link = "img/no-img.png"

        assert.deepEqual(shoes, await shoeInstance.getAll());
    });
    it('Should get shoes from the database given certain specifications', async function () {

        let shoes = [{
            brand: 'Nike',
            color: 'Black',
            size: 7,
            price: '500',
            qty: 15,
            'img_link': 0
        }, {
            brand: 'Puma',
            color: 'White',
            size: 8,
            price: '999',
            qty: 20,
            'img_link': 0
        }, {
            brand: 'Adidas',
            color: 'Pink',
            size: 9,
            price: '700',
            qty: 10,
            'img_link': 0
        }];

        let addShoe1 = await shoeInstance.addShoe(shoes[0]);
        let addShoe2 = await shoeInstance.addShoe(shoes[1]);
        let addShoe3 = await shoeInstance.addShoe(shoes[2]);
        // add newly generated Ids to the shoe specs
        shoes[0].id = addShoe1[0].id;
        shoes[1].id = addShoe2[0].id;
        shoes[2].id = addShoe3[0].id;
        // update the image link
        shoes[0].img_link = "img/no-img.png";
        shoes[1].img_link = "img/no-img.png"
        shoes[2].img_link = "img/no-img.png"
        let byBrand = await shoeInstance.getBrandSize({
            brand: 'Nike'
        });

        let bySize = await shoeInstance.getBrandSize({
            size: 9
        });

        let byBrandAndSize = await shoeInstance.getBrandSize({
            brand: 'Puma',
            size: 8
        });
        assert.deepEqual(byBrand[0], shoes[0]);
        assert.deepEqual(bySize[0], shoes[2]);
        assert.deepEqual(byBrandAndSize[0], shoes[1]);

    });
});