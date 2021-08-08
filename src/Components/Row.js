import React from 'react'
import Item from './Item'
import styled from 'styled-components';

const StyledRow = styled.li`
    display: flex;
    justify-content: center;
`;

function Row({row, rowIdx, setValueInCell}) {
    return (
        <StyledRow>
            {row.map((cell, colIdx) => (
                <Item 
                    key={colIdx}
                    value={cell}
                    colIdx={colIdx}
                    rowIdx={rowIdx}
                    setValueInCell={setValueInCell}
                />
            ))}
        </StyledRow>
    )
}

export default Row
