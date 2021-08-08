import React,{useState, useEffect} from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faHome, faUtensils, faUsers, faParking, faDumbbell } from '@fortawesome/free-solid-svg-icons'

const StyledItem = styled.div`
    position: relative;
    height: 2em;
    width: 2em;
    font-size: 4vh;
    background-color: white;
    border: 2px solid #333;
    color: #473bf0;
    font-family: cursive;
    font-weight: bold;
    border-radius: 8px;
    display: grid;
    place-content: center;
    cursor: pointer;
    &:hover{
        border: 2px solid red;
    }
`;

const StyledItemSelected = styled(StyledItem)`
    border: 2px solid red;
`;

const StyledSpan = styled.span`
    position: absolute;
    top: 0;
    right: 0;
    font-size: 16px;
    font-weight: normal;
`;

function Item({value, rowIdx, colIdx, setValueInCell}) {
    const [selected, setSelected] = useState(false);

    const handleSelect=()=>{
        setSelected(!selected);
        setValueInCell(rowIdx, colIdx, value);
    }
    
    

    useEffect(() => {
        setSelected(false);
    }, [value]);

    return (
        <>
        {!selected ? <StyledItem onClick={handleSelect}>
            {getIcon(value[0])}
            <StyledSpan>{value[1]}</StyledSpan>
        </StyledItem>
        :
        <StyledItemSelected onClick={handleSelect}>
            {getIcon(value[0])}
            <StyledSpan>{value[1]}</StyledSpan>
        </StyledItemSelected>}
        </>
    )
}

export default Item;


function getIcon(text){
    if(text === 'h'){
        return <FontAwesomeIcon icon={faHome} />
    }
    else if(text === 'r'){
        return <FontAwesomeIcon icon={faUtensils} />
    }
    else if(text === 'm'){
        return <FontAwesomeIcon icon={faUsers} />
    }
    else if(text === 'p'){
        return <FontAwesomeIcon icon={faParking} />
    }
    else if(text === 't'){
        return <FontAwesomeIcon icon={faCoffee} />
    }
    else if(text === 'g'){
        return <FontAwesomeIcon icon={faDumbbell} />
    }
}
