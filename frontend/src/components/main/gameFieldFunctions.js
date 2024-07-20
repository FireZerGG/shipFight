export const fullShipDetect = (field) => {

    let defeatedShipsArr = []

    const check = (shipNumber, index, prefIndex) => {
        if (prefIndex === -1) {
            defeatedShipsArr[shipNumber] = [index] 
        } else {
            defeatedShipsArr[shipNumber].push(index)
        }

        if (field[index -1] === 2) {
            if (index % 10 !== 0) {
                if (index - 1 !== prefIndex) {
                    check(shipNumber, index -1, index)
                }
            }
        }
        if (field[index +1] === 2) {
            if (index % 10 !== 9) {
                if (index + 1 !== prefIndex) {
                    check(shipNumber, index +1, index)
                }
            }
        }
        if (field[index -10] !== undefined) {
            if (field[index -10] === 2) {
                if (index -10 !== prefIndex) {
                    check(shipNumber, index -10, index)
                }
            }
        }
        if (field[index + 10] !== undefined) {
            if (field[index +10] === 2) {
                if (index + 10 !== prefIndex) {
                    check(shipNumber, index +10, index)
                }
            }
        }
    }

    let shipNumber = 0

    for (let i in field) {
        let needToCheck = true
        if (field[+i] === 2) {
            for (let ship of defeatedShipsArr) {
                for (let c of ship) {
                    if (c === +i) {
                        needToCheck = false
                    }
                }
            }
            if (needToCheck) {
                check(shipNumber, +i, -1)
                shipNumber += 1
            }
        }
    }
    for (let shipI in defeatedShipsArr) {
        let ship = defeatedShipsArr[+shipI]
        loop2: for (let i in ship) {
            if (ship[+i] % 10 !== 9) {
                if (field[ship[+i]+1] === 1) {
                    defeatedShipsArr.splice(+shipI,1)
                    break loop2
                }
            }
            if (ship[+i] % 10 !== 0) {
                if (field[ship[+i]-1] === 1) {
                    defeatedShipsArr.splice(+shipI,1)
                    break loop2
                }
            }
            if (field[ship[+i]+10] !== undefined) { 
                if (field[ship[+i]+10] === 1) {
                    defeatedShipsArr.splice(+shipI,1)
                    break loop2
                }
            }
            if (field[ship[+i]-10] !== undefined) {
                if (field[ship[+i]-10] === 1) {
                    defeatedShipsArr.splice(+shipI,1)
                    break loop2
                }
            }
        }
    }

    return defeatedShipsArr
}

export const outlineDefeatedShips = (defeatedShips, cells) => {
    for (let ship of defeatedShips) {
        for (let i of ship) {
            if (i % 10 !== 0) {
                if (cells[i-1] === 0) {
                    cells[i-1] = 3
                }
            }
            if (i % 10 !== 9) {
                if (cells[i+1] === 0) {
                    cells[i+1] = 3
                }
            }
            if (cells[i+10] !== undefined) {
                if (cells[i+10] === 0) {
                    cells[i+10] = 3
                }
            }
            if (cells[i-10] !== undefined) {
                if (cells[i-10] === 0) {
                    cells[i-10] = 3
                }
            }
        }
    }
}