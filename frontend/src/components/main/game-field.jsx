import mainStyles from "./main.module.css"

export function GameField() {
    let cells = new Array(100).fill(0);
    const handleCellClick = (index) => {
        console.log(index)
    }
    return (
        <div className={mainStyles.gameField}>
            {cells.map((e, index) => (
                <GameCell
                    key={index}
                    onClick = {() => {
                        handleCellClick(index);
                    }}
                ></GameCell>
            ))}
        </div>
    );
}

function GameCell({ onClick }) {
    return(
        <button onClick={onClick} className={mainStyles.cell}></button>
    );
}