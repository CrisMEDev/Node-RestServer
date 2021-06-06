const express = require('express');
const cors = require('cors');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        // Middlewares
        this.middlewares();

        // Rutas de la aplicación
        this.routes();
    }

    middlewares(){

        // CORS
        this.app.use( cors() );

        // Directorio público
        this.app.use( express.static('public') );

    }

    routes(){
        this.app.get('/api', (req, res) => {
            res.json({
                msg: 'get API'
            });
        });

        this.app.put('/api', (req, res) => {        // Errores cuatrocientos indican que el usuario realizó mal la peticion desde el frontend
            res.status(400).json({
                msg: 'put API'
            });
        });

        this.app.post('/api', (req, res) => {
            res.status(201).json({                  // Errores doscientos indican peticiones realizadas correctamente
                msg: 'post API'
            });
        });

        this.app.delete('/api', (req, res) => {
            res.status(500).json({                  // Errores quinientos indican algún problema desde el codigo del server
                msg: 'delete API'
            });
        });
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en le puerto: ', this.port);
        });
    }

}


module.exports = Server;