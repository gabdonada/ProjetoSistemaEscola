const localStrategy = require("passport-local").Strategy
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

//modelo de usuário
require("../models/Aluno")
const Aluno = mongoose.model("alunos")
require("../models/Admin")
const Admin = mongoose.model("admins")
require("../models/Prof")
const Prof = mongoose.model("profs")

//sistema de autenticação para Aluno
module.exports = function(passport){
    passport.use(new localStrategy({usernameField: 'email', passwordField: 'senha'},(email, senha, done)=>{

        Aluno.findOne({email: email}).then((aluno) => {
            if(!aluno){
                return done(null, false, {message: "Esta conta não existe"}) //null pq não existe conta, false pq sem sucesso
            }else{
                bcrypt.compare(senha, aluno.senha, (erro, batem)=>{
                    if(batem){
                        return done(null, aluno)
                    }else{
                        return done(null, false, {message: "Senha incorreta"}) 
                    }
                })
            }
        }).catch(()=>{

        })
    }))

    passport.serializeUser((aluno, done)=>{
        done(null, aluno.id)
    })

    passport.deserializeUser((id, done)=>{
        Aluno.findById(id, (err, aluno)=>{
            done(err,aluno)
        })
    })
}

//sistema de autenticação para Professor
module.exports = function(passport){
    passport.use(new localStrategy({usernameField: 'email', passwordField: 'senha'},(email, senha, done)=>{

        Prof.findOne({email: email}).then((prof) => {
            if(!prof){
                return done(null, false, {message: "Esta conta não existe"}) //null pq não existe conta, false pq sem sucesso
            }else{
                bcrypt.compare(senha, prof.senha, (erro, batem)=>{
                    if(batem){
                        return done(null, prof)
                    }else{
                        return done(null, false, {message: "Senha incorreta"}) 
                    }
                })
            }
        }).catch(()=>{

        })
    }))

    passport.serializeUser((prof, done)=>{
        done(null, prof.id)
    })

    passport.deserializeUser((id, done)=>{
        Prof.findById(id, (err, prof)=>{
            done(err,prof)
        })
    })
}


//sistema de autenticação para Admin
module.exports = function(passport){
    passport.use(new localStrategy({usernameField: 'email', passwordField: 'senha'},(email, senha, done)=>{

        Admin.findOne({email: email}).then((admin) => {
            if(!admin){
                return done(null, false, {message: "Esta conta não existe"}) //null pq não existe conta, false pq sem sucesso
            }else{
                bcrypt.compare(senha, admin.senha, (erro, batem)=>{
                    if(batem){
                        return done(null, admin)
                    }else{
                        return done(null, false, {message: "Senha incorreta"}) 
                    }
                })
            }
        }).catch(()=>{

        })
    }))

    passport.serializeUser((admin, done)=>{
        done(null, admin.id)
    })

    passport.deserializeUser((id, done)=>{
        Admin.findById(id, (err, admin)=>{
            done(err,admin)
        })
    })
}


