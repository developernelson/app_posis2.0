import { response } from "express";
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { sequelizeConnection } from "../database";
import { Customer, Info_Secuencia, ParametroMx, ParametroVi_Mg, Sale, Stock } from "../models";
import { intialState } from "../helpers/initialState";

export const authLogin = (req, res = response) => {

    const { register } = req.query;

    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
        if (user.emailVerified) { // por sino verificó su cuenta de correo
            return res.redirect('/');
        } else {
            if (register) { // si es que se acaba de registrar
                return res.render('login', { register });
            } else {
                signOut(auth);
            }
        }
    }

    res.render('login');
}

export const authLogout = (req, res = response) => {

    const auth = getAuth();
    if (auth.currentUser) {
        global.sequelize.close();
        signOut(auth);
    }
    res.redirect('/auth/login');

}

export const authLoginStart = async (req, res = response) => {

    const { correo, contraseña, codigo_empresa } = req.body;
    const errors = [];

    const auth = getAuth();
    signInWithEmailAndPassword(auth, correo, contraseña)
        .then(({ user }) => { // user esta dentro de userCredential
            if (user.emailVerified) {
                global.cod_emp = codigo_empresa;
                global.sequelize = sequelizeConnection(codigo_empresa);
                global.info_secuencia = Info_Secuencia();
                global.customer = Customer();
                global.parametro = (codigo_empresa == 'Fo_564') ? ParametroMx() : ParametroVi_Mg();
                global.sale = Sale();
                global.stock = Stock();
                intialState()
                    .then(() => res.redirect('/'))
            } else {
                return res.render('login', { emailVerify: true });
            }
        })
        .catch((error) => {
            console.log(error);
            errors.push({
                msg: 'El usuario o contraseña no es valido!'
            })
            return res.render('login', { errors, correo, contraseña });
        })

}


export const authRegister = (req, res = response) => {

    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
        if (user.emailVerified) {
            return res.redirect('/');
        }
    }

    res.render('register');
}

export const authRegisterStart = (req, res = response) => {

    const { nombre, correo, contraseña1, contraseña2 } = req.body;

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, correo, contraseña1)
        .then((userCredential) => {
            const user = userCredential.user;
            updateProfile(user, { displayName: nombre })
                .then(() => {
                    console.log('Nombre: ', user.displayName);
                    sendEmailVerification(user)
                        .then(() => {
                            console.log('Email verification sent!');
                        })
                })
            return res.redirect(`/auth/login/?register=true`);
        })
        .catch((error) => {
            // const errorMessage = error.message;
            // console.log(error);
            const errorCode = error.code;
            console.log(errorCode);
            if (errorCode === 'auth/email-already-in-use') {
                return res.render('register', { nombre, correo, contraseña1, contraseña2, alert: true });
            }
            return res.redirect('/auth/register');
        });
}