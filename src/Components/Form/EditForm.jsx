import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchServiceRequest, fetchServiceSuccess,
  setSelectedId,
  clearSelectedId,
  fetchServicesSuccess, fetchServicesError
} from "../../Reducers/Reducers";
import React, { Fragment, useEffect } from "react";
import Error from "../Error/Error";
import Spinner from "../Spinner/Spinner";
import { useHistory } from "react-router-dom";
import API from "../../API";
const api = new API()

const Div = styled.div`
  input {
    display: block;
    padding: 2px;
    margin-top: 15px;
    width: 200px;
  }

  .form__buttons {
    margin-top: 15px;

    & button:nth-of-type(n + 2) {
      margin-left: 15px;
    }
  }
`;

const NameField = styled.div``;

const PriceField = styled.div``;

const ContentField = styled.div``;

const Button = styled.button`
  padding: 5px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 20px;
`;

const fetchService = async (dispatch, id) => {
  dispatch(fetchServiceRequest());
  try {
    const response = await api.getItem(id);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    dispatch(fetchServiceSuccess(data));
  } catch(e) {
    console.log(e)
    dispatch(fetchServicesError(e));
  }
}

export default function EditForm() {
  const state = useSelector(({ services }) => services);
  console.log({state});
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (state.selectedId === null && state.name === '') return;
    dispatch(fetchServiceRequest(state.selectedId))
  }, [dispatch]);

  const handleCancel = () => {
    history.goBack();
    dispatch(clearSelectedId());
  };

  const handleRepeat = async () => {
    fetchService(dispatch, state.selectedId)
  }

  return (
    <Fragment>
      {(state.error && <Error handleRepeat={handleRepeat} />) ||
        ((state.loading || state.name === '') ? (
          <Spinner />
        ) : (
          <Div className='form'>
            <NameField className='form__name' name='name'>
              Название: {state.name}
            </NameField>
            <PriceField className='form__price' name='price'>
              Стоимость: {state.price}
            </PriceField>
            <ContentField className='form__content' name='content'>
              Описание: {state.content}
            </ContentField>
            <div className='form__buttons'>
              <Button
                className='form__cancel'
                onClick={handleCancel}
                type='button'
              >
                Cancel
              </Button>
            </div>
          </Div>
        ))}
    </Fragment>
  );
}
