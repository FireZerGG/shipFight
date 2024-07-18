import mainStyles from "./main.module.css"
import { useRef, useState, useEffect } from "react";
import { Ship } from "./Ship";
import { navigate } from "react-router-dom";

export function GameField({ cells, setCells, sendMove, canAttack, isOpponentField, opponentMove, setModalText, delayedNav }) {

    let fieldRef = useRef(null);

    let [shipsLayout, setShipsLayout] = useState([])

    const attack = (index) => {
        if (!isOpponentField) return
        if (!canAttack) return

        let newCells

        if (cells[index] === 2 || cells[index] === 3) {
            return
        } else if (cells[index] === 0) {
            newCells = cells.map((num, i) => i === index ? 3 : num)
            setCells(newCells)
        } else {
            newCells = cells.map((num, i) => i === index ? 2 : num)
            setCells(newCells)
        }
        if (isOpponentField) {
            sendMove(index)
        }

        if (newCells.filter(c => c === 2).length === 20) {
            setModalText('Вы победили! \n Возвращение в меню...')
            delayedNav()
        }

    }

    useEffect(() => {
        if (!isOpponentField) {
            if (opponentMove !== -1) {

                let newCells

                if (cells[opponentMove] === 0) {
                    newCells = cells.map((num, i) => i === opponentMove ? 3 : num)
                    setCells(newCells)
                } else {
                    newCells = cells.map((num, i) => i === opponentMove ? 2 : num)
                    setCells(newCells)
                }
                if (newCells.filter(c => c === 2).length === 20) {
                    setModalText('Вы проиграли :(  \n Возвращение в меню...')
                    delayedNav()
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