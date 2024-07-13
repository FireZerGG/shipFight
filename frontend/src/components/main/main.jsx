import mainStyles from "./main.module.css";
import { GameMenu } from "./game-menu";
import { Game } from "./Game"

export function Main() {
    return (
        <main className={mainStyles.main}>
            <Game />
        </main>
    );
}