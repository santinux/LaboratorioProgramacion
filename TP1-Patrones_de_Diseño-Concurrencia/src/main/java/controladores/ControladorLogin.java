package controladores;

import modelos.Cliente;
import servicios.ServicioAutenticacion;
import servicios.ServicioMovimiento;
import vistas.VistaPrincipal;

import java.awt.*;
import java.math.BigDecimal;

/**
 * Controlador para la vista de login.
 * Conecta VistaPrincipal, quien conoce a PanelLogin, con ServicioAutenticacion
 * y ServicioMovimiento.
 */
public class ControladorLogin
{
        private final VistaPrincipal vista;
        private final ServicioAutenticacion servicioAutenticacion;
        private final ServicioMovimiento servicioMovimiento;
        
        public ControladorLogin(VistaPrincipal vista)
        {
                this.vista = vista;
                this.servicioAutenticacion = new ServicioAutenticacion();
                this.servicioMovimiento = new ServicioMovimiento();
        }
        
        public void iniciarSesion(String id, String contrasegna)
        {
                System.out.println("Iniciando sesión de Id Usuario: " + id + " Contraseña: " + contrasegna);
                Cliente cliente = servicioAutenticacion.validarUsuario(id, contrasegna);
                if (cliente != null) {
                        // Cliente válido
                        // Solicitar al servicio el resumen de movimientos [0] = ingresos, [1] = egresos
                        BigDecimal[] resumen = servicioMovimiento.calcularResumenDeCliente(cliente.getId());
                        // Enviar cliente y resumen a la vista de cliente
                        vista.getPanelCliente().mostrarCliente(cliente, resumen);
                        vista.mostrarPanelCliente();
                } else {
                        // Cliente inválido, enviar mensaje de error
                        vista.getPanelLogin().setMensaje("Usuario o contraseña incorrectos", Color.RED);
                }
        }
}
