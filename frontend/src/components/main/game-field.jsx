import mainStyles from "./main.module.css"
import { useRef, useState, useEffect } from "react";
import { Ship } from "./Ship";

export function GameField({ cells, setSells, sendMove, canAttack, isOpponentField, opponentMove }) {

    let fieldRef = useRef(null);

    let [shipsLayout, setShipsLayout] = useState([])

    const attack = (index) => {
        if (canAttack) return
        if (cells[index] === 2 || cells[index] === 3) {
            return
        } else if (cells[index] === 0) {
            setSells(prefCells => prefCells.map((num, i) => i === index ? 3 : num))
        } else if (cells[index] === 1) {
            setSells(prefCells => prefCells.map((num, i) => i === index ? 2 : num))
        }
        if (isOpponentField) {
            sendMove(index)
        }
    }

    useEffect(() => {
        if (!isOpponentField) {
            if (opponentMove !== -1) {
                if (cells[opponentMove] === 2 || cells[opponentMove] === 3) {
                    return
                } else if (cells[opponentMove] === 0) {
                    setSells(prefCells => prefCells.map((num, i) => i === opponentMove ? 3 : num))
                } else if (cells[opponentMove] === 1) {
                    setSells(prefCells => prefCells.map((num, i) => i === opponentMove ? 2 : num))
                }
            }
        }
    }, [opponentMove])

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
        shipMoveAttemptHandler(data[2], [shipPointXCell, shipPointYCell], 'hor')
    }

    const shipMoveAttemptHandler = (id, start, rotation = 'ver') => {
        if (start[0] < 0 || start[1] < 0) return;
        let size = 0;
        let shipNumber = parseInt(id.split('_')[1].slice(4));
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
        console.log(size);
        if (rotation === 'ver' && start[1] + size > 10) return;
        else if (rotation === 'hor' && start[0] + size > 10) return;
        else shipMoveHandler(size, start, rotation);
    }

    const shipMoveHandler = (size, start, rotation) => {
        const newShip = {
            size: size,
            startX: start[0],
            startY: start[1],
            rotation: rotation
        }
        setShipsLayout([...shipsLayout, newShip]);
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
                    onClick={() => attack(index)}
                ></GameCell>
            ))}
            {shipsLayout.map((ship, index) => (
                <Ship
                    key={index}
                    size={ship.size}
                    startX={ship.startX}
                    startY={ship.startY}
                    rotation={'ver'}></Ship>
            ))}
        </div>
    )
}

function GameCell({ onClick, e }) {
    return (
        <button onClick={onClick} className={mainStyles.cell}>{e}</button>
    )
}