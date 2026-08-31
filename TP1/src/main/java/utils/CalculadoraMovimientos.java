package utils;

import modelos.Movimiento;
import modelos.TipoMovimiento;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.concurrent.RecursiveTask;

/**
 * Implementación de RecursiveTask que suma los montos de movimientos de forma
 * paralela usando ForkJoin.
 * Retorna un array de BigDecimal donde [0] = total ingresos, [1] = total egresos.
 * Aclaración: Se trabaja con BigDecimal porque es el estándar para representar
 * dinero, así también está definido en los modelos. ;)
 */
public class CalculadoraMovimientos extends RecursiveTask<BigDecimal[]>
{
        private static final int UMBRAL = 1000; // Límite para dividir en subtareas
        private final int inicio;
        private final int fin;
        private final ArrayList<Movimiento> movimientos;
        
        public CalculadoraMovimientos(ArrayList<Movimiento> movimientos)
        {
                this.movimientos = movimientos;
                this.inicio = 0;
                this.fin = movimientos.size();
        }
        
        private CalculadoraMovimientos(ArrayList<Movimiento> movimientos, int inicio, int fin)
        {
                this.movimientos = movimientos;
                this.inicio = inicio;
                this.fin = fin;
        }
        
        /**
         * Se encarga de dividir la tarea en subtareas mientras sea necesario
         * (esto lo definimos en el umbral) y ejecutarlas en paralelo.
         *
         * @return array de BigDecimal donde [0] = total ingresos, [1] = total egresos.
         */
        @Override
        protected BigDecimal[] compute()
        {
                int longitud = fin - inicio;
                BigDecimal[] resultado;
                
                // Si el rango es menor o igual al umbral, calcular secuencialmente
                if (longitud <= UMBRAL) {
                        resultado = sumarMovimientos();
                } else {
                        // Dividir la tarea en dos subtareas
                        int medio = inicio + (longitud / 2);
                        
                        CalculadoraMovimientos tareaIzquierda = new CalculadoraMovimientos(movimientos, inicio, medio);
                        CalculadoraMovimientos tareaDerecha = new CalculadoraMovimientos(movimientos, medio, fin);
                        
                        // Fork: ejecutar la subtarea derecha en otro hilo
                        tareaDerecha.fork();
                        
                        // Compute: ejecutar la subtarea izquierda en el hilo actual
                        BigDecimal[] resultadoIzquierda = tareaIzquierda.compute();
                        
                        // Join: esperar el resultado de la subtarea derecha
                        BigDecimal[] resultadoDerecha = tareaDerecha.join();
                        
                        // Combinar resultados [ingresos, egresos]
                        resultado = new BigDecimal[]{
                                resultadoIzquierda[0].add(resultadoDerecha[0]),
                                resultadoIzquierda[1].add(resultadoDerecha[1])
                        };
                }
                return (resultado);
        }
        
        /**
         * Calcula los movimientos de la subtarea cuando ya es indivisible.
         *
         * @return array de BigDecimal donde [0] = total ingresos, [1] = total egresos.
         */
        private BigDecimal[] sumarMovimientos()
        {
                BigDecimal totalIngresos = BigDecimal.ZERO;
                BigDecimal totalEgresos = BigDecimal.ZERO;
                
                // Iterar sobre los movimientos de la subtarea sumando los
                // montos según su tipo (ingreso o egreso)
                for (int i = inicio; i < fin; i++) {
                        Movimiento movimiento = movimientos.get(i);
                        if (movimiento.getTipo() == TipoMovimiento.INGRESO) {
                                totalIngresos = totalIngresos.add(movimiento.getMonto());
                        } else {
                                totalEgresos = totalEgresos.add(movimiento.getMonto());
                        }
                }
                
                return new BigDecimal[]{totalIngresos, totalEgresos};
        }
}
