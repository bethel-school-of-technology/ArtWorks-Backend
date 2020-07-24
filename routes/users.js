var express=require('express');
var router=express.Router();
var artists=require('../models/artists');
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
router.post('/signup', function (req, res) {
  var data=new artists({
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
      artworks
    });
  });
});
router.post('/gallery/:id', function(req, res){ 
  console.log(req.params.id);
  console.log(req.body);
  artists.findByIdAndUpdate(req.params.id, {Votes: req.body.count }, 
    function(err, result){
      if (err){
        res.send("error updating: "+ err)
      
      }
      else {
        res.send(result);
      }
    })
 

  res.send('received');

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

module.exports=router;
