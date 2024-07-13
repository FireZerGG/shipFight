import { useEffect, useRef } from "react"
import { GameField } from "./game-field"

export function Game ()  {

    const socket = useRef()

    useEffect(() => {
        socket.current = new WebSocket('ws://localhost:5000')

        socket.current.onopen = () => {

        }

        socket.current.onmessage = () => {

        }

    }, [])

  return (
    <div >
        <GameField />
        <GameField />
    </div>
  )
}
