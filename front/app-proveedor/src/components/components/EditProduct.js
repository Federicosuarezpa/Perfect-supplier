import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import profile from '../../svg/caja.svg';
import '../../stylesPages/infoProduct.css';
import { modifyProduct } from '../../http/api2';
import { getProductInfo } from '../../http/api2';
import useAuth from '../../shared/hooks/useAuth';

export default function Profile(props) {
  const { register, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const [statusMessage, setstatusMessage] = useState('');
  const { userData } = useAuth();
  const { deleteProducts } = useAuth();
  const [data, setData] = useState();
  function useFetch() {
    async function getData() {
      const dataInfo = await getProductInfo(window.location.pathname.split('/')[4]);
      setData(dataInfo);
    }

    useEffect(() => {
      getData();
    }, []);
  }
  const onDelete = async () => {
    await deleteProducts(window.location.pathname.split('/')[4]);
  };

  const onSubmit = async (data) => {
    try {
      const serverResponse = await modifyProduct(userData?.id, window.location.pathname.split('/')[4], data);
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
      {useFetch()}
      <div className="recuadroInfo">
        <div className="photoLeft">
          <img
            className="photoCenter"
            alt=" "
            src={`http://localhost:3000/uploads/${String.fromCharCode.apply(null, data?.message[0]?.photo?.data)}`}
          ></img>
        </div>
        <div className="infoRight">
          <div className="infoProduct">
            <h1 className="titleProduct">Información del producto</h1>
            <img src={profile} className="profile" alt="website logo"></img>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="nombre">Nombre</label>
              <input id="nombre" name="nombre" defaultValue={data?.message[0].name} ref={register()} />
              <label htmlFor="price">Precio</label>
              <input type="number" id="price" name="price" defaultValue={data?.message[0].price} ref={register()} />
              <label htmlFor="city">Ciudad</label>
              <input type="text" id="city" name="city" defaultValue={data?.message[0].location} ref={register()} />
              <label htmlFor="city">Categoría</label>
              <input
                type="text"
                id="category"
                name="category"
                defaultValue={data?.message[0].category}
                ref={register()}
              />

              <label htmlFor="bio">Bio</label>
              <textarea
                type="text"
                htmlFor="textarea"
                rows="10"
                cols="40"
                id="bio"
                defaultValue={data?.message[0].description}
                name="bio"
                ref={register()}
              ></textarea>
              <input className="fotoInput" type="file" name="foto" id="foto" ref={register()} />

              <input className="botonLogin" type="submit" value="Actualizar" />
              <hr></hr>
              <h4 className="registrado" onClick={onDelete}>
                Borrar cuenta
              </h4>
              {statusMessage.length > 0 && <p className="status-ok">{statusMessage}</p>}
              {errorMessage.length > 0 && <p className="error">{errorMessage}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
