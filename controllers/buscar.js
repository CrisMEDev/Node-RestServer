const { request, response } = require('express');
const { ObjectId } = require('mongoose').Types;

const { Usuario, Categoria, Producto } = require('../models');

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
];

const buscarUsuarios = async( termino = '', res = response) => {

    const esMongoID = ObjectId.isValid( termino ); // true si es un id mongo false de lo contrario

    // Si se ingresó un id mongo lo buscará
    if ( esMongoID ){
        const usuario = await Usuario.findById( termino );

        return res.json({
            results: usuario ? [ usuario ] : []
        });
    }

    const regexp = new RegExp( termino, 'i' );  // La i le quita la sensibilidad a la busqueda entre mayúsculas y minúsculas
    
    const usuarios = await Usuario.find({   // Si se usa count en lugar de find nos devuelve solo la cantidad
        $or: [{ nombre: regexp }, { correo: regexp }],
        $and: [{ estado: true }]
    });

    res.json({
        results: usuarios
    });

}

const buscarCategorias = async( termino = '', res = response) => {
    
    const esMongoID = ObjectId.isValid( termino ); // true si es un id mongo false de lo contrario
    
    // Si se ingresó un id mongo lo buscará
    if ( esMongoID ){
        const categoria = await Categoria.findById( termino );
        
        return res.json({
            results: categoria ? [ categoria ] : []
        });
    }
    
    const regexp = new RegExp( termino, 'i' );  // La i le quita la sensibilidad a la busqueda entre mayúsculas y minúsculas
    
    const categorias = await Categoria.find({ nombre: regexp, estado: true }); // Por defecto realiza un and, nombre y and deben coincidir con la busqueda
    
    res.json({
        results: categorias
    });
    
}

const buscarProductos = async( termino = '', res = response) => {

    const esMongoID = ObjectId.isValid( termino ); // true si es un id mongo false de lo contrario

    // Si se ingresó un id mongo lo buscará
    if ( esMongoID ){
        const producto = await Producto.findById( termino ).populate('categoria', 'nombre');

        return res.json({
            results: producto ? [ producto ] : []
        });
    }

    const regexp = new RegExp( termino, 'i' );  // La i le quita la sensibilidad a la busqueda entre mayúsculas y minúsculas
    
    const productos = await Producto.find({   // Si se usa count en lugar de find nos devuelve solo la cantidad

        $or: [{ nombre: regexp }, { descripcion: regexp }], // Se puede usar { categoria: ObjectId('CategoriaID') }
                                                            // para obtener productos de cierta categoria, recomendación usar otro endpoint
        $and: [{ estado: true }]
    }).populate('categoria', 'nombre');

    res.json({
        results: productos
    });

}


// Controlador para buscar contenido en la DB
const buscar = ( req = request, res = response ) => {

    const { coleccion, termino } = req.params;

    if ( !coleccionesPermitidas.includes( coleccion ) ){
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${ coleccionesPermitidas }`
        });
    }

    switch(coleccion){
        case 'usuarios':
            buscarUsuarios( termino, res );
            break;

        case 'categorias':
            buscarCategorias( termino, res );
            break;

        case 'productos':
            buscarProductos( termino, res );
            break;

        default:
            res.status(500).json({
                msg: 'Se me olvido hacer esta búsqueda'
            });
    }
}

module.exports = {
    buscar
}

