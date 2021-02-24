import { useForm } from 'react-hook-form';
import { useState } from 'react';
import profile from '../../svg/caja.svg';
import { Link } from 'react-router-dom';
import useAuth from '../../shared/hooks/useAuth';
import '../../stylesPages/newProduct.css';
import { newProduct } from '../../http/api2';
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
      const serverResponse = await newProduct(data, userData?.id);
      if (errorMessage.length > 0) {
        setErrorMessage('');
      }
      if (serverResponse.status === 200) {
        setstatusMessage('');
        setErrorMessage('');
        setstatusMessage('El producto se ha publicado con exito');
      }
    } catch (error) {
      setstatusMessage('');
      setErrorMessage('');
      setErrorMessage('Ha ocurrido algún error');
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
          <Link to={`/profile/${userData?.id}/buy`}>
            <p className="opcion">Compras realizadas</p>
          </Link>
          <Link Link to={`/profile/${userData?.id}/all`}>
            <p className="opcion">Productos publicados</p>
          </Link>
        </div>
        <div className="infoPanel">
          <div className="dropdown alineado">
            <p className=" op2">☰</p>
            <div className="dropdown-content">
              <Link to={`/profile/${userData?.id}`}>Información personal</Link>
              <Link to={`/profile/${userData?.id}/newProduct`}>Añadir Producto</Link>
              <Link to={`/profile/${userData?.id}/buy`}>Compras realizadas</Link>
              <Link Link to={`/profile/${userData?.id}/all`}>
                Productos publicados
              </Link>
            </div>
          </div>
          <div className="infoUser">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1>Publicar Producto</h1>
              <img src={profile} className="profile" alt="website logo" />

              <label htmlFor="name">Nombre del producto</label>
              <input
                id="name"
                autocomplete="off"
                name="name"
                placeholder="Introduzca el nombre"
                ref={register({ required: true })}
              />
              <label htmlFor="category">Categoría</label>
              <select id="category" name="category" ref={register({ required: true })}>
                {categorys()}
              </select>
              <label htmlFor="location">Ciudad</label>
              <select id="location" name="location" ref={register({ required: true })}>
                {cities()}
              </select>
              <label htmlFor="price">Precio en €</label>
              <input
                id="price"
                type="number"
                min="1"
                name="price"
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
                ref={register({ required: true })}
              ></textarea>
              <input className="fotoInput" type="file" name="foto" id="foto" ref={register({ required: true })} />
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
