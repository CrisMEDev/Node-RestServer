const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../db/config');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth:           '/api/auth',
            categorias:     '/api/categorias',
            productos:      '/api/productos',
            usuarios:       '/api/usuarios'
        }

        // Conectarnos a base de datos
        this.databaseConnection();

        // Middlewares
        this.middlewares();

        // Rutas de la aplicación
        this.routes();
    }

    async databaseConnection(){
        await dbConnection();
    }

    middlewares(){

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio público
        this.app.use( express.static('public') );

    }

    routes(){
        // Se usa un middleware para cargar ciertas rutas dependiendo de una ruta inicial

        this.app.use( this.paths.auth, require('../routes/auth') );
        this.app.use( this.paths.categorias, require('../routes/categorias') );
        this.app.use( this.paths.productos, require('../routes/productos') );
        this.app.use( this.paths.usuarios, require('../routes/user') );

    }

    listen(){
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en le puerto: ', this.port);
        });
    }

}


module.exports = Server;