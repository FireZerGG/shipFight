import { useRef } from "react";
import s from "./main.module.css"

export function Ship({ id = null, size = null, startX = null, startY = null, rotation = null }) {
    const shipRef = useRef(null);

    const dragStartHandler = (ev, ship) => {
        const rect = ev.target.getBoundingClientRect();
        const offsetX = ev.clientX - rect.left;
        const offsetY = ev.clientY - rect.top;
        ev.dataTransfer.setData('text/plain', [offsetX, offsetY, ship.id])
    }

    if (!startX && startX !== 0) {
        return (
            <div
                ref={shipRef}
                draggable={true}
                className={s.ship}
                id={id}
                onDragStart={(ev) => dragStartHandler(ev, shipRef.current)}
            >
            </div>
        );
    }
    else if (rotation === 'ver') {
        return (
            <div
                ref={shipRef}
                draggable={true}
                className={s.ship}
                style={{position: "absolute", top: startY*45, left: startX*45, height: size*45-10, width: 35}}
                onDragStart={(ev) => dragStartHandler(ev, shipRef.current)}
            >
            </div>
        );
    }
    else if (rotation === 'hor') {
        return (
            <div
                ref={shipRef}
                draggable={true}
                className={s.ship}
                style={{position: "absolute", top: startY*45, left: startX*45, height: 35, width: size*45-10}}
                onDragStart={(ev) => dragStartHandler(ev, shipRef.current)}
            >
            </div>
        );
    }
}