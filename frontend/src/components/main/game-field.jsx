import { useState } from "react"
import mainStyles from "./main.module.css"

export function GameField({cells, setSells}) {

    // этот useState будет находится в родительском компоненте, setSells будет прокидываться сюда
    let canAttack = true

    const attack = (index) => {
        if (!canAttack) return
        if (cells[index] === 2 || cells[index] === 3) {
            return
        } else if (cells[index] === 0) {
            setSells(prefCells => prefCells.map((num, i) => i === index ? 3 : num))
        } else if (cells[index] === 1) {
            setSells(prefCells => prefCells.map((num, i) => i === index ? 2 : num))
        }
    }

    return (
        <div className={mainStyles.gameField}>
            {cells.map((e, index) => (
                <GameCell
                    key={index}
                    e = {e}
                    onClick = {() => attack(index)}
                ></GameCell>
            ))}
        </div>
    )
}

function GameCell({ onClick, e }) {
    return(
        <button onClick={onClick} className={mainStyles.cell}>{e}</button>
    )
}