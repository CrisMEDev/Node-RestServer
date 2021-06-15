
const { Schema, model } = require('mongoose')

const CategoriaSchema = new Schema({
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
    }
});

CategoriaSchema.methods.toJSON = function(){

    // Genera una instancia de mi Schema con sus valores respectivos
    const { __v, estado, ...categoria } = this.toObject();

    return categoria;
}


module.exports = model( 'Categoria', CategoriaSchema );



