import mainStyles from "./main.module.css";
import { useState, useRef } from "react"
import { GameMenu } from "./game-menu";
import { Game } from "./Game"

export function Main() {

    const [cells, setSells] = useState(Array(100).fill(0))
    const [isInQueue, setIsInQueue] = useState(false)

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
            console.log(JSON.parse(event.data))
            if (typeof(JSON.parse(event.data)) == 'string') {
                console.log(1)
            } else {
                console.log(2)
            }
        }

        socket.current.onclose = () => {
          console.log('сокет закрыт')
        }
        socket.current.onerror = () => {
          console.log('ошибка сокета')
        }
    }

    return (
        <main className={mainStyles.main}>
            <Game 
                cells = {cells}
                setSells = {setSells}
                isInQueue = {isInQueue}
            />
            <button onClick={insertIntoQueue}>a</button>
        </main>
    );
}