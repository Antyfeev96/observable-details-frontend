import React from 'react';
import styled from 'styled-components';

const StyledError = styled.div`
    height: 100px; 
    padding: 15px;
    margin: 0 auto;
    text-align: center;
    background-color: red;
    color: white;
`;

const RepeatButton = styled.button`
    margin-top: 15px;
    padding: 10px;
    text-aligh: center;
    background-color: green;
    color: white;

    &:hover {
        cursor: pointer;
    }
`

const Error = ({ handleRepeat }) => {
    return (
        <StyledError>
            Произошла ошибка! <br/>
            Проверьте соединение и обновите страницу
            <RepeatButton onClick={async () => await handleRepeat()}>Повторить попытку</RepeatButton>
        </StyledError>
    );
};

export default Error;