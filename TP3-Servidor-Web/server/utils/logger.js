/**
 * Logger básico para registrar las peticiones al servidor.
 *
 * @type {logger}
 */
export const logger = ((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] - [${req.method}]${req.originalUrl}`);
    next();
});
