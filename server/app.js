var request = require('request');
var cheerio = require('cheerio');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://pricehound:admin123@localhost:27017/";
var pid = "";
MongoClient.connect(url, { useNewUrlParser: true }  ,function(err, db) {
  if (err) throw err;
  var dbo = db.db("pricehound");

  console.log("database connected");
  dbo.collection("pricehound").findOne({}, function(err, result) {
    if (err) throw err;
    console.log(result.Product_id_flipkart);
    pid = result.Product_id_flipkart;
    db.close();
  });
});

console.log('scrapper started');

function getWarranty(id) {
    request.get(`https://www.flipkart.com/whirlpool-200-l-direct-cool-single-door-4-star-refrigerator-base-drawer/p/itmevysxpc7hkuhd?pid=${id}`, function(
      error,
      response,
      data
    ) {
      const $ = cheerio.load(data);
      var war =  $("._3h7IGd")  
            .text()
    .trim();
      var warranty = war.substring(0, war.length-9);
      console.log(warranty);
    });
  }

  getWarranty(pid);


// setInterval(getWarranty, 1500, "RFREVYSXE2YJJHSG");

  