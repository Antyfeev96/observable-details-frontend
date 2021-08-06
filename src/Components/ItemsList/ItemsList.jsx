import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux'
import {
  setSelectedId,
  fetchServicesRequest,
  fetchServicesSuccess,
  fetchServicesError,
  fetchServiceRequest
} from '../../Reducers/Reducers';
import React, { useEffect } from "react";
import API from "../../API";
import Spinner from "../Spinner/Spinner";
import Error from "../Error/Error";
import { Link, useRouteMatch, } from "react-router-dom";

const api = new API();

const List = styled.ul`
  box-sizing: border-box;
  width: 100%;
  margin-top: 25px;
  padding: 15px;
  border: 1px solid black;
  border-radius: 5px;

  & .item {
    text-align: center;

    &::marker {
      font-size: 0;
    }
  }

  a {
    text-decoration: none;
    outline: none;
    color: black;
  }

  & .item:nth-of-type(n + 2) {
    margin-top: 15px;
  }
`

const fetchServices = async dispatch => {
  dispatch(fetchServicesRequest());
  try {
    const response = await api.fetchItems();
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    dispatch(fetchServicesSuccess(data));
  } catch(e) {
    dispatch(fetchServicesError(e));
  }
}

export default function ItemsList() {
  const state = useSelector(({ services }) => services);
  const dispatch = useDispatch();
  const match = useRouteMatch();

  useEffect(() => {
    fetchServices(dispatch);
  }, [dispatch])


  const handleDetails = async (id) => {
    dispatch(setSelectedId(+id))
  }

  const handleRepeat = async () => {
    fetchServices(dispatch);
  }

  return (
    <List>
      {(state.error && <Error handleRepeat={handleRepeat} />) ||
        (state.loading || state.list.length === 0 ? (
          <Spinner />
        ) : (
          state.list.map((item) => (
            <li
              onClick={() => handleDetails(item.id)}
              key={item.id}
              className='item'
            >
              <Link to={`${match.url}/${item.id}`}>
                {item.name} {item.price} <span>₽</span>
              </Link>
            </li>
          ))
        ))}
    </List>
  );
}
