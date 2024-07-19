import s from "./main.module.css"
import size1ship from "./svg/size1ship.svg"
import size2ship from "./svg/size2ship.svg"
import size3ship from "./svg/size3ship.svg"
import size4ship from "./svg/size4ship.svg"
import size1shipVert from "./svg/size1shipVert.svg"
import size2shipVert from "./svg/size2shipVert.svg"
import size3shipVert from "./svg/size3shipVert.svg"
import size4shipVert from "./svg/size4shipVert.svg"

export function Ship({ id, shipNumber, isOnField, size, startX, startY, rotation, shipsLayout, refreshOccupiedCells}) {

    const dragStartHandler = (ev) => {
        const rect = ev.target.getBoundingClientRect();
        const offsetX = ev.clientX - rect.left;
        const offsetY = ev.clientY - rect.top;

        const img = new Image();
        img.src = getShipImage(shipNumber);
        ev.dataTransfer.setDragImage(img, offsetX, offsetY);

        ev.dataTransfer.setData('text/plain', [offsetX, offsetY, shipNumber])
        if (isOnField){
            let newShipsLayout = shipsLayout.filter(ship => ship.shipNumber !== shipNumber);
            refreshOccupiedCells(newShipsLayout);
        }
    }

    const dragEndHandler = () => {
        if (isOnField) refreshOccupiedCells(shipsLayout);
    }

    const getShipImage = (shipNumber, isOnField, rotation = null) => {
        if (isOnField && rotation ==='hor'){
            if (shipNumber === 1) return size4ship;
            else if (shipNumber <= 3) return size3ship;
            else if (shipNumber <= 6) return size2ship;
            else return size1ship;
        }
        else if (isOnField && rotation ==='ver'){
            if (shipNumber === 1) return size4shipVert;
            else if (shipNumber <= 3) return size3shipVert;
            else if (shipNumber <= 6) return size2shipVert;
            else return size1shipVert;
        }
        else{
            if (shipNumber === 1) return size4ship;
            else if (shipNumber <= 3) return size3ship;
            else if (shipNumber <= 5) return size2ship;
            else if (shipNumber === 6) return size2shipVert;
            else return size1ship;
        }
    }

    if (!isOnField) {
        return (
            <img
                src={getShipImage(shipNumber, isOnField)}
                draggable={true}
                className={s.ship}
                id={id}
                onDragStart={(ev) => dragStartHandler(ev)}
                onDragEnd={(ev) => dragEndHandler(ev)}
                alt="ship"
            >
            </img>
        );
    }
    else {
        return (
            <img
                src={getShipImage(shipNumber, isOnField, rotation)}
                draggable={true}
                className={s.ship}
                style={{position: "absolute", top: startY*45, left: startX*45}}
                onDragStart={(ev) => dragStartHandler(ev)}
                onDragEnd={(ev) => dragEndHandler(ev)}
                alt="ship"
            >
            </img>
        );
    }
}