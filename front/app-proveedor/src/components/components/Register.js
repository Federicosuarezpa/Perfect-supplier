import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import candado from '../../svg/candado.svg';
import email from '../../svg/email.svg';
import user from '../../svg/user.svg';

import profile from '../../svg/profile-user.svg';

export default function Register(props) {
  const { register, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const [statusMessage, setstatusMessage] = useState('');
  const [passwordOne, setPasswordOne] = useState('');
  const [passWordConfirm, setPassWordConfirm] = useState('');
  const [message, setMessage] = useState('');
  const [confirm, setConfirm] = useState('');

  const validatePass = () => {
    if (passwordOne.length < 8 && passwordOne.length > 0) setMessage('Debe tener al menos 8 carácteres');
    if (passwordOne.length >= 8) {
      if (!/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(passwordOne)) setMessage('Falta un carácter especial');
      else if (!/\d/.test(passwordOne)) setMessage('Falta un número');
      else if (passwordOne.toLowerCase() === passwordOne) setMessage('Falta una mayúscula');
      else if (passwordOne.toUpperCase() === passwordOne) setMessage('Falta una minúscula');
      else setMessage('');
    }
  };
  const validatePassConfirm = () => {
    if (passwordOne !== passWordConfirm) setConfirm('Las contraseñas no coinciden');
    else setConfirm('');
  };
  const onSubmit = async (data) => {
    try {
      const serverResponse = await props.onSubmit(data.name, data.email, data.password, data.confirmPassword);
      if (errorMessage.length > 0) {
        setErrorMessage('');
      }
      if (serverResponse.message) {
        setstatusMessage(serverResponse.message);
      }
    } catch (error) {
      setstatusMessage('');
      setErrorMessage(error);
    }
  };

  return (
    <div className="background">
      <div className="recuadro">
        <div className="login">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Registrarse</h1>
            <a target="_blank" rel="noopener noreferrer" href="/register">
              <img src={profile} className="profile" alt="website logo" />
            </a>
            <label htmlFor="name">Nombre</label>
            <input
              id="name"
              autocomplete="off"
              name="name"
              placeholder="Introduzca el nombre"
              ref={register({ required: true })}
            />
            <img src={user} className="key"></img>

            <label htmlFor="email">Email</label>
            <input
              id="email"
              autocomplete="off"
              name="email"
              placeholder="Introduzca el email"
              ref={register({ required: true })}
            />
            <img src={email} className="key"></img>

            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              name="password"
              value={passwordOne}
              onChange={(e) => setPasswordOne(e.target.value)}
              onKeyUp={validatePass}
              placeholder="Introduzca la contraseña"
              ref={register({ required: true, minLength: 8 })}
            />
            <img src={candado} className="key"></img>

            <p className="problema">{message}</p>
            <label htmlFor="confirmPassword">Confirma la contraseña</label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Confirme la contraseña"
              value={passWordConfirm}
              onChange={(e) => setPassWordConfirm(e.target.value)}
              onKeyUp={validatePassConfirm}
              ref={register({ required: true, minLength: 8 })}
            ></input>
            <img src={candado} className="key"></img>
            <p className="problema">{confirm}</p>
            <input className="botonLogin" type="submit" />
            <hr></hr>
            <Link className="registrado" to="/login">
              ¿Ya está registrado?
            </Link>
            {statusMessage.length > 0 && <p className="status-ok">{statusMessage}</p>}
            {errorMessage.length > 0 && <p className="error">{errorMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
