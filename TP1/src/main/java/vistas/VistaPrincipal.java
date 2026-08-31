package vistas;

import javax.swing.*;
import java.awt.*;

public class VistaPrincipal extends JFrame
{
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
                JPanel panelPrincipal = new JPanel();
                this.getContentPane().add(panelPrincipal);
                PanelLogin panelLogin = new PanelLogin();
                panelLogin.setBackground(Color.WHITE);
                this.getContentPane().add(panelLogin);
        }
}
