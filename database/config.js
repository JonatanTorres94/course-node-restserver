const mongoose = require('mongoose');

const dbConnection = async() => {
    try {

        await mongoose.connect( process.env.MONGODB_CNN );

        console.log('DB ok')
        
    } catch (error) {
        console.log(error);
        throw new Error('Error in Data Base');
    }
}

module.exports = {
    dbConnection
}