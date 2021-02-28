import { useState, useEffect } from 'react';
import profile from '../../svg/caja.svg';
import '../../stylesPages/infoProduct.css';
import { getProductInfo } from '../../http/api2';
import useAuth from '../../shared/hooks/useAuth';
import { Rating } from '@material-ui/lab';
import { getRated } from '../../http/api2';
import { voteProduct } from '../../http/api2';
export default function Profile(props) {
  const [errorMessage] = useState('');
  const [statusMessage, setstatusMessage] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [value, setValue] = useState();

  const { userData } = useAuth();
  const [data, setData] = useState();
  function useFetch() {
    async function getData() {
      const dataInfo = await getProductInfo(window.location.pathname.split('/')[4]);
      setData(dataInfo);
      const rated = await getRated(window.location.pathname.split('/')[6]);
      if (rated.message.length > 0) {
        setValue(
          <Rating
            name="half-rating-read"
            value={rated.message[0].rating}
            onChange={(e, value) => onChange(e, value)}
            readOnly={true}
          />
        );
      } else {
        setValue(
          <Rating name="half-rating-read" value={2} onChange={(e, value) => onChange(e, value)} readOnly={disabled} />
        );
      }
    }

    useEffect(() => {
      getData();
    }, []);
  }
  const onChange = async (e, value) => {
    console.log(value);
    setValue(
      <Rating name="half-rating-read" value={value} onChange={(e, value) => onChange(e, value)} readOnly={true} />
    );
    setDisabled(true);
    const message = await voteProduct(userData?.id, window.location.pathname.split('/')[6], value, 'Buen Producto');
    setstatusMessage(message);
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
            <input id="nombre" name="nombre" defaultValue={data?.message[0].name} readOnly />
            <label htmlFor="price">Precio</label>
            <input type="number" id="price" name="price" defaultValue={data?.message[0].price} readOnly />
            <label htmlFor="city">Ciudad</label>
            <input type="text" id="city" name="city" defaultValue={data?.message[0].location} readOnly />
            <label htmlFor="city">Categoría</label>
            <input type="text" id="category" name="category" defaultValue={data?.message[0].category} readOnly />

            <label htmlFor="bio">Bio</label>
            <textarea
              type="text"
              htmlFor="textarea"
              rows="10"
              cols="40"
              id="bio"
              defaultValue={data?.message[0].description}
              name="bio"
              readOnly
            ></textarea>

            <hr></hr>
            {value}
            {statusMessage.length > 0 && <p className="status-ok">{statusMessage}</p>}
            {errorMessage.length > 0 && <p className="error">{errorMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
