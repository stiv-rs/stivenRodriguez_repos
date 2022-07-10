const express = require('express');
const app = express();
const morgan = require('morgan');

//CONFIGURACION
app.set('port', process.env.PORT || 3000);

//MIDDLEWARES
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//RUTAS
app.use(require('./routes/index'));

//INICIAR_SERVIDOR
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});