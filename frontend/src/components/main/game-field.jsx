import mainStyles from "./main.module.css"
import { useRef, useState, useEffect } from "react";
import { Ship } from "./Ship";

export function GameField({ cells, setSells, sendMove, canAttack, isOpponentField, opponentMove }) {

    let fieldRef = useRef(null);

    let [shipsLayout, setShipsLayout] = useState([])

    const attack = (index) => {
        if (!isOpponentField) return
        if (!canAttack) return
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


    return (
        <div
            ref={fieldRef}
            className={mainStyles.gameField}
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
                    isOnField={ship.isOnField}
                    shipNumber={ship.shipNumber}
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