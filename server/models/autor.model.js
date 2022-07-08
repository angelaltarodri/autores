const mongoose = require('mongoose');

const EsquemaAutor = new mongoose.Schema({
    nombre: {
        type:String,
        required: [true, "Nombre es obligatorio."],
        minLength: [2, "Nombre debe tener al menos dos caracteres."],
        unique:[true, "El autor ya esta dado de alta."] //no me funciona 
    },
    imagen: String,
    libros: {
        type: Boolean,
        default: false
    },
    articulos: {
        type: Boolean,
        default: false
    },
    novelagrafica: {
        type: Boolean,
        default: false
    },
    cuentos : {
        type: Boolean,
        default: false
    }
}, {timestamps: true, versionKey: false});
//con timestamps: creando campos de created at y updatedat
//con versionKey false : eliminando atributo de _v

const Autor = mongoose.model("autores", EsquemaAutor);

module.exports = Autor;