module.exports = {
    eAdmin: function(req, res, next){
        if(req.isAuthenticated() && req.user.AdminTipo == 1){
            return next()
        }else{
            req.flash("error_msg", "Você precisa ser Diretora")
            res.redirect("/")
        }
    },
    eSecret: function(req, res, next){
        if(req.isAuthenticated() && req.user.AdminTipo == 2){
            return next()
        }else{
            req.flash("error_msg", "Você precisa ser Secretaria ou Diretora")
            res.redirect("/")
        }
    }
    // 1 = Diretoria, 2 = Secretaria
}