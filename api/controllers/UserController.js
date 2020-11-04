/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  //Controlador de LOGIN
  login: async function (req, res) { //Debe ser asincrona para realizar los awaits. (trabajar en 2do plano)
    let username = req.param('user'); // Lo que mandan al escribir en los campos user y password
    let password = req.param('password');

    let found = await User.findOne({ //Encontrar un usuario con los datos ingresados.
      username,
      password
    });

    if (found) {
      req.session.user = found; // Queda guardada en la sesion la informacion del usuario.
      res.redirect('/');
    } else {
      req.session.user = null; // Se loggea mal, se pone nula.
      res.view('pages/login');
    }
  },

  //Controlador de LOGOUT
  logout: async function (req, res) {
    req.session.user = null;
    res.redirect('/');
  },
};
