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
        required: true,
        default: "novo_aluno"
    },
    turma:{
        type: String,
        required: true
    }
})

mongoose.model("Admins", Admins)