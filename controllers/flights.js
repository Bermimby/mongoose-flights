const Flight = require('../models/flight')


module.exports = {
    index,
    new: newFlight,
    show,
    create,
    
}

function index (req, res) {
    Flight.find({}, function(err, flights) {
      res.render('flights/index', { title: 'All Flights', flights });
    });
  }

  
  function newFlight(req,res){
     res.render("flights/new");
  }

  function show(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        console.log(flight)
        Ticket.find({flight: flight._id}, function(err, tickets) {
        res.render('flights/show', { flight, tickets })
    });
})
}

   function create(req,res){
    const flight = new Flight(req.body);
    flight.save(function(err) {
      if (err) return res.redirect('/flights/new');
      console.log(flight);
      res.redirect('/flights');
    });
   }