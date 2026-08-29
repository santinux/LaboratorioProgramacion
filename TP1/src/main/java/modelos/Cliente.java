package modelos;

public class Cliente extends Usuario
{
        private Cliente(byte tipoUsuario, short id, int nroDNI, String nombre, String apellido)
        {
                super(tipoUsuario, id, nroDNI, nombre, apellido);
        }
        
        /**
         * Constructor de clase.
         * Crea y retorna un nuevo cliente.
         *
         * @param nroDNI
         * @param nombre
         * @param apellido
         * @return
         */
        public static Cliente crearCliente(int nroDNI, String nombre, String apellido)
        {
                short id = buscarUltimoIDEnDB();
                return new Cliente((byte) 0, id, nroDNI, nombre, apellido);
        }
        
        private static short buscarUltimoIDEnDB()
        {
                return 0;
        }
        
        @Override
        protected byte getTipoUsuario()
        {
                return 0;
        }
}
