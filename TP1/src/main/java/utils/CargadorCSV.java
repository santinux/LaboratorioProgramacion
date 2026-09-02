package utils;

import modelos.Cliente;
import modelos.Movimiento;
import modelos.TipoMovimiento;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;

public class CargadorCSV
{
        private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        
        public static void cargarClientesDesdeCSV(String archivoCSV, ArrayList<Cliente> clientes)
        {
                try (InputStream input = CargadorCSV.class.getClassLoader().getResourceAsStream(archivoCSV);
                     BufferedReader reader = new BufferedReader(new InputStreamReader(input))) {
                        int cargados = 0;
                        String linea;
                        reader.readLine(); // Ignorar encabezado
                        while ((linea = reader.readLine()) != null) {
                                String[] campos = linea.split(",");
                                short id = Short.parseShort(campos[0].trim());
                                int nroDNI = Integer.parseInt(campos[1].trim());
                                String nombre = campos[2].trim();
                                String apellido = campos[3].trim();
                                Cliente cliente = new Cliente(id, nroDNI, nombre, apellido);
                                clientes.add(cliente);
                                cargados++;
                        }
                        System.out.println(cargados + " clientes cargados desde " + archivoCSV);
                } catch (IOException e) {
                        System.err.println("Error cargando CSV: " + e.getMessage());
                }
        }
        
        public static void cargarMovimientosDesdeCSV(String archivoCSV, ArrayList<Movimiento> movimientos)
        {
                try (InputStream input = CargadorCSV.class.getClassLoader().getResourceAsStream(archivoCSV);
                     BufferedReader reader = new BufferedReader(new InputStreamReader(input))) {
                        int cargados = 0;
                        String linea;
                        reader.readLine(); // Ignorar encabezado
                        while ((linea = reader.readLine()) != null) {
                                String[] campos = linea.split(",");
                                int id = Integer.parseInt(campos[0].trim());
                                int idClienteOrigen = Integer.parseInt(campos[1].trim());
                                int idCuentaOrigen = Integer.parseInt(campos[2].trim());
                                int idClienteDestino = Integer.parseInt(campos[3].trim());
                                int idCuentaDestino = Integer.parseInt(campos[4].trim());
                                LocalDateTime timestamp = LocalDateTime.parse(campos[5].trim(), FORMATTER);
                                BigDecimal monto = new BigDecimal(campos[6].trim());
                                TipoMovimiento tipo = TipoMovimiento.valueOf(campos[7].trim().toUpperCase());
                                Movimiento movimiento = new Movimiento(id, idClienteOrigen, idCuentaOrigen, idClienteDestino, idCuentaDestino, timestamp, monto, tipo);
                                movimientos.add(movimiento);
                                cargados++;
                        }
                        System.out.println(cargados + " movimientos cargados desde " + archivoCSV);
                } catch (IOException e) {
                        System.err.println("Error cargando CSV: " + e.getMessage());
                }
        }
}
