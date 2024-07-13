import mainStyles from "./main.module.css";
import { GameField } from "./game-field";
import { Ship } from "./Ship";

export function GameMenu({ cells }) {
    return (
        <div className={mainStyles.gameMenu}>
            <GameField cells={cells}></GameField>
            <GameSetupPanel />
        </div>
    );
}

function GameSetupPanel() {
    return (
        <div className={mainStyles.gameSetupPanel}>
            <div className={mainStyles.setupPanelHeading}>Расставьте свои судна</div>
            <div className={mainStyles.shipsContainer}>
                {Array(10).fill(null).map((e, index) => (
                    <Ship key={index} id={mainStyles['ship'+(index+1)]}></Ship>
                ))}
            </div>
            <button className={mainStyles.btn}>Найти игру</button>
        </div>
    );
}