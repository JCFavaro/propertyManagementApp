/**
 * AccomodationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  home: async function (req, res) {
    let accommodations = await Accommodation.find({owner: req.session.user.id}).populate('owner');
    await Accommodation.destroy({owner: null});
    res.view('pages/homepage', {accommodations: accommodations});
  },

  newAccommodation: async function (req, res) {
    let name = req.param('name');
    let capacity = req.param('capacity');
    let garage = req.param('garage');
    let address = req.param('address');
    let type = req.param('type');
    let image;

    if (type === 'house') {
      image = 'house.png';
    } else if (type === 'apartment') {
      image = 'apartment.png';
    } else {
      image = 'cabin.png';
    }

    let accommodations = await Accommodation.create({
      name,
      capacity,
      garage,
      address,
      type,
      image,
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

