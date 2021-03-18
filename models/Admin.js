const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Admins = new Schema({
    id:{
        type: Number,
        require: true
    },
    nome:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    senha:{
        type: String,
        required: true
    },
    AdminTipo:{
        type: Number,
        required: true

        // 1 = Diretoria, 2 = Secretaria
    }
})

mongoose.model("Admins", Admins)