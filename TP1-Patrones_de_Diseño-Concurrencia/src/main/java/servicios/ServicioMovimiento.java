package servicios;

import modelos.Movimiento;
import repositorios.RepositorioMovimiento;
import utils.CalculadoraMovimientos;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.concurrent.ForkJoinPool;

public class ServicioMovimiento
{
        private final RepositorioMovimiento repositorioMovimiento;
        
        public ServicioMovimiento()
        {
                this.repositorioMovimiento = new RepositorioMovimiento();
        }
        
        private ArrayList<Movimiento> obtenerMovimientosDeCliente(int idCliente)
        {
                return (this.repositorioMovimiento.listarPorId(idCliente));
        }
        
        public BigDecimal[] calcularResumenDeCliente(int idCliente)
        {
                ArrayList<Movimiento> movimientos = obtenerMovimientosDeCliente(idCliente);
                ForkJoinPool pool = new ForkJoinPool();
                CalculadoraMovimientos tarea = new CalculadoraMovimientos(movimientos);
                return (pool.invoke(tarea));
        }
}
