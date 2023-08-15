import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { idbPromise } from '../utils/helpers';


import Cart from '../components/Cart';
import { useStoreContext } from '../utils/GlobalState';
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS,
} from '../utils/actions';
import { QUERY_PRODUCTS } from '../utils/queries';

import spinner from '../assets/spinner.gif';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    if (data) {
      setProducts(data.products);
      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    } else if (!loading) {
      idbPromise('products', 'get').then((indexedProducts) => {
        setProducts(indexedProducts);
      });
    }
  }, [data, loading]);

  return (
    <div className='container-fluid'>
      <h1>Dashboard</h1>
      <div className='flex-wrap'>
        <div className='bg-secondary'>
          <a href="/dashboard" className='d-flex text-decoration-none align-items-center'>
            <span className='mr-3'>Sidemenu</span>
          </a>
          <ul>
            <li>
              <a href='/'>Users</a>
            </li>
            <li>
              <a href='/'>Orders</a>
            </li>
          </ul>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
