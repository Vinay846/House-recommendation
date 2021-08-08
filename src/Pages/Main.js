import React,{useState, useEffect} from 'react'
import {useParams} from "react-router-dom";
import styled from 'styled-components';
import Row from '../Components/Row';
import {Button} from '../Components/styles';

const StyledDiv = styled.ul`
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 8rem;
    
`;

const StyledBottonDiv = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 4rem;
`;

const StyledSelect = styled.select`
    height: 32px;
    padding: 8px;
    border-radius: 4px;
`;

function Main() {
    let { size } = useParams();
    const [matrix, setMatrix] = useState([
        ["", "", "", "", "h3"],
        ["", "", "r", "", ""],
        ["", "m", "", "p", ""],
        ["", "", "h1", "", ""],
        ["", "t", "", "", ""],
        ["", "g", "", "", ""],
        ["h4", "", "", "", ""],
        ["", "", "", "", "h2"],
    ]);
    const [selectedValue, setSelectedValue] = useState("");
    const [SelectedMatrix, setSelectedMatrix] = useState({row: null, col: null});
    const [BestHouse, setBestHouse] = useState(null);

    const setValueInCell=(rowIdx, colIdx, value)=> {
        setSelectedMatrix({
            row: rowIdx,
            col: colIdx
        });

        if(matrix[rowIdx][colIdx][0] === undefined){
            setSelectedValue('none');
            return;
        }
        setSelectedValue(matrix[rowIdx][colIdx][0]);
    
    }

    const handleChange=(e)=> {
        if(SelectedMatrix.row === null){
            return;
        }

        let temp = matrix;
        setSelectedValue(e.target.value);

        if(e.target.value === "none"){
            temp[SelectedMatrix.row][SelectedMatrix.col] = "";
            setMatrix(temp);
            // console.log()
            return;
        }
        temp[SelectedMatrix.row][SelectedMatrix.col] = e.target.value+(Number(NoOfElement(matrix, e.target.value))+1);
        setMatrix(temp);
    }

    const getBestHouse=()=>{
        let res = BestHouseForRent(matrix);
        console.log(res);
        if(res === undefined){
            setBestHouse('sorry house not available');
            return;
        }
        setBestHouse(matrix[res.house[0]][res.house[1]]);
    }

    useEffect(() => {
        if(size === 'def'){
            return;
        }
        let params = size.split('-');
        let row = Number(params[0]);
        let col = Number(params[1]);
        console.log(row+" "+col);
        let mat = [];
        for(let i=0; i<row; i++){
            let temprow = [];
            for(let j=0; j<col; j++){
                temprow.push("");
            }
            mat.push(temprow);
        }
        setMatrix(mat);
    }, [size])
    
    return (
        <>
        <StyledDiv>
            {matrix.map((row, rowIdx) => (
                <Row
                    key={rowIdx}
                    row={row}
                    rowIdx={rowIdx}
                    setValueInCell={setValueInCell}
                />
            ))}
        </StyledDiv>
        <StyledBottonDiv>
            <section>
                {SelectedMatrix.row === null ? <h4>Not any cell Selected</h4>: ''}
                <label htmlFor="">{SelectedMatrix.row === null? 'Select any cell to change its value ': `Change value of Matrix: row:${SelectedMatrix.row+1} col:${SelectedMatrix.col+1} `}</label>
                <StyledSelect value={selectedValue} onChange={handleChange}>
                    <option value="none">None</option>
                    <option value="h">House</option>
                    <option value="r">Restaurant</option>
                    <option value="p">Parking</option>
                    <option value="t">Tea</option>
                    <option value="g">Gym</option>
                </StyledSelect>
            </section>
            <Button onClick={getBestHouse}>Get Best House</Button>
            {BestHouse && <div>
                <h3>Best House for rent: {BestHouse.length > 5 ? BestHouse: `${getSymbolName(BestHouse[0])} ${BestHouse[1]}`}</h3>
            </div>}
        </StyledBottonDiv>
        </>
    )
}

export default Main


function NoOfElement(matrix, element){
    let count = 0;
    for(let i=0; i<matrix.length; i++){
        for(let j=0; j<matrix[0].length; j++){
            if(matrix[i][j][0] === element[0] && matrix[i][j] !== ""){
                count++;
            }
        }
    }
    return count;
}

function BestHouseForRent(mat){
    let listOfHouse = [];
    for(let i=0; i<mat.length; i++){
        for(let j=0; j<mat[0].length; j++){
            if(mat[i][j][0] === 'h'){
                // console.log(mat[i][j]);
                let currHouse = {key: [i, j], minRDis: Number.MAX_VALUE, minMDis: Number.MAX_VALUE, minPDis: Number.MAX_VALUE, minTDis: Number.MAX_VALUE, minGDis: Number.MAX_VALUE};
                listOfHouse.push(currHouse);
            }
        }
    }
    if(listOfHouse.length === 0){
        return undefined;
    }

    
    for(let k=0; k<listOfHouse.length; k++){
        for(let i=0; i<mat.length; i++){
            for(let j=0; j<mat[0].length; j++){
                if(mat[i][j] !== "" && mat[i][j][0] !== 'h'){
                    let otherKey = checkWhatis(mat[i][j]);
                    let value = getDis([i, j], listOfHouse[k].key);
                    let currMinDis = Math.min(value, listOfHouse[k][otherKey]);
                    listOfHouse[k][otherKey] = currMinDis;
                }
            }
        }
    }


    let BestHouse = {house: [], cost: Number.MAX_VALUE};
    for(let i=0; i<listOfHouse.length; i++){
        let currBestHouse = 0;
        for(var keyData in listOfHouse[i]){
            if(keyData !== 'key'){
                if(listOfHouse[i][keyData] !== Number.MAX_VALUE){
                    currBestHouse += listOfHouse[i][keyData];
                }
            }
        }
        if(currBestHouse < BestHouse.cost){
            BestHouse.cost = currBestHouse;
            BestHouse.house = listOfHouse[i].key;
        }
    }
    return BestHouse;
}

function checkWhatis(unknown){
    if(unknown[0] === 'r') return 'minRDis';
    if(unknown[0] === 'm') return 'minMDis';
    if(unknown[0] === 'p') return 'minPDis';
    if(unknown[0] === 't') return 'minTDis';
    if(unknown[0] === 'g') return 'minGDis';
}

function getDis(pointA, pointB){
    let res = Math.pow(Math.abs(pointB[1] - pointA[1]), 2)+Math.pow(Math.abs(pointB[0] - pointA[0]), 2);
    return Math.sqrt(res);
}


function getSymbolName(text){
    if(text === 'h'){
        return 'House';
    }
    else if(text === 'r'){
        return 'Restaurant';
    }
    else if(text === 'm'){
        return 'Market';
    }
    else if(text === 'p'){
        return 'Parking';
    }
    else if(text === 't'){
        return 'Tea';
    }
    else if(text === 'g'){
        return 'Gym';
    }
}