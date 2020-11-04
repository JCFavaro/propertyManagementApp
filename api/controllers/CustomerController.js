/**
 * CustomerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  customers: async function (req, res) {
    let customers = await Customer.find({}).populate('stays');
    res.view('pages/customer', {customers: customers});
  },

  newCustomer: async function (req, res) {
    let fullName = req.param('fullName');
    let city = req.param('city');
    let members = req.param('members');
    let licensePlate = req.param('licensePlate');

    let customers = await Customer.create({
      fullName,
      city,
      members,
      licensePlate,
    });

    res.redirect('/customer');
  },

  newCustomerInvisible: function (req, res) {
    res.view('pages/newCustomer');
  },

  deleteCustomer: async function(req,res) {
    let deleteCustomer = req.param('id');
    await Customer.destroy({id: deleteCustomer});

    res.redirect('/customer');
  }
};

