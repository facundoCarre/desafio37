const express = require('express');
const cookieParser = require('cookie-parser')
const session = require('express-session')
const { fork } = require('child_process');
// de aca van las que valen la pena
const sererverApi = require('../api/serverApi')
const  {pass} = require('../config/configPassport')

const app = express();
app.use(cookieParser())
// inicializamos passport
app.use(pass.initialize());
app.use(pass.session());

app.use(express.static('public'));
app.use(session({
  secret: 'secreto',
  resave: false,
  saveUninitialized: false
}));

// inicializamos passport
app.use(pass.initialize());
app.use(pass.session());

app.get('/', (req, res) => {
  res.send('Bienvenido al ejemplo de passport con facebook');
});

app.get('/auth/facebook', pass.authenticate('facebook'));

app.get('/auth/facebook/callback', pass.authenticate('facebook',
  {
      successRedirect: '/datos',
      failureRedirect: '/faillogin'
  }
));

app.get('/faillogin', (req, res) => {
  res.status(401).send({ error: 'no se pudo autenticar con facebook' })
});

app.get('/datos', (req, res) => {
   // console.log(pass)
console.log(req.user)
  if (req.isAuthenticated()) {
      res.render('list', { nombre: req.user._json.name, email: req.user._json.email, foto: req.user._json.picture.data.url});
  } else {
      res.status(401).send('debe autenticarse primero');
  }
});
app.get('/info', async (req, res)  => {
    const resp = await sererverApi.info();
    console.log(resp)
    res.send(sererverApi.info())

});
app.get('/randoms', (req, res) => {
  const computo = fork('../api/serverHijo.js');
  computo.send(req.query.cant || 10000000);
  computo.on('message', sum => {
    res.end(`El array de numeros es  ${JSON.stringify(sum)}`);
});
});
app.get('/logout', (req, res) => {
  req.logout();
  res.send({logout: 'ok'})
});

pass.serializeUser(function (user, done) {
  done(null, user);
});

pass.deserializeUser(function (user, done) {
  done(null, user);
});

module.exports = app;