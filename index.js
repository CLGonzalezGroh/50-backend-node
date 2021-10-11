const express = require('express');
const routerApi = require('./routes');
const { logErrors, errorHandler } = require('./middlewares/errorHandlers');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

routerApi(app);

app.use(logErrors);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Server running on http://localhost:' + port);
});
