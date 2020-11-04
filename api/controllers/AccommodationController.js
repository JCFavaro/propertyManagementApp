/**
 * AccomodationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    home: async function (req, res) {
        let accommodations = await Accommodation.find({owner: {'!=': null}}).populate('owner');
        await Accommodation.destroy({owner: null});
        res.view('pages/homepage', {accommodations: accommodations});
    },

    newAccommodation: async function (req, res) {
        let name = req.param('nombre');
        let capacity = req.param('capacidad');
        let garage = req.param('garage');
        let address = req.param('direccion');

        let accommodations = await Accommodation.create({
            name,
            capacity,
            garage,
            address,
            image: 'default.png',
            owner: req.session.user.id
        });
        res.redirect('/');

    },

    newAccommodationInvisible: function (req, res) {
        res.view('pages/newAccommodation');
    },

    deleteAccommodation: async function (req, res) {
        await Accommodation.destroy({id: req.param('id')});

        res.redirect('/');
    }
};

