package modelos;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class Movimiento
{
        private int id;
        private int idClienteOrigen;
        private int idCuentaOrigen;
        private int idClienteDestino;
        private int idCuentaDestino;
        private LocalDateTime timestamp;
        private BigDecimal monto;
        private TipoMovimiento tipo;
        
        public Movimiento(int id, int idClienteOrigen, int idCuentaOrigen,
                          int idClienteDestino, int idCuentaDestino,
                          LocalDateTime timestamp, BigDecimal monto, TipoMovimiento tipo)
        {
                this.id = id;
                this.idClienteOrigen = idClienteOrigen;
                this.idCuentaOrigen = idCuentaOrigen;
                this.idClienteDestino = idClienteDestino;
                this.idCuentaDestino = idCuentaDestino;
                this.timestamp = timestamp;
                this.monto = monto;
                this.tipo = tipo;
        }
        
        public BigDecimal getMonto()
        {
                return (this.monto);
        }
        
        public TipoMovimiento getTipo()
        {
                return (this.tipo);
        }
}
