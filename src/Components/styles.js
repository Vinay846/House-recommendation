import styled from 'styled-components';

const Button = styled.button`
    color: #fff;
    background-color: #473bf0;
    padding: 5px 20px;
    border-radius: 8px 8px 8px 8px;
    border-color: transparent;
    letter-spacing: -.53px;
    font-weight: 500;
    line-height: 24px;
    font-size: 20px;
    cursor: pointer;

    &:hover {
        background-color: #2906EF;
    }
`;

const Input = styled.input`
    height: 24px;
    width: 16%;
    font-size: 20px;
    outline: none;
    border-radius: 4px;
    border-style: none;
    border: 1px solid black;
    padding: 4px;
`;

export {Button, Input};