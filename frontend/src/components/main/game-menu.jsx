import mainStyles from "./main.module.css";
import { Ship } from "./Ship";
import { Link } from 'react-router-dom'
import { useState } from "react";
import { SetupField } from "./SetupField";


export function GameMenu({ cells, setCells, insertIntoQueue }) {
    let [shipsLayout, setShipsLayout] = useState(Array(10).fill(null).map((e, index) => ({ shipNumber: index + 1, isOnField: false })))
    return (
        <div className={mainStyles.gameMenu}>
            <SetupField cells={cells} setCells={setCells} shipsLayout={shipsLayout} setShipsLayout={setShipsLayout}></SetupField>
            <GameSetupPanel cells={cells} setCells={setCells} insertIntoQueue={insertIntoQueue} shipsLayout={shipsLayout} setShipsLayout={setShipsLayout} />
        </div>
    );
}

function GameSetupPanel({ cells, setCells, insertIntoQueue, shipsLayout, setShipsLayout }) {

    const dragOverHandler = (ev) => {
        ev.preventDefault();
    }

    const dropHandler = (ev) => {
        ev.preventDefault();
        const shipNumber = ev.dataTransfer.getData('text/plain').split(',')[2];
        const shipRemoved = shipsLayout.filter(e => e.shipNumber===parseInt(shipNumber))[0];
        if (shipRemoved.isOnField){
            deOccupyCells(shipRemoved.size, shipRemoved.startX, shipRemoved.startY, shipRemoved.rotation);
            let newShipsLayout = shipsLayout.filter(e => e.shipNumber!==parseInt(shipNumber));
            const newShip = {
                shipNumber: parseInt(shipNumber),
                isOnField: false,
                id: mainStyles['ship' + (shipNumber)]
            }
            newShipsLayout = [...newShipsLayout, newShip];
            setShipsLayout(newShipsLayout);
        }
    }

    const deOccupyCells = (size, startX, startY, rotation) => {
        const newCells = cells;
        if (rotation === 'ver'){
            for (let i = 0; i < size; i++){
                newCells[10*(startY+i) + startX] = 0;
            }
        }
        else {
            for (let i = 0; i < size; i++){
                newCells[10*startY + startX+i] = 0; 
            }
        }
        setCells(newCells);
    }

    return (
        <div
            className={mainStyles.gameSetupPanel}
            onDragOver={(ev) => dragOverHandler(ev)}
            onDrop={(ev) => dropHandler(ev)}
        >
            <div className={mainStyles.setupPanelHeading}>Расставьте свои судна</div>
            <div className={mainStyles.shipsContainer}>
                {shipsLayout.filter(e => e.isOnField === false).map((e) => (
                    <Ship key={e.shipNumber} shipNumber={e.shipNumber} isOnField={e.isOnField} id={mainStyles['ship' + (e.shipNumber)]}></Ship>
                ))}
            </div>
            <Link to='/game'>
                <button className={mainStyles.btn} onClick={insertIntoQueue}>Найти игру</button>
            </Link>
        </div>
    );
}