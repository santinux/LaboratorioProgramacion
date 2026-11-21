/**
 * Middleware de manejo de rutas no encontradas (404).
 * Devuelve un error cuando se solicita una ruta que no existe en el servidor.
 */
export const notFound = ((req, res, next) => {
    const error = new Error(`Ruta no encontrada: ${req.originalUrl}`);
    error.status = 404;
    next(error);
});
