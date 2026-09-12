package modelos;

public class Cliente extends Usuario
{
        public Cliente(int id, int nroDNI, String nombre, String apellido)
        {
                super((byte) 1, id, nroDNI, nombre, apellido);
        }
        
        @Override
        protected byte getTipoUsuario()
        {
                return 0;
        }
        
        @Override
        public int getId()
        {
                return (super.getId());
        }
        
        @Override
        public void setId(int id)
        {
                super.setId(id);
        }
        
        @Override
        public int getNroDNI()
        {
                return (super.getNroDNI());
        }
        
        @Override
        public String getNombre()
        {
                return (super.getNombre());
        }
}
