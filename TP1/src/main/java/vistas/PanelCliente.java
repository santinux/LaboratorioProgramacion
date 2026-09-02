package vistas;

import modelos.Cliente;

import javax.swing.*;
import java.awt.*;
import java.math.BigDecimal;

public class PanelCliente extends JPanel
{
        private final JLabel lblTitulo;
        private final JLabel lblUsuario;
        private final JLabel lblResumen;
        private final JLabel lblIngresos;
        private final JLabel lblIngresosValor;
        private final JLabel lblEgresos;
        private final JLabel lblEgresosValor;
        private final JLabel lblSaldo;
        private final JLabel lblSaldoValor;
        
        public PanelCliente()
        {
                //setLayout(new GridLayout(5, 1, 10, 10));
                
                this.setLayout(new GridBagLayout());
                GridBagConstraints gbc = new GridBagConstraints();
                gbc.insets = new Insets(10, 10, 10, 10); // Márgenes
                
                this.lblTitulo = new JLabel("Bienvenido/a, ");
                lblTitulo.setFont(new Font("Arial", Font.BOLD, 20));
                gbc.gridx = 0;
                gbc.gridy = 0;
                gbc.gridwidth = 1;
                gbc.anchor = GridBagConstraints.EAST;
                this.add(lblTitulo, gbc);
                
                this.lblUsuario = new JLabel();
                lblUsuario.setFont(new Font("Arial", Font.BOLD, 20));
                gbc.gridx = 1;
                gbc.gridy = 0;
                gbc.gridwidth = 1;
                gbc.anchor = GridBagConstraints.WEST;
                this.add(lblUsuario, gbc);
                
                this.lblResumen = new JLabel("Resumen de la cuenta");
                lblResumen.setFont(new Font("Arial", Font.BOLD, 16));
                gbc.gridx = 0;
                gbc.gridy = 1;
                gbc.gridwidth = 1; // 2?
                gbc.anchor = GridBagConstraints.WEST;
                this.add(lblResumen, gbc);
                
                this.lblIngresos = new JLabel("Ingresos:");
                gbc.gridx = 0;
                gbc.gridy = 2;
                gbc.gridwidth = 1;
                gbc.anchor = GridBagConstraints.WEST;
                this.add(lblIngresos, gbc);
                
                this.lblIngresosValor = new JLabel();
                gbc.gridx = 1;
                gbc.gridy = 2;
                gbc.gridwidth = 1;
                gbc.anchor = GridBagConstraints.EAST;
                this.add(lblIngresosValor, gbc);
                
                this.lblEgresos = new JLabel("Egresos:");
                gbc.gridx = 0;
                gbc.gridy = 3;
                gbc.gridwidth = 1;
                gbc.anchor = GridBagConstraints.WEST;
                this.add(lblEgresos, gbc);
                
                this.lblEgresosValor = new JLabel();
                gbc.gridx = 1;
                gbc.gridy = 3;
                gbc.gridwidth = 1;
                gbc.anchor = GridBagConstraints.EAST;
                this.add(lblEgresosValor, gbc);
                
                this.lblSaldo = new JLabel("Saldo:");
                gbc.gridx = 0;
                gbc.gridy = 4;
                gbc.gridwidth = 1;
                gbc.anchor = GridBagConstraints.WEST;
                this.add(lblSaldo, gbc);
                
                this.lblSaldoValor = new JLabel();
                gbc.gridx = 1;
                gbc.gridy = 4;
                gbc.gridwidth = 1;
                gbc.anchor = GridBagConstraints.EAST;
                this.add(lblSaldoValor, gbc);
        }
        
        public void mostrarCliente(Cliente cliente, BigDecimal[] resumen) {
                BigDecimal ingresos = resumen[0];
                BigDecimal egresos = resumen[1];
                BigDecimal saldo = ingresos.subtract(egresos);
                
                lblUsuario.setText(cliente.getNombre());
                lblIngresosValor.setText("$ " + ingresos);
                lblEgresosValor.setText("$ " + egresos);
                lblSaldoValor.setText("$ " + saldo);
        }
}
