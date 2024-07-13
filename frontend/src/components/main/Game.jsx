import { GameField } from "./game-field"

export function Game ({cells, setSells, isInQueue})  {

  return (
    <div >
        {isInQueue 
        ? <h2>Ожидаем второго игрока</h2>
        :<GameField 
          cells = {cells}
          setSells = {setSells}
        />}
    </div>
  )
}