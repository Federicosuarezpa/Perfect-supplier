import { useForm } from 'react-hook-form';

export default function AuthForm(props) {
  const { handleSubmit } = useForm();

  const onSubmit = async (data) => {};
  return (
    <div>
      <div>
        <div className="back">
          <div className="info">
            <h1>F2F Business</h1>
            <h2>El portal web donde puedes encontrar lo que necesitas</h2>
          </div>
        </div>
        <div className="formulario">
          <div className="formulario-square">
            <div className="square">
              <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="name">Nombre</label>
                <input id="name" name="name" placeholder="Introduzca su nombre" />
                <label htmlFor="email">Email</label>
                <input id="email" name="email" placeholder="Escriba su email" />
                <label htmlFor="mensaje">Mensaje</label>
                <textarea htmlFor="textarea" rows="10" cols="40" placeholder="Escriba un comentario..."></textarea>
                <input className="boton" type="submit" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
