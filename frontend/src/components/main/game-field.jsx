import mainStyles from "./main.module.css"
import { useRef } from "react";

export function GameField({ cells, setSells }) {

    let fieldRef = useRef(null);

    // этот useState будет находится в родительском компоненте, setSells будет прокидываться сюда
    let canAttack = true

    // const attack = (index) => {
    //     if (!canAttack) return
    //     if (cells[index] === 2 || cells[index] === 3) {
    //         return
    //     } else if (cells[index] === 0) {
    //         setSells(prefCells => prefCells.map((num, i) => i === index ? 3 : num))
    //     } else if (cells[index] === 1) {
    //         setSells(prefCells => prefCells.map((num, i) => i === index ? 2 : num))
    //     }
    // }

    const dragOverHandler = (ev) => {
        ev.preventDefault();
    }

    const dropHandler = (ev) => {
        ev.preventDefault();
        const data = ev.dataTransfer.getData('text/plain').split(',');
        const rect = fieldRef.current.getBoundingClientRect();
        const shipPointX =  ev.clientX - rect.left - parseFloat(data[0]) + 20;
        const shipPointY = ev.clientY - rect.top - parseFloat(data[1]) + 20;
        console.log(Math.floor(shipPointX / 45), Math.floor(shipPointY / 45));
    }

    return (
        <div
            ref={fieldRef}
            className={mainStyles.gameField}
            onDragOver={(ev) => dragOverHandler(ev)}
            onDrop = {(ev) => dropHandler(ev)}
        >
            {cells.map((e, index) => (
                <GameCell
                    key={index}
                    e={e}
                    // onClick={() => attack(index)}
                ></GameCell>
            ))}
        </div>
    )
}

function GameCell({ onClick, e }) {
    return (
        <button onClick={onClick} className={mainStyles.cell}>{e}</button>
    )
}