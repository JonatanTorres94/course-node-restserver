const { response } = require("express");
const { Product } = require("../models");


const createProduct = async (req, res = response) => {

    const {status, user, ...body} = req.body;
    

    try {
        
        const productDB = await Product.findOne({ name: body.name });
        
    
        if ( productDB ){
            return res.status(400).json({
                msg: `Product ${productDB.name} exist`
            });
        }
    
        //Generar datos a guardar
    
        const data = {
            ...body,
            name: body.name.toUpperCase(),
            user: req.user._id
        }
    
        const product = new Product(data);
    
        //Guardar en DB
        await product.save();
    
        res.status(201).json(product);
        
    } catch (error) {
        console.log(error);
    }

}

//Obtener productos - paginado - total- populate

const getProduct  = async (req = request, res = response) => {
    
    const {limit = 5, from = 0 } = req.query; // para pasar un parametro de limite y desde
    const query = { status: true };

    const [all, product] = await Promise.all([
         Product.countDocuments(query),
         Product.find(query)
            .populate('user','name')
            .populate('category', 'name')
            .skip(Number(from))
            .limit(Number(limit))

     ]); // Esto permite ejecutar las promesas de forma simultanea para no romper el db


    res.json({
        all,
        product
    });
}

//Obtener productos - populate
const getProductId = async ( req, res ) =>{

    const {id} = req.params;
    const product = await Product.findById( id ).populate('user', 'name').populate('category','name');

    res.json(product);

}

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { status, user, ...data } = req.body;

    if( data.name ){
        data.name = data.name.toUpperCase();
    }
    
    data.user = req.user._id;

    const product = await Product.findByIdAndUpdate(id, data, {new: true});

    res.json(product);
}


const deleteProduct = async (req, res) => {

    const { id } = req.params;
    const productOFF = await Product.findByIdAndUpdate(id, {status: false}, {new: true})

    res.status(200).json(productOFF);
}



module.exports = {
    createProduct,
    getProduct,
    getProductId,
    updateProduct,
    deleteProduct,
 }