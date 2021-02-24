import { useState, useEffect } from 'react';
import profile from '../../svg/caja.svg';
import '../../stylesPages/infoProduct.css';
import { getProductInfo } from '../../http/api2';
import useAuth from '../../shared/hooks/useAuth';
import { useHistory } from 'react-router-dom';

export default function Profile(props) {
  const [errorMessage] = useState('');
  const [statusMessage] = useState('');
  const [data, setData] = useState();
  const { isUserLogged } = useAuth();
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
  const buy = () => {
    if (!isUserLogged) history.push('/login');
    if (isUserLogged) console.log('comprar'); //falta implementar la llamada
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

            <label htmlFor="nombre">Nombre</label>
            <input id="nombre" name="nombre" defaultValue={data?.message[0].name} disabled="off" type="text" />
            <label htmlFor="price">Precio</label>
            <input type="text" id="price" name="price" defaultValue={data?.message[0].price} disabled="off" />
            <label htmlFor="city">Ciudad</label>
            <input type="text" id="city" name="city" defaultValue={data?.message[0].location} disabled="off" />
            <label htmlFor="bio">Bio</label>
            <textarea
              type="text"
              htmlFor="textarea"
              rows="10"
              cols="40"
              id="bio"
              disabled="off"
              defaultValue={data?.message[0].description}
              name="bio"
            ></textarea>
            <input className="botonLogin" type="submit" value="Comprar" onClick={buy} />
            <hr></hr>
            {statusMessage.length > 0 && <p className="status-ok">{statusMessage}</p>}
            {errorMessage.length > 0 && <p className="error">{errorMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
