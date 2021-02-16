import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import profile from '../svg/profile-user.svg';

export default function LoginForm(props) {
  const { register, handleSubmit, errors } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const [statusMessage, setstatusMessage] = useState('');

  const onSubmit = async (data) => {
    try {
      const serverResponse = await props.onSubmit(data.name, data.email, data.password, data.confirmPassword);
      if (errorMessage.length > 0) {
        setErrorMessage('');
      }
      if (serverResponse.message) {
        setstatusMessage(serverResponse.message);
        //if (serverResponse.status === 'ok') //mirar como redireccionar a inicio
      }
    } catch (error) {
      setstatusMessage('');
      setErrorMessage(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Registro</h1>
      <a target="_blank" rel="noopener noreferrer" href="/register">
        <img src={profile} className="profile" alt="website logo" />
      </a>
      <label htmlFor="name">Nombre</label>
      <input id="name" name="name" placeholder="Introduzca el nombre" ref={register({ required: true })} />
      <label htmlFor="email">Email</label>
      <input id="email" name="email" placeholder="Introduzca el email" ref={register({ required: true })} />
      <label htmlFor="password">Contraseña</label>
      <input
        id="password"
        type="password"
        name="password"
        placeholder="Introduzca la contraseña"
        ref={register({ required: true, minLength: 8 })}
      />
      <label htmlFor="confirmPassword">Confirma la contraseña</label>
      <input
        id="confirmPassword"
        type="password"
        name="confirmPassword"
        placeholder="Confirme la contraseña"
        ref={register({ required: true, minLength: 8 })}
      ></input>
      <input className="botonLogin" type="submit" />
      {statusMessage.length > 0 && <p className="status-ok">{statusMessage}</p>}
      {errorMessage.length > 0 && <p className="error">{errorMessage}</p>}
    </form>
  );
}
