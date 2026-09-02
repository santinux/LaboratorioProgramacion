package servicios;

import modelos.Cliente;
import repositorios.RepositorioCliente;

public class ServicioAutenticacion
{
        private final RepositorioCliente repositorioCliente;
        
        public ServicioAutenticacion()
        {
                this.repositorioCliente = new RepositorioCliente();
        }
        
        public Cliente validarUsuario(String id, String contrasegna)
        {
                System.out.println("Validando usuario: " + id + " - " + contrasegna);
                Cliente clienteValido = null;
                Cliente cliente = repositorioCliente.buscarPorId(id);
                if (cliente != null) {
                        // El cliente existe, validar contraseña (nro DNI)
                        if (cliente.getNroDNI() == Integer.parseInt(contrasegna)) {
                                clienteValido = cliente;
                        }
                }
                return (clienteValido);
        }
}
