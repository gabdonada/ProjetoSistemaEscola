const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Materia = new Schema({
    id:{
        type: Number,
        require: true
    },
    Ano:{
        type: Number,
        required: true
    },
    Turma:{
        type: String,
        required: true
    }
    //aqui deverá se adicionar os posts 
})

mongoose.model("Profs", Profs)