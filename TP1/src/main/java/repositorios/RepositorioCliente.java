package repositorios;

import modelos.Cliente;
import utils.CargadorCSV;

import java.util.ArrayList;

public class RepositorioCliente
{
        private final ArrayList<Cliente> clientes;
        
        public RepositorioCliente()
        {
                this.clientes = new ArrayList<>();
                CargadorCSV.cargarClientesDesdeCSV("data/clientes.csv", this.clientes);
        }
        
        // Hacer que retorne Usuario para ver los demás roles?
        // -> No, que haya un RepositorioRol para cada rol (admin, tester, etc.)
        public Cliente buscarPorId(String id)
        {
                Cliente clienteEncontrado = null;
                if (id != null && !id.isEmpty()) {
                        System.out.println("Buscando cliente por id: " + id);
                        for (Cliente cliente : clientes) {
                                System.out.println("Comparando id: " + cliente.getId());
                                if (cliente.getId() == Integer.parseInt(id.trim())) {
                                        System.out.println("Cliente encontrado: " + cliente.getNombre());
                                        clienteEncontrado = cliente;
                                        break;
                                }
                        }
                }
                return clienteEncontrado;
        }
}
