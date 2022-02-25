const { response } = require("express");
const { Collection } = require("mongoose");
const { ObjectId } = require("mongoose").Types;
const { User, Category, Product } = require('../models')


const collectionOK = [
    'user',
    'category',
    'product',
    'role'
];

const searchUser = async (term = '', res = response) => {

    const isMongoID = ObjectId.isValid(term)//true

    if (isMongoID) {
        const user = await User.findById(term);
        return res.json({
            results: user
        });
    
    }
    /*
    }else{
        res.status(400).json({
            msg:"No exist"
        })
    }
    */

    const regex = new RegExp(term, 'i');

    const users = await User.find({
        $or: [{name: regex}, {email: regex}],
        $and: [{statusd: true}]
    });

    res.json({
        results: users
    });
}

const searchCategory = async (term = '', res = response ) => {

    const isMongoID = ObjectId.isValid(term)//true
    //busca por ID preciso
    if (isMongoID) {
        const category = await Category.findById(term);
        return res.json({
            results: category
        });
    }
    const regex = new RegExp(term, 'i');
    // busca por expresion regular y es mejor para buscar por cualquier similitud.
    const categorys = await Category.find({
        $or: [{name: regex}],
        $and: [{status: true}]
    });

    res.json({
        results: categorys
    });
}

const searchProduct = async (term = '', res = response ) => {

    const isMongoID = ObjectId.isValid(term)//true
    //busca por ID preciso
    if (isMongoID) {
        const product = await Product.findById(term);
        return res.json({
            results: product
        });
    }
    const regex = new RegExp(term, 'i');
    // busca por expresion regular y es mejor para buscar por cualquier similitud.
    const products = await Product.find({
        $or: [{name: regex}],
        $and: [{status: true}]
    }).populate('category','name');

    res.json({
        results: products
    });
}

const search = (req, res = response) => {

    const { collection, term } = req.params;

    if (!collectionOK.includes(collection)) {
        return res.status(400).json({
            msg: `Allowed collections are ${collectionOK}`
        })
    }
    switch (collection) {
        case 'user':
            searchUser(term, res);
            break;

        case 'category':
            searchCategory(term,res);

            break;
        case 'product':
            searchProduct(term,res);

            break;

        default:
            break;
    }


}

module.exports = {
    search
}