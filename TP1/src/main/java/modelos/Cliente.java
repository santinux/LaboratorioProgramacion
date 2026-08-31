package modelos;

public class Cliente extends Usuario
{
        public Cliente(int id, int nroDNI, String nombre, String apellido)
        {
                super((byte) 1, id, nroDNI, nombre, apellido);
        }
        
        @Override
        public void setId(int id)
        {
                super.setId(id);
        }
        
        @Override
        protected byte getTipoUsuario()
        {
                return 0;
        }
}
