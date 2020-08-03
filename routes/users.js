var express = require('express');
var router = express.Router();
var ArtWorks = require('../models/artists');
var AdminUser = require('../models/admin');
const jwt = require("jsonwebtoken");
var authService = require('../services/auth');


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
router.post('/signup', function (req, res) {
  var data = new artists({
    Name: req.body.name,
    Email: req.body.email,
    Portfolio: req.body.portfolio,
    Photo: req.body.photo
  });
  console.log(data);
  data.save(function (err) {
    if (err) throw err;
    console.log("Record inserted Successfully");
    res.json({
      message: "Record inserted Successfully",
      status: 200
    })
  });
})
router.get('/gallery', function (req, res) {
  artists.find({}).then(artworks => {
    res.json({
      message: "Art Successfully Downloaded",
      status: 200,
      artworks,
    });
  });
});
router.post('/gallery/:id', function (req, res) {
  console.log(req.params.id);
  console.log(req.body);
  artists.findByIdAndUpdate(req.params.id, {
      Votes: req.body.count
    },
    function (err, result) {
      if (err) {
        res.send("error updating: " + err)

      } else {
        res.send(result);
      }
    });

 
  // var data= new count({
  //   Votes= req.body.count
  // });
  // console.log(data);
  // data.save(function (err) {
  //   if (err) throw err;
  //   console.log("Record inserted Successfully");
  //   res.json({
  //     message: "Record inserted Successfully",
  //     status: 200
  //   });
  // });

});


// -------------------- EM PART 1 --------------------
// for artists to submit artwork

router.post('/add-submissions', function (req, res) {
  var data = new ArtWorks({
    Name: req.body.name,
    Email: req.body.email,
    Portfolio: req.body.portfolio,
    Photo: req.body.photo
  });
  console.log(data);
  data.save(function (err) {
    if (err) throw err;
    console.log("Record inserted Successfully");
    res.json({
      message: "Record inserted Successfully",
      status: 200
    })
  });
})



/* routes get for bringing backend data into frontend for the gallery */

router.get('/gallery', function (req, res) {
  ArtWorks.find({ New: false, Accepted: true }).then(artworks => {
    res.json({
      message: "Art Successfully Downloaded",
      status: 200,
      artworks
    });
  });
});



router.post('/gallery/:id', function (req, res) {
  console.log(req.params.id);
  console.log(req.body);
  ArtWorks.findByIdAndUpdate(req.params.id, {
      Votes: req.body.count
    },
    function (err, result) {
      if (err) {
        res.send("error updating: " + err)

      } else {
        res.send(result);
      }
    });
});


// -------------------- EM PART 2 --------------------
/* routes for login */

router.post('/login', function (req, res, next) {
  console.log(req.body);
  AdminUser.findOne(
    { Username: req.body.username }
  )
    .then(foundUser => {
      console.log(foundUser);
      if (!foundUser) {
        console.log('User not found');
        return res.json({
          message: 'Login failed',
          status: 401
        });
      } else {
        let passwordMatch = authService.comparePasswords(req.body.password, foundUser.Password);
        if (passwordMatch) {
          let token = authService.signUser(foundUser);
          res.json({
            message: "Login successful",
            status: 200,
            jwt: token,
          });
        }
        else {
          console.log("Wrong password");
          res.send("Wrong password");
        }
      }
    })
});

// -------------------- EM PART 3 --------------------
router.post('/signup', function (req, res, next) {
  AdminUser.findOne(
    { Username: req.body.username },
  ).then(foundUser => {
    if (foundUser) {
      res.json({
        messsage: "Found user with the same username",
        status: 302
      });

    } else {
      let newUser = new AdminUser(
        {
          Username: req.body.username,
          Password: authService.hashPassword(req.body.password)
        }
      )
      console.log(newUser);
      newUser.save(function (err) {
        if (err) throw err;
        console.log("New User Created Successfully");
        res.json({
          message: "New User Created Successfully",
          status: 200
        })
      });
    }

  })
});

// -------------------- EM PART 4 --------------------
// get new submissions 

router.get('/admin-gallery', function (req, res) {
  ArtWorks.find({ New: true }).then(artworks => {
    res.json({
      message: "Art Successfully Downloaded",
      status: 200,
      artworks
    });
  });
});

// -------------------- EM PART 5 --------------------
//artwork accepted

router.post('/admin-accept', function (req, res) {
  console.log(req.body._id)
  ArtWorks.findByIdAndUpdate(req.body._id, { Accepted: true, New: false }).then(artworks => {
    res.json({
      message: "Artwork accepted",
      status: 200,
      artworks
    });
  });
});


// -------------------- EM PART 6 --------------------
//artwork rejected 

router.post('/admin-reject', function (req, res) {
  console.log(req.body._id)
  ArtWorks.findByIdAndUpdate(req.body._id, { Accepted: false, New: false }).then(artworks => {
    res.json({
      message: "Artwork rejected",
      status: 200,
      artworks
    });
  });
});



module.exports = router;