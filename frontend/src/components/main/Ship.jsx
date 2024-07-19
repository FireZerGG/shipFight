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
        }
    }

    const dragEndHandler = () => {
        if (isOnField) refreshOccupiedCells(shipsLayout);
    }

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