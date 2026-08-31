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
        
        protected void setId(int id)
        {
                this.id = id;
        }
        
        protected abstract byte getTipoUsuario();
}
