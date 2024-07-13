import mainStyles from "./main.module.css";
import { GameField } from "./game-field";

export function GameMenu() {
    return (
        <div className={mainStyles.gameMenu}>
            <GameField></GameField>
            <GameSetupPanel />
        </div>
    );
}

function GameSetupPanel() {
    return (
        <div className={mainStyles.gameSetupPanel}>
            <div className={mainStyles.setupPanelHeading}>Расставьте свои судна</div>
            <div className={mainStyles.shipsContainer}>
                <div draggable={true} id={mainStyles.size4Ship1} className={mainStyles.ship}></div>
                <div id={mainStyles.size3Ship1} className={mainStyles.ship}></div>
                <div id={mainStyles.size3Ship2} className={mainStyles.ship}></div>
                <div id={mainStyles.size2Ship1} className={mainStyles.ship}></div>
                <div id={mainStyles.size2Ship2} className={mainStyles.ship}></div>
                <div id={mainStyles.size2Ship3} className={mainStyles.ship}></div>
                <div id={mainStyles.size1Ship1} className={mainStyles.ship}></div>
                <div id={mainStyles.size1Ship2} className={mainStyles.ship}></div>
                <div id={mainStyles.size1Ship3} className={mainStyles.ship}></div>
                <div id={mainStyles.size1Ship4} className={mainStyles.ship}></div>
            </div>
            <button className={mainStyles.btn}>Найти игру</button>
        </div>
    );
}