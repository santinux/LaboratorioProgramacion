import  express from 'express';
import { productosRouter } from './routes/productos-routes.js';
import { tiendasRouter } from './routes/tiendas-routes.js';
import { notFound } from './routes/not-found.js';
import { error } from './routes/error.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.disable('x-powered-by');
app.use(express.static('public'));
app.use(express.json());

//app.use('/api/usuarios', usuariosRouter);
//app.use('/api/partidas', partidasRouter);
app.use('/api/tiendas', tiendasRouter);
app.use('/api/productos', productosRouter);

app.use(notFound);
app.use(error);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
