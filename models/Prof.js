const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Profs = new Schema({
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
    Profde:{
        type: String,
        required: true
    },
    podeEditar:{
        type: Number,
        default: 1
    }
})

mongoose.model("Profs", Profs)