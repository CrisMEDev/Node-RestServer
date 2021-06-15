
const { Schema, model } = require('mongoose')

const ProductoSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',      // Referencia al schema usuario
        required: true
    },
    precio: {
        type: Number,
        default: 0
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    descripcion: {
        type: String
    },
    disponible: {
        type: Boolean,
        default: true
    }
});

ProductoSchema.methods.toJSON = function(){

    // Genera una instancia de mi Schema con sus valores respectivos
    const { __v, estado, ...producto } = this.toObject();

    return producto;
}


module.exports = model( 'Producto', ProductoSchema );



