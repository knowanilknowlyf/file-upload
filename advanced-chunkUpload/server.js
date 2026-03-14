import app from "./app.js"

const PORT = 3200
app.listen(PORT,
    ()=>{
        console.log('server running on ',PORT)
    }
) 