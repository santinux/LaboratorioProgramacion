/**
 * Middleware de manejo de errores centralizado.
 */
export const error = ((err, req, res, next) => {
    const estado = err.status || 500;
    console.error(err.message, err.stack);

    res.status(estado).json({
        message: err.message || 'Error interno del servidor',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});
