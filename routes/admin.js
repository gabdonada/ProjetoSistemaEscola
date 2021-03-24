const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require("../models/Aluno") //modelo de alunos
const Aluno = mongoose.model("alunos") //modelo de alunos
const bcrypt= require("bcryptjs")
const passport = require("passport")

router.get("/criar_aluno", (req,res)=>{
    res.render("admin/criar_aluno")
})

router.post("/criar_aluno", (req,res)=>{
    var erros = [] //array para erros
    //compara valores do frontend para validacao
    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: "Nome invalido"})
    }
    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
        erros.push({texto: "Email invalido"})
    }
    if(!req.body.turma || typeof req.body.turma == undefined || req.body.turma == null){
        erros.push({texto: "Turma invalido"})
    }
    if(!req.body.ra || typeof req.body.ra == undefined || req.body.ra == null){
        erros.push({texto: "Registro Acadêmico invalido"})
    }
    if(erros.length>0){
        res.render("/admin/criar_aluno", {erros: erros})
    }else{
        Aluno.findOne({email: req.body.email}).lean().then((Aluno)=>{
            if(Aluno){
                req.flash("error_msg", "Ja existe um usuário com este email")
                res.redirect("/admin/criar_aluno")
            }else{
                const novoAluno = new Aluno({
                    id: req.body.RA,
                    nome: req.body.nome,
                    email: req.body.email,
                    turma: req.body.turma
                })

                //Encripta a senha para evitar hackers
                bcrypt.genSalt(10, (erro, salt) =>{
                    bcrypt.hash(novoAluno.senha, salt, (erro,hash)=>{
                        if(erro){
                            req.flash("error_msg", "Erro ao guardar senha: "+err)
                            res.redirect("admin/criar_aluno")
                        }else{
                            novoAluno.senha = hash
                            novoAluno.save().then(()=>{
                                req.flash("success_msg", "Aluno registrado com sucesso!")
                                res.redirect("/")
                            }).catch((err)=>{
                                req.flash("error_msg", "Erro ao guardar Aluno: "+err)
                                res.redirect("admin/criar_aluno")
                            })
                        }
                    })
                })
            }
        }).catch((err)=>{
            req.flash("error_msg", "Erro ao registrar: "+err)
            res.redirect("/")
        })
    }
})

router.get("/login", (req, res)=>{
    res.render("admin/login")
})

router.post("/login", (req, res, next)=>{
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/admin/login",
        failureFlash: true
    })(req, res, next)
})

router.get("/logout", (req,res)=>{
    req.logOut()//passport reconhece sozinho
    req.flash('success_msg', "Deslogado com sucesso")
    res.redirect("/")
})

module.exports = router