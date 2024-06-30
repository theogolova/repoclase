
const db = require("../database/models");
const bcrypt = require("bcryptjs")
const { validationResult } = require("express-validator")

const userController = {
    register: (req, res)=>{

        if (req.session.user != undefined) {
            return res.redirect("/");
        } else {
            return res.render("registerUser")
        }
    },
    login: (req, res)=>{
        if (req.session.user != undefined) {
            return res.redirect("/");
        } else {
            return res.render("login")
        }
    },
    store: (req, res)=>{
            let errors = validationResult(req)
            if (errors.isEmpty()){
                let form = req.body;

                let usuario = {
                    name: form.name,
                    email: form.email,
                    password: bcrypt.hashSync(form.password, 10)
                }

                db.User.create(usuario)
                .then((result) => {
                    return res.redirect("/users/login");
                }).catch((err) => {
                    return console.log(err);
                });

            
            }else{
                return res.render("registerUser", {
                     errors:errors.mapped(),
                     old: req.body
                })
            }
           
        
        },
    loginUser: (req, res)=>{
        let form = req.body;

        let filtro = {
            where: [{email: form.email}]
        };

        db.User.findOne(filtro)
        .then((result) => {
            if (result != null) {

                
                let check = bcrypt.compareSync(form.password, result.password);

                if (check) {
                    req.session.user = result;
                    if (form.rememberme != undefined) {
                        res.cookie("userId", result.id, {maxAge: 1000 * 60 * 35})
                    }
                    return res.redirect("/movies");
                } else {
                    return res.send("error en la password");

                }


            } else {
                return res.send("No hay mail parecidos a : " + form.email);
            }

        }).catch((err) => {
            return console.log(err);
        });
    },
    logout: (req, res) => {
        req.session.destroy();
        res.clearCookie("userId")
        return res.redirect("/")
    }
}

module.exports = userController;