const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {

    async index(request, response) {
        const { latitude, longitude, techs } = request.query;

        let devsQuery = {
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: 10000
                },
            },
        };

        // Filter devs by tech only if is informed
        if (techs) {
            const techsArray = parseStringAsArray(techs);
            devsQuery.techs = {
                $in: techsArray
            };
        }

        const devs = await Dev.find(devsQuery);

        return response.json({ devs })
    }
}