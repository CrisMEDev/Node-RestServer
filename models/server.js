const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../db/config');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth:           '/api/auth',
            buscar:         '/api/buscar',
            categorias:     '/api/categorias',
            productos:      '/api/productos',
            uploads:        '/api/uploads',
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

        // Carga de archivos
        this.app.use( fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));

    }

    routes(){
        // Se usa un middleware para cargar ciertas rutas dependiendo de una ruta inicial

        this.app.use( this.paths.auth,       require('../routes/auth') );
        this.app.use( this.paths.buscar,     require('../routes/buscar') );
        this.app.use( this.paths.categorias, require('../routes/categorias') );
        this.app.use( this.paths.productos,  require('../routes/productos') );
        this.app.use( this.paths.uploads,    require('../routes/uploads') );
        this.app.use( this.paths.usuarios,   require('../routes/user') );

    }

    listen(){
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en le puerto: ', this.port);
        });
    }

}


module.exports = Server;