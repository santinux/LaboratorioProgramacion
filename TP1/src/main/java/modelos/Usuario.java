package modelos;

public abstract class Usuario
{
        private byte tipoUsuario;
        private short id;
        private int nroDNI;
        private String nombre;
        private String apellido;
        
        protected Usuario(byte tipoUsuario, short id, int nroDNI, String nombre, String apellido)
        {
                this.tipoUsuario = tipoUsuario;
                this.id = id;
                this.nroDNI = nroDNI;
                this.nombre = nombre;
                this.apellido = apellido;
        }
        
        protected abstract byte getTipoUsuario();
}
