import mainStyles from "./main.module.css";
import { useState, useRef, useEffect } from "react"
import { GameMenu } from "./game-menu";
import { Game } from "./Game"
import { Routes, Route, useNavigate } from 'react-router-dom'

export function Main() {

    const navigate = useNavigate ()

    
    const [isInQueue, setIsInQueue] = useState(false)
    const [cells, setCells] = useState(Array(100).fill(0))
    const [opponentCells, setOpponentCells] = useState('')
    const [opponentMove, setOpponentMove] = useState(-1)
    const [currentMove, setCurrentMove] = useState('')
    const [modalText, setModalText] = useState('')
    const [needToNavigate, setNeedToNavigate] = useState(true)

    const delayedNav = () => {
        setTimeout(() => {
            navigate('/')
        }, 2000);
    }

    const socket = useRef()
    const insertIntoQueue = () => {
        setNeedToNavigate(false)
        socket.current = new WebSocket('ws://localhost:5000')

        setCells(prefCells => prefCells.map(c => c === 4 ? 0 : c))

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
                socket.current.close()
                setModalText('Противник вышел из игры. \n Возвращение в меню...')
                delayedNav()
            }
        }

        socket.current.onclose = () => {
            setCells(Array(100).fill(0))
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
        setModalText('Вы вышли из игры. \n Возвращение в меню...')
        delayedNav()
    }

    return (
        <main className={mainStyles.main}>

            <Routes>
                <Route path="/" element={<GameMenu cells={cells} insertIntoQueue = {insertIntoQueue} setCells = {setCells} />}/>
                <Route path="/game" element={
                    <Game 
                cells = {cells}
                currentMove = {currentMove}
                setCells = {setCells}
                isInQueue = {isInQueue}
                opponentCells = {opponentCells}
                setOpponentCells = {setOpponentCells}
                sendMove = {sendMove}
                leaveGame = {leaveGame}
                modalText = {modalText}
                setModalText = {setModalText}
                opponentMove = {opponentMove}
                navigate = {navigate}
                needToNavigate = {needToNavigate}
                socket = {socket}
                delayedNav = {delayedNav}/>
                }/>
            </Routes>

        </main>
    )
}