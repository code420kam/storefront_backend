import app from "./server"
const port = 3000;
export const server = app.listen(port, function () {
    console.log(`starting app on: ${port}`)
})

// export const closeServer = server.close();