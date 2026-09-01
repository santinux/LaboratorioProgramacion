package vistas;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionListener;

public class PanelLogin extends JPanel
{
        private JTextField campoUsuario;
        private JPasswordField campoContrasegna;
        private JButton botonLogin;
        private JLabel etiquetaMensaje;
        
        public PanelLogin()
        {
                this.inicializar();
        }
        
        private void inicializar()
        {
                // Usamos GridBagLayout para un diseño más flexible
                this.setLayout(new GridBagLayout());
                GridBagConstraints gbc = new GridBagConstraints();
                gbc.insets = new Insets(10, 10, 10, 10); // Márgenes
                
                // Título panel
                JLabel lblTitulo = new JLabel("Iniciar Sesión");
                lblTitulo.setFont(new Font("Arial", Font.BOLD, 20));
                gbc.gridx = 0;
                gbc.gridy = 0;
                gbc.gridwidth = 2;
                this.add(lblTitulo, gbc);
                
                // Etiqueta usuario
                gbc.gridwidth = 1;
                gbc.gridy = 1;
                gbc.gridx = 0;
                gbc.anchor = GridBagConstraints.EAST;
                this.add(new JLabel("Usuario:"), gbc);
                
                // Campo usuario
                campoUsuario = new JTextField(10);
                gbc.gridx = 1;
                gbc.anchor = GridBagConstraints.WEST;
                this.add(campoUsuario, gbc);
                
                // Etiqueta contraseña
                gbc.gridy = 2;
                gbc.gridx = 0;
                gbc.anchor = GridBagConstraints.EAST;
                this.add(new JLabel("Contraseña:"), gbc);
                
                // Campo contraseña
                campoContrasegna = new JPasswordField(10);
                gbc.gridx = 1;
                gbc.anchor = GridBagConstraints.WEST;
                this.add(campoContrasegna, gbc);
                
                // Botón ingresar
                botonLogin = new JButton("Ingresar");
                botonLogin.setBackground(Color.GRAY);
                botonLogin.setForeground(Color.WHITE);
                botonLogin.setFocusPainted(false);
                gbc.gridy = 3;
                gbc.gridx = 0;
                gbc.gridwidth = 2;
                gbc.anchor = GridBagConstraints.CENTER;
                this.add(botonLogin, gbc);
                
                // Etiqueta para mensajes de error
                etiquetaMensaje = new JLabel(" ");
                etiquetaMensaje.setForeground(Color.RED);
                gbc.gridy = 4;
                this.add(etiquetaMensaje, gbc);
        }
        
        public String getUsuario()
        {
                return (campoUsuario.getText());
        }
        
        public String getContrasegna()
        {
                return (new String(campoContrasegna.getPassword()));
        }
        
        public void setMensaje(String mensaje, Color color)
        {
                etiquetaMensaje.setText(mensaje);
                etiquetaMensaje.setForeground(color);
        }
        
        public void addLoginListener(ActionListener listener)
        {
                botonLogin.addActionListener(listener);
        }
        
        public void limpiarCampos()
        {
                campoUsuario.setText("");
                campoContrasegna.setText("");
        }
}
