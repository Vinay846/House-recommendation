import React,{useState} from 'react'
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import {Button, Input} from '../Components/styles';

const StyledDiv = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
    margin-top: 8rem;
`;

const StyledInput = styled.div`
    text-align: center;
`;

function Home() {
    const [row, setrow] = useState('');
    const [col, setCol] = useState('');
    const history = useHistory();

    const handleGo=()=> {
        if(row.length === 0 || col.length === 0){
            return;
        }

        history.push(`./mat/${row}-${col}`);
    }

    return (
        <StyledDiv>
            <StyledInput>
                <Input value={row} type="number" placeholder="row" onChange={(e) => setrow(e.target.value)}/>
                    X
                <Input value={col} type="number" placeholder="column" onChange={(e) => setCol(e.target.value)}/>
            </StyledInput>
            <Button onClick={handleGo}>Go</Button>
            <Button onClick={() => history.push('./mat/def')}>Default</Button>
        </StyledDiv>
    )
}

export default Home
