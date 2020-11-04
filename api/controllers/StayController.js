/**
 * StayController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
  stays: async function (req, res) {
    //If alojamientos or customers are deleted
    await Stay.destroy({guest: null});
    await Stay.destroy({stay: null});

    let stays = await Stay.find({stay: req.params.id}).populate('guest').sort('initialDate ASC');

    res.view('pages/stay', {stays: stays});
  },

  newStay: async function (req, res) {
    let idUrl = req.param('id');

    let initialDate = new Date(req.param('initialDate'));
    let finalDate = new Date(req.param('finalDate'));
    let days = Math.floor((Date.UTC(finalDate.getFullYear(), finalDate.getMonth(), finalDate.getDate()) - Date.UTC(initialDate.getFullYear(), initialDate.getMonth(), initialDate.getDate())) / (1000 * 60 * 60 * 24));

    let paymentMethod = req.param('paymentMethod');
    let valuePerDay = req.param('valuePerDay');
    let totalValue = valuePerDay * days;
    let downPayment = (totalValue * 20) / 100;
    let accommodation = req.params.id;
    let guestID = req.param('guestID');

    let stays = await Stay.create({
      initialDate,
      finalDate,
      paymentMethod,
      valuePerDay,
      totalValue,
      downPayment,
      stay: accommodation,
      guest: guestID
    });

    res.redirect('/stay/' + idUrl);
  },

  newStayInvisible: async function (req, res) {
    let customers = await Customer.find({});
    res.view('pages/newStay', {customers: customers});
  },

  deleteStay: async function (req, res) {
    let deleteStay = req.param('id');

    await Stay.destroy({id: deleteStay});

    res.redirect('/');
  }

}
;

