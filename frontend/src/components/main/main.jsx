import mainStyles from "./main.module.css";
import { useState, useRef, useEffect } from "react"
import { GameMenu } from "./game-menu";
import { Game } from "./Game"
import { Routes, Route, useNavigate } from 'react-router-dom'

export function Main() {

    const navigate = useNavigate ()

    const [needToNavigate, setNeedToNavigate] = useState(true)
    const [cells, setCells] = useState(Array(100).fill(0))

    const socket = useRef()
    const insertIntoQueue = () => {
        setNeedToNavigate(false)
        socket.current = new WebSocket('ws://localhost:5000')
        setCells(prefCells => prefCells.map(c => c === 4 ? 0 : c))
    }

    return (
        <main className={mainStyles.main}>

            <Routes>
                <Route path="/" element={<GameMenu cells={cells} insertIntoQueue = {insertIntoQueue} setCells = {setCells} />}/>
                <Route path="/game" element={
                    <Game 
                cells = {cells}
                setCells = {setCells}
                socket = {socket}
                navigate = {navigate}
                needToNavigate = {needToNavigate}/>
                }/>
            </Routes>

        </main>
    )
}