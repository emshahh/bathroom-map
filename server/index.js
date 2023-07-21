import express from 'express'
import cors from 'cors'

const app = express();
const PORT = 3001;
app.use(cors({
  origin: "http://localhost:3000"
}))
app.use(express.json())

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
	console.log(`Server is running on port ${PORT}`)
})