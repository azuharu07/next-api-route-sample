import express from "express"

const app = express()

app.use((req, res) => res.json({ message: "hello" }))

export default app