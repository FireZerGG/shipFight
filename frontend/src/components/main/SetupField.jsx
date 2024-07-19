import mainStyles from "./main.module.css"
import { useRef } from "react";
import { Ship } from "./Ship";

export function SetupField({ cells, refreshOccupiedCells, shipsLayout, setShipsLayout }) {
    let fieldRef = useRef(null);

    const dragOverHandler = (ev) => {
        ev.preventDefault();
    }

    const dropHandler = (ev) => {
        ev.preventDefault();
        const data = ev.dataTransfer.getData('text/plain').split(',');
        const rect = fieldRef.current.getBoundingClientRect();
        const shipPointX = ev.clientX - rect.left - parseFloat(data[0]) + 20;
        const shipPointY = ev.clientY - rect.top - parseFloat(data[1]) + 20;
        const shipPointXCell = Math.floor(shipPointX / 45);
        const shipPointYCell = Math.floor(shipPointY / 45);
        shipMoveAttemptHandler(data[2], [shipPointXCell, shipPointYCell]);
    }

    const shipMoveAttemptHandler = (shipNumber, start, rotation = 'ver') => {
        if (start[0] < 0 || start[1] < 0) return;
        let size = 0;
        if (shipNumber <= 1) {
            size = 4;
        }
        else if (shipNumber <= 3) {
            size = 3;
        }
        else if (shipNumber <= 6) {
            size = 2;
        }
        else if (shipNumber <= 10) {
            size = 1;
        }
        if (rotation === 'ver' && start[1] + size > 10) return;
        else if (rotation === 'hor' && start[0] + size > 10) return;
        else if (areCellsVacant(size, start, rotation)) {
            shipMoveHandler(shipNumber, size, start, rotation);
        }
    }

    const shipMoveHandler = (shipNumber, size, start, rotation) => {
        let newShipsLayout = shipsLayout.filter(e => e.shipNumber !== parseInt(shipNumber));
        const newShip = {
            shipNumber: parseInt(shipNumber),
            isOnField: true,
            size: size,
            startX: start[0],
            startY: start[1],
            rotation: rotation
        }
        newShipsLayout = [...newShipsLayout, newShip];
        setShipsLayout(newShipsLayout);
        refreshOccupiedCells(newShipsLayout);
    }

    const areCellsVacant = (size, start, rotation) => {
        if (rotation === 'ver') {
            for (let i = 0; i < size; i++) {
                if (cells[10 * (start[1] + i) + start[0]] === 1 || cells[10 * (start[1] + i) + start[0]] === 4) return false;
            }
            return true;
        }
        else {
            for (let i = 0; i < size; i++) {
                if (cells[10 * start[1] + start[0] + i] === 1 || cells[10 * start[1] + start[0] + i] === 4) return false;
            }
            return true;
        }
    }


    return (
        <div
            ref={fieldRef}
            className={mainStyles.gameField}
            onDragOver={(ev) => dragOverHandler(ev)}
            onDrop={(ev) => dropHandler(ev)}
        >
            {cells.map((e, index) => (
                <GameCell
                    key={index}
                    e={e}
                ></GameCell>
            ))}
            {shipsLayout.filter(e => e.isOnField).map((ship, index) => (
                <Ship
                    key={index}
                    isOnField={ship.isOnField}
                    shipNumber={ship.shipNumber}
                    size={ship.size}
                    startX={ship.startX}
                    startY={ship.startY}
                    rotation={'ver'}
                    shipsLayout={shipsLayout}
                    refreshOccupiedCells={refreshOccupiedCells}
                />
            ))}
        </div>
    )
}

function GameCell({ e }) {
    return (
        <button className={mainStyles.cell}>{e}</button>
    )
}