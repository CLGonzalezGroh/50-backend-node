const express = require('express');
const cors = require('cors');
const passport = require('passport');

const routerApi = require('./routes');
const {
  logErrors,
  boomErrorHandler,
  errorHandler,
  ormErrorHandler,
} = require('./middlewares/errorHandlers');
const { checkApiKeys } = require('./middlewares/authHandler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whitelist = ['http://127.0.0.1:5500', 'https://muyApp.com'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  },
};
app.use(cors(options));

require('./utils/auth');

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});
app.get('/protected', checkApiKeys, (req, res) => {
  res.send('Ruta secreta');
});

app.use(passport.initialize());

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(ormErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Server running on http://localhost:' + port);
});
