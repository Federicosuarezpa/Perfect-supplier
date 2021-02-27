import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import profile from '../../svg/caja.svg';
import '../../stylesPages/infoProduct.css';
import { getProductInfo } from '../../http/api2';
import useAuth from '../../shared/hooks/useAuth';
import { useHistory } from 'react-router-dom';
import estrella from '../../svg/estrella.svg';
import { buyProduct } from '../../http/api2';

export default function Profile(props) {
  const { register, handleSubmit } = useForm();
  const [errorMessage] = useState('');
  const [statusMessage, setstatusMessage] = useState('');
  const [data, setData] = useState();
  const { isUserLogged, userData } = useAuth();
  const history = useHistory();
  function useFetch() {
    async function getData() {
      const dataInfo = await getProductInfo(window.location.pathname.split('/')[2]);
      dataInfo.message[0].price = dataInfo.message[0].price + ' €';
      setData(dataInfo);
    }

    useEffect(() => {
      getData();
    }, []);
  }
  const onBuy = async (data) => {
    if (!isUserLogged) history.push('/login');
    if (isUserLogged) {
      const message = await buyProduct(
        userData?.id,
        Number(data.price.split(' ')[0]),
        window.location.pathname.split('/')[2]
      );
      setstatusMessage(message.message);
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
            <form onSubmit={handleSubmit(onBuy)}>
              <label htmlFor="nombre">Nombre</label>
              <input
                id="nombre"
                name="nombre"
                defaultValue={data?.message[0].name}
                readOnly="on"
                type="text"
                ref={register()}
              />
              <label htmlFor="price">Precio</label>
              <input
                type="text"
                id="price"
                name="price"
                defaultValue={data?.message[0].price}
                readOnly="on"
                ref={register()}
              />
              <label htmlFor="city">Ciudad</label>
              <input type="text" id="city" name="city" defaultValue={data?.message[0].location} readOnly="on" />
              <label htmlFor="bio">Bio</label>
              <textarea
                type="text"
                htmlFor="textarea"
                rows="10"
                cols="40"
                id="bio"
                readOnly="on"
                defaultValue={data?.message[0].description}
                name="bio"
              ></textarea>
              <input className="botonLogin" type="submit" value="Comprar" />
              <hr></hr>
              <img src={estrella} className="star" alt="website logo" />
              <img src={estrella} className="star" alt="website logo" />
              <img src={estrella} className="star" alt="website logo" />
              <img src={estrella} className="star" alt="website logo" />
              <img src={estrella} className="star" alt="website logo" />

              {statusMessage.length > 0 && <p className="status-ok">{statusMessage}</p>}
              {errorMessage.length > 0 && <p className="error">{errorMessage}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
