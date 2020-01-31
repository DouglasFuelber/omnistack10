const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

module.exports = {

    async index(request, response) {
        const devs = await Dev.find();
        return response.json(devs);
    },

    async detail(request, response) {
        const { github_username } = request.params;
        const dev = await Dev.findOne({ github_username });
        return response.json(dev);
    },

    async create(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
            const { name = login, avatar_url, bio } = apiResponse.data;

            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }

            dev = await Dev.create({
                github_username,
                avatar_url,
                name,
                bio,
                techs: techsArray,
                location
            });

            const sendSocketMessageTo = findConnections(
                {latitude, longitude},
                techsArray
            );
            
            sendMessage(sendSocketMessageTo, 'new-dev', dev);
        }

        return response.json(dev);
    },

    async edit(request, response) {
        const { github_username } = request.params;
        const { bio, name, techs, latitude, longitude } = request.body;

        const techsArray = parseStringAsArray(techs);

        const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        }

        dev = await Dev.findOneAndUpdate({ github_username }, {
            bio,
            name,
            techs: techsArray,
            location
        }, { new: true });

        return response.json(dev);
    },

    async delete(request, response) {
        const { github_username } = request.params;
        const dev = await Dev.findOneAndDelete({ github_username });
        return response.json(dev);
    },
}