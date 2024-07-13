import mainStyles from "./main.module.css";
import { useState, useRef } from "react"
import { GameMenu } from "./game-menu";
import { Game } from "./Game"

export function Main() {

    const [isInQueue, setIsInQueue] = useState(false)
    const [cells, setSells] = useState(Array(100).fill(0))
    const [opponentCells, setOpponentCells] = useState('')
    const [opponentMove, setOpponentMove] = useState(-1)

    const socket = useRef()
    const insertIntoQueue = () => {
        socket.current = new WebSocket('ws://localhost:5000')

        socket.current.onopen = () => {
            setIsInQueue(true)
            const message = {
                event: 'queue',
                field: cells
            }

            socket.current.send(JSON.stringify(message))
        }

        socket.current.onmessage = (event) => {
            if (typeof(JSON.parse(event.data)) !== 'number') {
                setIsInQueue(false)
                setOpponentCells(JSON.parse(event.data))
            } else {
                setOpponentMove(JSON.parse(event.data))
            }
        }

        socket.current.onclose = () => {
          console.log('сокет закрыт')
        }
        socket.current.onerror = () => {
          console.log('ошибка сокета')
        }
    }

    const sendMove = (move) => {
        socket.current.send(JSON.stringify({
            event: 'move',
            move: move
        }))
    }

    const opponentMoveHandler = () => {

    }

    return (
        <main className={mainStyles.main}>
            <Game 
                cells = {cells}
                setSells = {setSells}
                isInQueue = {isInQueue}
                opponentCells = {opponentCells}
                setOpponentCells = {setOpponentCells}
                sendMove = {sendMove}
                opponentMove = {opponentMove}

            />
            <button onClick={insertIntoQueue}>a</button>
        </main>
    )
}