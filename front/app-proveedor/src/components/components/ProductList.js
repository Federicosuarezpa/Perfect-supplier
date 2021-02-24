import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getProducts } from '../../http/api2';

export default function Items(props) {
  const [data, setData] = useState([]);
  function useFetch() {
    async function getData() {
      const data = await getProducts();
      const listCategory = data?.message?.map((item) => (
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
            </div>
          </li>
        </Link>
      ));

      setData(listCategory);
    }

    useEffect(() => {
      getData();
    }, []);
    return (
      <>
        {' '}
        <ul className="item-list">{data}</ul>
      </>
    );
  }

  return <>{useFetch()}</>;
}
