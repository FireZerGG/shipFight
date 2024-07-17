import { useState } from 'react'
import s from './Game.module.css'
import { GameField } from "./game-field"
import ModalWindow from './ModalWindow'
import { useEffect } from 'react'

export function Game ({cells, setSells, isInQueue, opponentCells, setOpponentCells, 
sendMove, opponentMove, leaveGame, currentMove, modalText, setModalText}) {

  useEffect(() => {
    if (modalText !== '') {
      setTimeout(() => {
        setModalText('')
      }, 2000);
    } 
  },[modalText])

  return (
    <div className={s.container}>

        <ModalWindow modalText = {modalText} />

        <GameField 
          isOpponentField = {false} 
          cells = {cells}
          opponentMove = {opponentMove}
          setSells = {setSells}
        />
        {
          isInQueue 
          ? <h2>Ожидаем второго игрока...</h2>
          : opponentCells === ''
            ? <></>
            : <>
              <div className={s.gameInfo}>
                {currentMove === 'first' ? <h1> ---ход--&gt;</h1> : <h1>&lt;--xод---</h1>}
                <button className={s.exitBtn} onClick={leaveGame}>Выход</button>
              </div>
              <GameField 
                sendMove = {sendMove}
                isOpponentField = {true}
                canAttack = {currentMove === 'first' ? true : false}
                cells = {opponentCells}
                setSells = {setOpponentCells}
              /> 
              </>
        }
    </div>
  )
}