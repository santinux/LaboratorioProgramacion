package vistas;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionListener;

public class PanelLogin extends JPanel
{
        private final JLabel lblId;
        private final JLabel lblContrasegna;
        private final JTextField campoId;
        private final JPasswordField campoContrasegna;
        private final JButton botonLogin;
        private final JLabel etiquetaMensaje;
        
        public PanelLogin()
        {
                this.setLayout(new GridBagLayout());
                GridBagConstraints gbc = new GridBagConstraints();
                gbc.insets = new Insets(10, 10, 10, 10); // Márgenes
                
                JLabel lblTitulo = new JLabel("Iniciar Sesión");
                lblTitulo.setFont(new Font("Arial", Font.BOLD, 20));
                gbc.gridx = 0;
                gbc.gridy = 0;
                gbc.gridwidth = 2;
                this.add(lblTitulo, gbc);
                
                this.lblId = new JLabel("Id Usuario");
                gbc.gridx = 0;
                gbc.gridy = 1;
                gbc.gridwidth = 1;
                gbc.anchor = GridBagConstraints.EAST;
                this.add(lblId, gbc);
                
                this.campoId = new JTextField(10);
                gbc.gridx = 1;
                gbc.gridy = 1;
                gbc.anchor = GridBagConstraints.WEST;
                this.add(campoId, gbc);
                
                this.lblContrasegna = new JLabel("Contraseña");
                gbc.gridx = 0;
                gbc.gridy = 2;
                gbc.anchor = GridBagConstraints.EAST;
                this.add(lblContrasegna, gbc);
                
                this.campoContrasegna = new JPasswordField(10);
                gbc.gridx = 1;
                gbc.gridy = 2;
                gbc.anchor = GridBagConstraints.WEST;
                this.add(campoContrasegna, gbc);
                
                this.botonLogin = new JButton("Ingresar");
                this.botonLogin.setBackground(Color.GRAY);
                this.botonLogin.setForeground(Color.WHITE);
                this.botonLogin.setFocusPainted(false);
                gbc.gridx = 0;
                gbc.gridy = 3;
                gbc.gridwidth = 2;
                gbc.anchor = GridBagConstraints.CENTER;
                this.add(botonLogin, gbc);
                
                etiquetaMensaje = new JLabel(" ");
                etiquetaMensaje.setForeground(Color.RED);
                gbc.gridx = 0;
                gbc.gridy = 4;
                gbc.anchor = GridBagConstraints.CENTER;
                this.add(etiquetaMensaje, gbc);
        }
        
        public String getId()
        {
                return (campoId.getText());
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
                campoId.setText("");
                campoContrasegna.setText("");
        }
}
