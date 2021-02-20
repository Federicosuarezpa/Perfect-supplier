import { useForm } from 'react-hook-form';
import { useState } from 'react';
import profile from '../svg/caja.svg';
import { Link } from 'react-router-dom';
import useAuth from '../shared/hooks/useAuth';
import '../stylesPages/newProduct.css';
export default function LoginForm(props) {
  const { register, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const [statusMessage, setstatusMessage] = useState('');
  const { userData } = useAuth();

  const categorys = () => {
    const category = ['Tecnología', 'Ocio', 'Cocina', 'Limpieza', 'Baño', 'Actualidad', 'Revista', 'Libro'];
    const listCategory = category.map((item) => <option value={item}>{item}</option>);
    return <>{listCategory}</>;
  };
  const cities = () => {
    const cities = [
      'Barcelona',
      'Madrid',
      'Tarragona',
      'Malaga',
      'Lleida',
      'Zaragoza',
      'Asturias',
      'Coruña',
      'Vigo',
      'Lugo',
      'Valladolid',
    ];
    const listCities = cities.map((item) => <option value={item}>{item}</option>);
    return <>{listCities}</>;
  };
  const onSubmit = async (data) => {
    try {
      const serverResponse = await props.onSubmit(data);
      if (errorMessage.length > 0) {
        setErrorMessage('');
      }
      if (serverResponse.status === 200) {
        setstatusMessage('');
        setErrorMessage('');
        setstatusMessage('Información actualizada con exito');
      }
      if (serverResponse.status !== 200) {
        setErrorMessage('Ha habido un error, es posible que falten campos');
      }
    } catch (error) {
      setstatusMessage('');
      setErrorMessage('');
      setErrorMessage('error');
    }
  };

  return (
    <div className="backgroundProfile">
      <div className="recuadroProduct">
        <div className="panel">
          <Link to={`/profile/${userData?.id}`}>
            <p className="opcion">Información personal</p>
          </Link>
          <Link to={`/profile/${userData?.id}/newProduct`}>
            <p className="selected opcion">Añadir Producto</p>
          </Link>
          <Link>
            <p className="opcion">Reservas</p>
          </Link>
          <Link>
            <p className="opcion">Productos publicados</p>
          </Link>
        </div>
        <div className="infoPanel">
          <div className="dropdown alineado">
            <p className=" op2">☰</p>
            <div className="dropdown-content">
              <Link to={`/profile/${userData?.id}`}>Información personal</Link>
              <Link to={`/profile/${userData?.id}/newProduct`}>Añadir Producto</Link>
              <Link>Reservas</Link>
              <Link>Productos publicados</Link>
            </div>
          </div>
          <div className="infoUser">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1>Publicar Producto</h1>
              <img src={profile} className="profile" alt="website logo" />

              <label htmlFor="nombre">Nombre del producto</label>
              <input
                id="nombre"
                autocomplete="off"
                name="nombre"
                placeholder="Introduzca el nombre"
                ref={register({ required: true })}
              />
              <label htmlFor="category">Categoría</label>
              <select id="category" name="category" ref={register()}>
                {categorys()}
              </select>
              <label htmlFor="ciudad">Ciudad</label>
              <select id="ciudad" name="ciudad" ref={register()}>
                {cities()}
              </select>
              <label htmlFor="email">Precio en €</label>
              <input
                id="email"
                type="number"
                min="1"
                name="email"
                autoComplete="off"
                placeholder="Introduzca el precio"
                ref={register({ required: true })}
              />
              <label htmlFor="description">Descripción</label>
              <textarea
                htmlFor="textarea"
                rows="10"
                cols="40"
                id="description"
                name="description"
                placeholder="Escriba una breve descripción del producto..."
                ref={register()}
              ></textarea>
              <input className="fotoInput" type="file" name="foto" id="foto" ref={register()} />
              <input className="botonLogin" type="submit" value="Publicar Producto" />
              <hr></hr>
              {statusMessage.length > 0 && <p className="status-ok">{statusMessage}</p>}
              {errorMessage.length > 0 && <p className="error">{errorMessage}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
