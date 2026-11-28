/**
 * Repositorio encargado de obtener información de tiendas desde la API.
 *
 * Centraliza las operaciones de consulta relacionadas con tiendas y expone
 * métodos estáticos para recuperar el listado completo o una tienda específica
 * mediante su identificador.
 */
export class TiendasRepository {
    /**
     * TODO Implementar la lógica de paginación
     * @returns {Promise<any>}
     */
    static async getTiendas() {
        const response = await fetch('/api/tiendas')
            .then(response => response.json())
            .catch(error => console.error(error));
        return (response);
    }
    static async getById(id) {
        const response = await fetch(`/api/tiendas/${id}`)
            .then(response => response.json())
            .catch(error => console.error(error));
        return (response);
    }
}
