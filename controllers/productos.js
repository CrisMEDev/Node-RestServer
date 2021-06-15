const { response, request } = require('express');
const { Producto } = require('../models');

// Obtener productos paginado
const obtenerProductos = async(req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    // TODO: Faltaría implementar una validación en caso de que el query param sea uns string y no un number
    
    const [ total, productos ] = await Promise.all([
        Producto.countDocuments(query),

        Producto.find(query)
        .populate('usuario', ['nombre', 'correo'])  // Se manda la referencia a usuario para mostrar el nombre y el correo
        .populate('categoria', 'nombre')  // Se manda la referencia a categoria para mostrar el nombre
        .skip(Number(desde))
        .limit(Number(limite))
    ]);


    res.json({
        total,
        productos
    });
}

// Obtener producto
const obtenerProducto = async(req = request, res = response) => {
    const id = req.params.id;

    const producto = await Producto.findById( id )
                            .populate('usuario', 'nombre')
                            .populate('categoria', 'nombre');

    res.json({
        producto
    });
}

// Crear producto
const crearProducto = async(req = request, res = response) => {

    // Se excluyen los datos que no se debe permitir actualizar
    const { estado, usuario, ...data } = req.body;

    // Almacena los valores siguientes en mayusculas
    data.nombre = data.nombre.toUpperCase();

    const productoEnDB = await Producto.findOne({ nombre: data.nombre });

    if ( productoEnDB ){
        return res.status(400).json({
            msg: `El producto ${ data.nombre } ya existe`
        });
    }

    // Para almacenar el usuario que registro el producto, tambien
    const producto = await new Producto({ usuario: req.usuario._id, ...data });
    await producto.save();

    res.json({
        producto
    });
}

// Actualizar producto
const actualizarProducto = async(req = request, res = response) => {
    const id = req.params.id;
    const { estado, usuario, ...data } = req.body   // Se ignorará el resto de los parametros del body

    if ( data.nombre ){
        data.nombre = data.nombre.toUpperCase();
    }
    data.usuario = req.usuario._id    // Actualiza el producto con el id del administrador que la cambió proveniente del token

    const producto = await Producto.findByIdAndUpdate( id, data, {new: true}); // new: true es para devolver el documento actualizado

    res.status(200).json({
        producto
    });
}

// Borrar producto
const borrarProducto = async(req = request, res = response) => {
    const id = req.params.id;

    const producto = await Producto.findByIdAndUpdate( id, { estado: false }, { new: true });

    res.status(200).json({
        producto
    });
}



module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto
}

