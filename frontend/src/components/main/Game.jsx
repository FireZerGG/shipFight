import { GameField } from "./game-field"

export function Game ({cells, setSells, isInQueue, opponentCells, setOpponentCells, sendMove})  {

  return (
    <div >
        {isInQueue 
        ? <h2>Ожидаем второго игрока</h2>
        :<>
          <GameField 
            canAttack = {true}
            sendMove = {sendMove}
            cells = {cells}
            setSells = {setSells}
          />
          {opponentCells === '' 
            ? <></>
            : <GameField 
              canAttack = {false}
              cells = {opponentCells}
              setSells = {setOpponentCells}
            /> 
          }
        </>}
    </div>
  )
}