import mainStyles from "./main.module.css"
import { useRef, useState, useEffect } from "react";
import { Ship } from "./Ship";
import { navigate } from "react-router-dom";
import { fullShipDetect, outlineDefeatedShips } from './gameFieldFunctions'
import GameCell from "./GameCell";

export function GameField({ cells, setCells, sendMove, canAttack, isOpponentField, opponentMove, setModalText, delayedNav }) {

    let fieldRef = useRef(null);

    let [shipsLayout, setShipsLayout] = useState([])
    const [activateRocket, setActivateRocket] = useState([-1, false])
    const [activateExplosion, setActivateExplosion] = useState([-1, false])

    const attack = (index) => {
        if (!isOpponentField) return
        if (!canAttack) return

        setActivateRocket([index,true])

        let needToExplode = false

        let newCells
        if (cells[index] === 2 || cells[index] === 3) {
            return
        } else if (cells[index] === 0) {
            newCells = cells.map((num, i) => i === index ? 3 : num)
        } else {
            newCells = cells.map((num, i) => i === index ? 2 : num)
            needToExplode = true
        }
            
        
        const move = () => {
            if (newCells.filter(c => c === 2).length === 20) {
                setModalText('Вы победили! \n Возвращение в меню...')
                delayedNav()
            }
            
            const defeatedShips = fullShipDetect(newCells)
            outlineDefeatedShips(defeatedShips, newCells)
            setCells(newCells)
            sendMove(index)
        }
        
        setTimeout(() => {
            setActivateRocket([index,false])
            if (needToExplode) {
                setActivateExplosion([index, true])
                setTimeout(() => {
                    setActivateExplosion([index, false])
                    move()
                }, 220);
            } else {
                move()
            }
    
        }, 500)
    }

    useEffect(() => {
        if (!isOpponentField) {
            if (opponentMove !== -1) {

                setActivateRocket([opponentMove,true])
                
                let needToExplode = false
                
                let newCells
                if (cells[opponentMove] === 0) {
                    newCells = cells.map((num, i) => i === opponentMove ? 3 : num)
                } else {
                    newCells = cells.map((num, i) => i === opponentMove ? 2 : num)
                    needToExplode = true
                }

                const move = () => {
                    if (newCells.filter(c => c === 2).length === 20) {
                        setModalText('Вы проиграли :(  \n Возвращение в меню...')
                        delayedNav()
                    }

                    const defeatedShips = fullShipDetect(newCells)
                    outlineDefeatedShips(defeatedShips, newCells)
                    setCells(newCells)
                }

                setTimeout(() => {
                    setActivateRocket([opponentMove,false])

                    if (needToExplode) {
                        setActivateExplosion([opponentMove, true])
                        setTimeout(() => {
                            setActivateExplosion([opponentMove, false])
                            move()
                        }, 220);
                    } else {
                        move()
                    }

                }, 500);

            }
        }
    }, [opponentMove])

    let shipToRender = []
    const defeatedShips = fullShipDetect(cells)
    if (isOpponentField && defeatedShips.length !== 0) {
        for (let ship of defeatedShips) {
            shipToRender.push({
                firstCell: ship[0],
                length: ship.length,
                direction: ship.length === 1 ? 'hor' 
                            :  ship[1] - ship[0] === 1 
                            ? 'hor' 
                            : 'ver'      
            })
        }
    }

    return (
        <div ref={fieldRef} className={mainStyles.gameField}>
            {cells.map((e, index) => (
                <GameCell
                    isOpponentField = {isOpponentField}
                    key={index}
                    e={e}
                    onClick={() => attack(index)}
                    shipToRender = {shipToRender}
                    index = {index}
                    activateRocket = {activateRocket}
                    activateExplosion = {activateExplosion}
                ></GameCell>
            ))}

            {/* {isOpponentField ? <OpponentShips defeatedShips = {fullShipDetect(cells)}/> : <></>} */}

            {shipsLayout.map((ship, index) => (
                <Ship
                    key={index}
                    isOnField={ship.isOnField}
                    shipNumber={ship.shipNumber}
                    size={ship.size}
                    startX={ship.startX}
                    startY={ship.startY}
                    rotation={'ver'}></Ship>
            ))}
        </div>
    )
}