import User from "../model/User.js";
import bcrypt from 'bcrypt'

export const register = async (req, res, next) => {
	const { password } = req.body;

	const salt = bcrypt.genSaltSync(10)
	const hash = bcrypt.hashSync(password, salt)

	try {
		const newUser = new User({
			...req.body,
			password: hash
		})

		const savedUser = await newUser.save();
		res.status(200).json(savedUser);
	} catch (e) {
			next(e)
	}
}

export const login = async (req, res, next) => {
	
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });
		// console.log(password, user.password)

		if(!user){
			return res.status(404).json('Incorrect email or password! Try again.')
		}

		
		const isPassword = bcrypt.compareSync(password, user.password);

		if(!isPassword){
			return res.status(404).json('Incorrect email or password! Try again.')
		}

		else return res.status(200).json("Succesfull Login!")
	} catch (e) {
		next(e)
	}
// random log
}