import mainStyles from "./main.module.css";
import { Ship } from "./Ship";
import { Link } from 'react-router-dom'
import { useState } from "react";
import { SetupField } from "./SetupField";


export function GameMenu({ cells, insertIntoQueue }) {
    let [shipsLayout, setShipsLayout] = useState(Array(10).fill(null).map((e, index) => ({shipNumber: index+1, isOnField:false})))
    return (
        <div className={mainStyles.gameMenu}>
            <SetupField cells={cells} shipsLayout={shipsLayout} setShipsLayout={setShipsLayout}></SetupField>
            <GameSetupPanel insertIntoQueue ={insertIntoQueue} shipsLayout={shipsLayout} setShipsLayout={setShipsLayout}/>
        </div>
    );
}

function GameSetupPanel({insertIntoQueue, shipsLayout, setShipsLayout}) {
    return (
        <div className={mainStyles.gameSetupPanel}>
            <div className={mainStyles.setupPanelHeading}>Расставьте свои судна</div>
            <div className={mainStyles.shipsContainer}>
                {/* {console.log(shipsLayout.filter(e => e.isOnField===false))} */}
                {shipsLayout.filter(e => e.isOnField===false).map((e) => (
                    <Ship key={e.shipNumber} shipNumber={e.shipNumber} isOnField={e.isOnField} id={mainStyles['ship'+(e.shipNumber)]}></Ship>
                ))}
            </div>
            <Link to = '/game'>
                <button className={mainStyles.btn} onClick={insertIntoQueue}>Найти игру</button>
            </Link>
        </div>
    );
}