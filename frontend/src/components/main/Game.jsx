import { GameField } from "./game-field"

export function Game ({cells, setSells, isInQueue, opponentCells, setOpponentCells, sendMove, opponentMove})  {

  return (
    <div >
        {isInQueue 
        ? <h2>Ожидаем второго игрока</h2>
        :<>
          <GameField 
            isOpponentField = {false} 
            canAttack = {true}
            cells = {cells}
            opponentMove = {opponentMove}
            setSells = {setSells}
          />
          {opponentCells === '' 
            ? <></>
            : <GameField 
              sendMove = {sendMove}
              isOpponentField = {true}
              canAttack = {false}
              cells = {opponentCells}
              setSells = {setOpponentCells}
            /> 
          }
        </>}
    </div>
  )
}