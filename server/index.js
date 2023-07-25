import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import mongoose from 'mongoose';

// routes
import authRoute from './route/authRoute.js'
import toiletRoute from './route/toiletRoute.js'


const app = express();
const PORT = 3001;
app.use(cors({
  origin: "http://localhost:3000"
}))
app.use(express.json())

// app.use('/', (req, res) => res.send('Sup'))

// DB Connection
const connect = async () => {
	await mongoose.connect(process.env.MONGO_URI)
	console.log('connected to db')
}


app.use('/auth', authRoute)
app.use('/data', toiletRoute)



app.use((err, req, res, next) => {
	const errorStatus = err.status || 500;
	const errorMessage = err.message || "something went wrong!";
	return res.status(errorStatus).json({
		success: false,
		status: errorStatus,
		message: errorMessage,
		stack: err.stack
	})
})

// start server
app.listen(PORT, () => {
	connect()
	console.log(`Server is running on port ${PORT}`)
})