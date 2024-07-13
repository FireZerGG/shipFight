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
        </div>
    );
}