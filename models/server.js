const express = require('express')
var cors = require('cors');
const { dbConnection } = require('../database/config');

//En esta seccion, vamos a hacer el server como clase no como lo manejamos en la clase del webServer, es lo mismo pero para tener otro orden y mas limpio el app.js
class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        //Conectar DB
        this.connectionDB();

        //Middlewares
        this.middlewares();
        //Routes of my application
        this.routes();
    }

    async connectionDB(){
        await dbConnection();
    }

    middlewares (){
        
        //CORS
        this.app.use( cors() );

        //Leer y parcear Body
        this.app.use( express.json() );

        //Directorio Publico
        this.app.use( express.static('public') )
    }

    //endpoints o routes
    routes() { 

        this.app.use(this.usersPath,require('../routes/user'))
        
    }

    listen(){
        this.app.listen( this.port, ()=> {
            console.log('Server run in...', this.port) ;
        } );
    }
}

module.exports = Server;