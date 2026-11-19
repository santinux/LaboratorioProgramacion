const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

// PRODUCTOS
const productoRoutes = require('./routes/productoRoutes');
app.use('/api/productos', productoRoutes);

// USUARIOS
const usuarioRoutes = require('./routes/usuarioRoutes');
app.use('/api/usuarios', usuarioRoutes);

// NEGOCIOS
const negocioRoutes = require('./routes/negocioRoutes');
app.use('/api/negocios', negocioRoutes);

// PARTIDAS
const partidaRoutes = require('./routes/partidaRoutes');
app.use('/api/partidas', partidaRoutes);

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

    res.status(500).json({
        error: 'Error interno del servidor'
    });
});

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});
