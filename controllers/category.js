const { response } = require("express");
const { Category } = require("../models");


const createCategory = async (req, res = response) => {

    const name = req.body.name.toUpperCase();

    try {

        const categoryDB = await Category.findOne({ name });
    
        if ( categoryDB ){
            return res.status(400).json({
                msg: `Category ${categoryDB.name} exist`
            });
        }
    
        //Generar datos a guardar
    
        const data = {
            name,
            user: req.user._id
        }
    
        const category = new Category(data);
    
        //Guardar en DB
        await category.save();
    
        res.status(201).json(category);
        
    } catch (error) {
        console.log(error);
    }

}

//Obtener categorias - paginado - total- populate

const getCategory = async (req = request, res = response) => {
    
    const {limit = 5, from = 0 } = req.query; // para pasar un parametro de limite y desde
    const query = { status: true };

    const [all, category] = await Promise.all([
         Category.countDocuments(query),
         Category.find(query)
            .populate('user','name')
            .skip(Number(from))
            .limit(Number(limit))

     ]); // Esto permite ejecutar las promesas de forma simultanea para no romper el db


    res.json({
        all,
        category
    });
}

//Obtener categoria - populate
const getCategoryId = async ( req, res ) =>{

    const {id} = req.params;
    const category = await Category.findById( id ).populate('user', 'name');

    res.json(category);

}

const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { status, user, ...data } = req.body;

    data.name = data.name.toUpperCase();
    data.user = req.user._id;

    const category = await Category.findByIdAndUpdate(id, data, {new: true});

    res.json(category);
}


const deleteCategory = async (req, res) => {

    const { id } = req.params;
    const categoryOFF = await Category.findByIdAndUpdate(id, {status: false}, {new: true})

    res.status(200).json(categoryOFF);
}



module.exports = {
    createCategory,
    getCategory,
    getCategoryId,
    updateCategory,
    deleteCategory
 }