/**
 * Lee un archivo JSON desde la ruta proporcionada.
 *
 * @param {string} path - La ruta al archivo JSON.
 * @returns {object} - El objeto JSON analizado.
 */
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

export const readJSON = (path) => require(path);
