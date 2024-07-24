import s from './Game.module.css'
import { GameField } from "./game-field"
import ModalWindow from './ModalWindow'
import { useEffect, useState } from 'react'

export function Game ({cells, setCells, socket, navigate, needToNavigate}) {

  const [isInQueue, setIsInQueue] = useState(false)
  const [opponentCells, setOpponentCells] = useState("")
  const [opponentMove, setOpponentMove] = useState(-1)
  const [currentMove, setCurrentMove] = useState("")
  const [modalText, setModalText] = useState("")

  useEffect(() => {
    if (modalText !== "") {
      setTimeout(() => {
        setModalText("")
      }, 2000);
    }
  }, [modalText])

  useEffect(() => {
    if (needToNavigate) {
      navigate("/")
    }
  }, [])
  if (needToNavigate) {
    return
  }

  const sendMove = (move) => {
    if (cells[move] !== 1 && cells[move] !== 2) {
      setCurrentMove("second")
    }
    socket.current.send(
      JSON.stringify({
        event: "move",
        move: move,
      })
    )
  }

  const leaveGame = () => {
    setModalText("Вы вышли из игры. \n Возвращение в меню...")
    delayedNav()
  }

  const delayedNav = () => {
    setTimeout(() => {
      socket.current.close()
      navigate("/")
    }, 2000)
  }

  socket.current.onopen = () => {
    setIsInQueue(true)
    const move = Math.random() < 0.5 ? "first" : "second"
    socket.current.send(JSON.stringify({
      event: "queue",
      field: cells,
      move: move,
    }))
  }

  socket.current.onmessage = (event) => {
    if (typeof JSON.parse(event.data) === "object") {
      setCurrentMove(JSON.parse(event.data).move)
      setOpponentCells(JSON.parse(event.data).field)
      setIsInQueue(false)
    } else if (typeof JSON.parse(event.data) === "number") {
      setOpponentMove(JSON.parse(event.data))
      if (opponentCells[JSON.parse(event.data)] !== 1 && opponentCells[JSON.parse(event.data)] !== 2) {
        setTimeout(() => {
          setCurrentMove("first")
        }, 550);
      }
    } else if (typeof JSON.parse(event.data) === "string") {
      setModalText("Противник вышел из игры. \n Возвращение в меню...")
      delayedNav()
    }
  }

  socket.current.onclose = () => {
    setCells(Array(100).fill(0))
    console.log("сокет закрыт")
  }
  socket.current.onerror = () => {
    console.log("ошибка сокета")
  }

  return (
    <div className={s.container}>


        <GameField 
          isOpponentField = {false} 
          cells = {cells}
          opponentMove = {opponentMove}
          setCells = {setCells}
          setModalText = {setModalText}
          delayedNav = {delayedNav}
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
                setCells = {setOpponentCells}
                setModalText = {setModalText}
                delayedNav = {delayedNav}
              /> 
              </>
        }
        <ModalWindow modalText = {modalText} />
    </div>
  )
}