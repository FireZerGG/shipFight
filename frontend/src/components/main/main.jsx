import mainStyles from "./main.module.css";
import { useState, useRef } from "react"
import { GameMenu } from "./game-menu";
import { Game } from "./Game"
import { Routes, Route, useNavigate } from 'react-router-dom'

export function Main() {

    const navigate = useNavigate ();

    const [isInQueue, setIsInQueue] = useState(false)
    const [cells, setSells] = useState(Array(100).fill(0))
    const [opponentCells, setOpponentCells] = useState('')
    const [opponentMove, setOpponentMove] = useState(-1)
    const [currentMove, setCurrentMove] = useState('')

    const socket = useRef()
    const insertIntoQueue = () => {
        socket.current = new WebSocket('ws://localhost:5000')

        socket.current.onopen = () => {
            setIsInQueue(true)
            setCurrentMove(Math.random() < 0.5 ? 'first' : 'second')
            const message = {
                event: 'queue',
                field: cells,
                move: currentMove
            }

            socket.current.send(JSON.stringify(message))
        }

        socket.current.onmessage = (event) => {
            if (typeof(JSON.parse(event.data)) === 'object') {
                setCurrentMove(JSON.parse(event.data).move)
                setOpponentCells(JSON.parse(event.data).field)
                setIsInQueue(false)
            } else if (typeof(JSON.parse(event.data)) === 'number'){
                setOpponentMove(JSON.parse(event.data))
                setCurrentMove('first')
            } else if (typeof(JSON.parse(event.data)) === 'string') {
                console.log('оппонент вышел, надо бы дописать сюда нормальной логики')
                socket.current.close()
                navigate('/')
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
        setCurrentMove('second')
        socket.current.send(JSON.stringify({
            event: 'move',
            move: move
        }))
    }

    const leaveGame = () => {
        socket.current.close()
        navigate('/')
    }

    return (
        <main className={mainStyles.main}>

            <Routes>
                <Route path="/" element={<GameMenu cells={cells} insertIntoQueue = {insertIntoQueue}/>}/>
                <Route path="/game" element={
                    <Game 
                cells = {cells}
                currentMove = {currentMove}
                setSells = {setSells}
                isInQueue = {isInQueue}
                opponentCells = {opponentCells}
                setOpponentCells = {setOpponentCells}
                sendMove = {sendMove}
                leaveGame = {leaveGame}
                opponentMove = {opponentMove}/>
                }/>
            </Routes>

        </main>
    )
}