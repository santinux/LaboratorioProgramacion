// TODO Convertir a ES6
const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3000;
const app = express();

app.disable('x-powered-by');
app.use(express.static('public'));
app.use(express.json());

// Productos
const productosRoutes = require('./routes/productosRoutes');
app.use('/api/productos', productosRoutes);

// USUARIOS
//const usuarioRoutes = require('./routes/usuarioRoutes');
//app.use('/api/usuarios', usuarioRoutes);

// NEGOCIOS
//const negocioRoutes = require('./routes/negocioRoutes');
//app.use('/api/negocios', negocioRoutes);

// PARTIDAS
//const partidaRoutes = require('./routes/partidaRoutes');
//app.use('/api/partidas', partidaRoutes);

// Rutas inexistentes
app.use((req, res, next) => {
    res.status(404).json({
        error: 'La ruta solicitada no existe'
    });
});

// Manejo de errores
app.use((error, req, res, next) => {
    if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
        return res.status(400).json({
            error: 'El cuerpo de la solicitud contiene un JSON inválido'
        });
    }

    console.error(error);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
