package vistas;

import javax.swing.*;
import java.awt.*;

public class VistaPrincipal extends JFrame
{
        private JPanel contenedor;
        private PanelLogin panelLogin;
        
        public VistaPrincipal()
        {
                this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                this.setSize(600, 400);
                this.setLocationRelativeTo(null);
                this.setTitle("Dominio Sin Nombre");
                this.inicializarComponentes();
        }
        
        private void inicializarComponentes()
        {
                // CardLayout para poder cambiar entre paneles
                contenedor = new JPanel(new CardLayout());
                panelLogin = new PanelLogin();
                
                // Temporal, debe delegar la autenticación
                panelLogin.addLoginListener(e -> {
                        String usuario = panelLogin.getUsuario();
                        String password = panelLogin.getContrasegna();
                        
                        // Autenticación
                        if (usuario.equals("admin") && password.equals("admin")) {
                                // Temporal, debe cambiar al panel home de usuario
                                panelLogin.setMensaje("Bienvenido, " + usuario, Color.GREEN);
                        } else {
                                panelLogin.setMensaje("Usuario o contraseña incorrectos", Color.RED);
                        }
                });
                
                contenedor.add(panelLogin, "LOGIN");
                this.getContentPane().add(contenedor);
        }
}
