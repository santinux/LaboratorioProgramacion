package repositorios;

import modelos.Movimiento;
import utils.CargadorCSV;

import java.util.ArrayList;

public class RepositorioMovimiento
{
        private final ArrayList<Movimiento> movimientos;
        
        public RepositorioMovimiento()
        {
                this.movimientos = new ArrayList<>();
                CargadorCSV.cargarMovimientosDesdeCSV("data/movimientos.csv", this.movimientos);
        }
        
        public ArrayList<Movimiento> listarPorId(int id)
        {
                // TEMPORAL (DEMO) todos los movimientos son del mismo cliente
                return (this.movimientos);
        }
}
