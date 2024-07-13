import { useRef } from "react";
import s from "./main.module.css"

export function Ship({ id }) {
    const shipRef = useRef(null);

    const dragStartHandler = (ev, ship) => {
        console.log('drag', ship.id);
    }

    const dragOverHandler = (ev) => {
        ev.preventDefault();
    } 
    
    const dropHandler = (ev, cell) => {
        ev.preventDefault();
        console.log('drop', cell.id);
    }


    return (
        <div
            ref={shipRef}
            draggable={true}
            className={s.ship}
            id={id}
            onDragStart={(ev) => dragStartHandler(ev, shipRef.current)}
            onDragOver={(ev) => dragOverHandler(ev)}
            onDrop={(ev) => dropHandler(ev, shipRef.current)}
        >
        </div>
    );
}