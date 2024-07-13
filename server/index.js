const ws = require('ws')

const wss = new ws.Server({
    port: 5000,
}, () => console.log('server start on 5000'))

const queue = []
const games = []

wss.on('connection', function connection(ws) {
    ws.id = Date.now()
    ws.on('message', function (message) {
        message = JSON.parse(message)
        switch (message.event) {
            case 'queue':
                if (queue.length === 0) {
                    queue.push({id:ws.id, field: message.field})
                }
                else {
                    let pair = [queue[0].id, ws.id]
                    games.push(pair)

                    send(queue[0].id, message.field)
                    send(ws.id, queue[0].field)

                    queue = []
                }
                break
            case 'move':
                games.forEach(game => {
                    if (game[0].id === ws.id) {
                        send(game[1].id, message.field)
                    }
                    if (game[1] === ws.id) {
                        send(game[0].id, message.field)
                    }
                })
                break
        }
    })
})

const send = (id, e) => {
    wss.clients.forEach(client => {
        if (client.id === id) {
            client.send(JSON.stringify(e))
        }
    })
}