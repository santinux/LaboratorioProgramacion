package vistas;

import controladores.ControladorLogin;

import javax.swing.*;
import java.awt.*;

public class VistaPrincipal extends JFrame
{
        private final CardLayout cardLayout;
        private final JPanel contenedor;
        private final PanelLogin panelLogin;
        private final PanelCliente panelCliente;
        
        public VistaPrincipal()
        {
                this.setTitle("Dominio Sin Nombre");
                this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                this.setSize(600, 400);
                this.setLocationRelativeTo(null);
                this.cardLayout = new CardLayout();
                this.contenedor = new JPanel(cardLayout);
                this.panelLogin = new PanelLogin();
                this.panelCliente = new PanelCliente();
                this.contenedor.add(panelLogin, "LOGIN");
                this.contenedor.add(panelCliente, "CLIENTE");
                this.getContentPane().add(contenedor);
                this.setControladorLogin(new ControladorLogin(this));
        }
        
        public void setControladorLogin(ControladorLogin controlador)
        {
                panelLogin.addLoginListener(e -> {
                        String id = panelLogin.getId();
                        String contrasegna = panelLogin.getContrasegna();
                        controlador.iniciarSesion(id, contrasegna);
                });
        }
        
        public PanelLogin getPanelLogin()
        {
                return (this.panelLogin);
        }
        
        public void mostrarPanelLogin()
        {
                cardLayout.show(contenedor, "LOGIN");
        }
        
        public PanelCliente getPanelCliente()
        {
                return (this.panelCliente);
        }
        
        public void mostrarPanelCliente()
        {
                cardLayout.show(contenedor, "CLIENTE");
        }
}
