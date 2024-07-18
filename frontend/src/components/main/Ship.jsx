import s from "./main.module.css"

export function Ship({ id, shipNumber, isOnField, size, startX, startY, rotation, shipsLayout, refreshOccupiedCells}) {

    const dragStartHandler = (ev) => {
        const rect = ev.target.getBoundingClientRect();
        const offsetX = ev.clientX - rect.left;
        const offsetY = ev.clientY - rect.top;
        ev.dataTransfer.setData('text/plain', [offsetX, offsetY, shipNumber])
        if (isOnField){
            let newShipsLayout = shipsLayout.filter(ship => ship.shipNumber !== shipNumber);
            refreshOccupiedCells(newShipsLayout);
            //deOccupyCells(size, startX, startY, rotation)
        }
    }

    const dragEndHandler = () => {
        refreshOccupiedCells(shipsLayout);
    }

    // const deOccupyCells = (size, startX, startY, rotation) => {
    //     const newCells = cells;
    //     if (rotation === 'ver') {
    //         for (let i = 0; i < size; i++) {
    //             newCells[10 * (startY + i) + startX] = 0;
    //         }
    //     }
    //     else {
    //         for (let i = 0; i < size; i++) {
    //             newCells[10 * startY + startX + i] = 0;
    //         }
    //     }
    //     refreshBufferCells(newCells);
    // }

    // const refreshBufferCells = (newCells) => {
    //     newCells = newCells.map((e) => e === 4 ? 0 : e);
    //     for (let i in newCells) {
    //         if (newCells[i] === 1) {
    //             if (newCells?.[i - 10] === 0) newCells[i - 10] = 4;
    //             if (newCells?.[parseInt(i) + 10] === 0) newCells[parseInt(i) + 10] = 4;
    //             if (Math.floor(i / 10) !== 9 && newCells?.[parseInt(i) + 1] === 0) newCells[parseInt(i) + 1] = 4;
    //             if (Math.floor(i / 10) !== 0 && newCells?.[i - 1] === 0) newCells[i - 1] = 4;
    //         }
    //     }
    //     setCells(newCells);
    // }

    if (!isOnField) {
        return (
            <div
                draggable={true}
                className={s.ship}
                id={id}
                onDragStart={(ev) => dragStartHandler(ev)}
                onDragEnd={(ev) => dragEndHandler(ev)}
            >
            </div>
        );
    }
    else if (rotation === 'ver') {
        return (
            <div
                draggable={true}
                className={s.ship}
                style={{position: "absolute", top: startY*45, left: startX*45, height: size*45-10, width: 35}}
                onDragStart={(ev) => dragStartHandler(ev)}
                onDragEnd={(ev) => dragEndHandler(ev)}
            >
            </div>
        );
    }
    else if (rotation === 'hor') {
        return (
            <div
                draggable={true}
                className={s.ship}
                style={{position: "absolute", top: startY*45, left: startX*45, height: 35, width: size*45-10}}
                onDragStart={(ev) => dragStartHandler(ev)}
                onDragEnd={(ev) => dragEndHandler(ev)}
            >
            </div>
        );
    }
}