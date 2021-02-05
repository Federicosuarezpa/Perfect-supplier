import { useState } from 'react';
import Rodal from 'rodal';

// Estilos del dialogo
import 'rodal/lib/rodal.css';
import ResponsiveRodal from '../components/ResponsiveRodal';
import useMatchMedia from '../shared/hooks/useMatchMedia';
export default function BotonRegistro() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { matches } = useMatchMedia('(max-width: 600px)');

  const showDialog = () => {
    setIsDialogOpen(true);
  };
  const hideDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <a className="links" onClick={showDialog}>
        Registrarse
      </a>
      <ResponsiveRodal
        visible={isDialogOpen}
        onClose={hideDialog}
        closeOnEsc={true}
        className="dialogo-reshulon"
        customStyles={{ width: matches ? '100%' : '50px', height: matches ? '100%' : '5rem' }}
        animation="zoom"
      >
        <h1>Iniciar sesión</h1>
        <h2>Nombre</h2>
        <h2>Contraseña</h2>
        <button onClick={hideDialog}>Salir</button>
      </ResponsiveRodal>
    </>
  );
}
