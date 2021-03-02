import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getProducts } from '../../http/api2';
import { Slider } from '@material-ui/core';
import filter from '../../svg/filter.svg';
import useAuth from '../../shared/hooks/useAuth';

export default function Items(props) {
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [location, setLocation] = useState('Todas');
  const [category, setCategory] = useState('Todas');
  const { isUserLogged, userData } = useAuth();
  const [price, setPrice] = useState(0);
  const cities = () => {
    const cities = [
      'Todas',
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
  const categorys = () => {
    const category = ['Todas', 'Tecnología', 'Ocio', 'Cocina', 'Limpieza', 'Baño', 'Actualidad', 'Revista', 'Libro'];
    const listCategory = category.map((item) => <option value={item}>{item}</option>);
    return <>{listCategory}</>;
  };

  const onChangePrice = (value) => {
    setPrice(value);
    const reduced = data.reduce(function (filtered, option) {
      if (
        (location === 'Todas' || option.location === location) &&
        option.price > value &&
        (category === 'Todas' || option.category === category)
      ) {
        filtered.push(option);
      }
      return filtered;
    }, []);
    const listFiltered = reduced.map((item) => (
      <Link to={`/all/${item.id}`}>
        <li class="itemProduct">
          <div className="item-image">
            <img
              className="imagen"
              src={`http://localhost:3000/uploads/${String.fromCharCode.apply(null, item?.photo?.data)}`}
              alt="productsUser"
            ></img>
          </div>
          <div className="item-detail">
            <p className="nombreItem">{item.name}</p>
            <em>{item.price}€</em>
          </div>
        </li>
      </Link>
    ));
    setProducts(listFiltered);
  };
  const onChangeCity = (value) => {
    setLocation(value.target.value);
    const reduced = data.reduce(function (filtered, option) {
      if (
        (value.target.value === 'Todas' || option.location === value.target.value) &&
        option.price > price &&
        (category === 'Todas' || option.category === category)
      ) {
        filtered.push(option);
      }
      return filtered;
    }, []);
    const listFiltered = reduced.map((item) => (
      <Link to={`/all/${item.id}`}>
        <li class="itemProduct">
          <div className="item-image">
            <img
              className="imagen"
              src={`http://localhost:3000/uploads/${String.fromCharCode.apply(null, item?.photo?.data)}`}
              alt="productsUser"
            ></img>
          </div>
          <div className="item-detail">
            <p className="nombreItem">{item.name}</p>
            <em>{item.price}€</em>
          </div>
        </li>
      </Link>
    ));
    setProducts(listFiltered);
  };
  const onChangeCategory = (value) => {
    console.log(price);
    console.log(location);
    setCategory(value.target.value);
    const reduced = data.reduce(function (filtered, option) {
      if (
        (value.target.value === 'Todas' || option.category === value.target.value) &&
        option.price > price &&
        (location === 'Todas' || option.location === location)
      ) {
        filtered.push(option);
      }
      return filtered;
    }, []);
    const listFiltered = reduced.map((item) => (
      <Link to={`/all/${item.id}`}>
        <li class="itemProduct">
          <div className="item-image">
            <img
              className="imagen"
              src={`http://localhost:3000/uploads/${String.fromCharCode.apply(null, item?.photo?.data)}`}
              alt="productsUser"
            ></img>
          </div>
          <div className="item-detail">
            <p className="nombreItem">{item.name}</p>
            <em>{item.price}€</em>
          </div>
        </li>
      </Link>
    ));
    setProducts(listFiltered);
  };
  function useFetch() {
    async function getData() {
      let dataInfo = await getProducts();
      dataInfo = dataInfo.message;
      if (userData?.id) {
        dataInfo = dataInfo.reduce(function (filtered, option) {
          if (option.id_user !== userData?.id) filtered.push(option);
          return filtered;
        }, []);
      }
      const listCategory = dataInfo.map((item) => (
        <Link to={`/all/${item.id}`}>
          <li class="itemProduct">
            <div className="item-image">
              <img
                className="imagen"
                src={`http://localhost:3000/uploads/${String.fromCharCode.apply(null, item?.photo?.data)}`}
                alt="productsUser"
              ></img>
            </div>
            <div className="item-detail">
              <p className="nombreItem">{item.name}</p>
              <em>{item.price}€</em>
            </div>
          </li>
        </Link>
      ));
      setData(dataInfo);

      setProducts(listCategory);
    }

    useEffect(() => {
      getData();
    }, []);
    return (
      <>
        <div className="dropdown alineadoLeft">
          <img src={filter} className="filter"></img>
          <div className="dropdown-content-filter">
            <p>Precio</p>
            <Slider
              value={price}
              aria-labelledby="discrete-slider-always"
              step={10}
              valueLabelDisplay="on"
              max={999}
              onChange={(e, value) => onChangePrice(value)}
            />
            <p>Ciudad</p>
            <select id="location" name="location" value={location} onChange={(e) => onChangeCity(e)}>
              {cities()}
            </select>
            <p>Categoría</p>
            <select id="category" name="category" value={category} onChange={(e) => onChangeCategory(e)}>
              {categorys()}
            </select>
          </div>
        </div>
        <ul className="item-list">{products}</ul>
      </>
    );
  }

  return <>{useFetch()}</>;
}
