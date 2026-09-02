package modelos;

public abstract class Usuario
{
        private byte tipoUsuario;
        private int id;
        private int nroDNI;
        private String nombre;
        private String apellido;
        
        protected Usuario(byte tipoUsuario, int id, int nroDNI, String nombre, String apellido)
        {
                this.tipoUsuario = tipoUsuario;
                this.id = id;
                this.nroDNI = nroDNI;
                this.nombre = nombre;
                this.apellido = apellido;
        }
        
        // Abstracta porque hay polimorfismo según el tipo de usuario
        protected abstract byte getTipoUsuario();
        
        protected int getId()
        {
                return (this.id);
        }
        
        protected void setId(int id)
        {
                this.id = id;
        }
        
        protected int getNroDNI()
        {
                return (this.nroDNI);
        }
        
        protected String getNombre()
        {
                return (this.nombre);
        }
}
