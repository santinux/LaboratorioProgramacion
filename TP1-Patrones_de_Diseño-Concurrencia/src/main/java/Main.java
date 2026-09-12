import vistas.VistaPrincipal;

import javax.swing.*;

public class Main
{
        public static void main(String[] args)
        {
                SwingUtilities.invokeLater(() -> {
                        VistaPrincipal vistaPrincipal = new VistaPrincipal();
                        vistaPrincipal.setVisible(true);
                });
        }
}
