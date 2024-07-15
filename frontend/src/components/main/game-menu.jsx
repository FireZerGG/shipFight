import mainStyles from "./main.module.css";
import { GameField } from "./game-field";
import { Ship } from "./Ship";
import { Link } from 'react-router-dom'

export function GameMenu({ cells, insertIntoQueue }) {
    return (
        <div className={mainStyles.gameMenu}>
            <GameField cells={cells}></GameField>
            <GameSetupPanel insertIntoQueue ={insertIntoQueue}/>
        </div>
    );
}

function GameSetupPanel({insertIntoQueue}) {
    return (
        <div className={mainStyles.gameSetupPanel}>
            <div className={mainStyles.setupPanelHeading}>Расставьте свои судна</div>
            <div className={mainStyles.shipsContainer}>
                {Array(10).fill(null).map((e, index) => (
                    <Ship key={index} id={mainStyles['ship'+(index+1)]}></Ship>
                ))}
            </div>
            <Link to = '/game'>
                <button className={mainStyles.btn} onClick={insertIntoQueue}>Найти игру</button>
            </Link>
        </div>
    );
}