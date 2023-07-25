import axios from 'axios'

const fetchToiletData = async () => {
	try {
		const response = await axios.get('https://data.cityofnewyork.us/resource/hjae-yuav.json');
		return response.data
	} catch (error) {
			throw error
	}
}

export const getAllToilets = async (req, res, next) => {
	try {
		const toilets = await fetchToiletData();
		res.status(200).json(toilets)
	} catch (e) {
		 next(e)
	}
	
}

export const getToiletByBorough = async (req, res, next) => {

	try {
		const toilets = await fetchToiletData();

		const toiletBorough = toilets.filter(toilet => toilet.borough === req.body.borough)

		res.status(200).json(toiletBorough)
	} catch (e) {
		 next(e)
	}
	
}