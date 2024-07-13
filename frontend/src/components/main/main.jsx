import mainStyles from "./main.module.css";
import { GameMenu } from "./game-menu";

export function Main() {
    return (
        <main className={mainStyles.main}>
            <GameMenu />
        </main>
    );
}