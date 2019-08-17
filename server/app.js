var request = require('request');
var cheerio = require('cheerio');
const axios = require('axios');
const url = require('url');
const querystring = require('query-string');
var pid = "";
var data;
console.log('scraper started');

var config = {
    headers: {'X-My-Custom-Header': 'Header-Value'}
  };

 axios.get(
        'http://ec2-13-233-84-193.ap-south-1.compute.amazonaws.com:1337/refrigerators/',
      ).then(function(response){
    
      data = response.data;
      getWarranty(data[0].product_id_flipkart, data[0]._id);
      

    //   data.forEach((element)=>{
    //       getWarranty(element.product_id_flipkart);
    //   })
      });
function getWarranty(id, fid) {
    request.get(`https://www.flipkart.com/test/p/test?pid=${id}`, function(
      error,
      response,
      data
    ) {
      const $ = cheerio.load(data);
      var war =  $("._3h7IGd")  
            .text()
    .trim();
      var rate = $("._1i0wk8").text().trim();
      var rc = $(".row _2yc1Qo > .col-12-12").text().trim();
      var rcount = rc.substring(0,rc.length-9);
      var warranty = war.substring(0, war.length-9);

      console.log(rcount);
      console.log(warranty);
      console.log(rate);
      console.log(typeof(fid));
      axios.post(
        "http://ec2-13-233-84-193.ap-south-1.compute.amazonaws.com:1337/refrigerators/5d5626414be5372232eefe7f", 
        querystring.stringify({ warranty: warranty })
        ).then(r => console.log(r))
        .catch(e => console.log(e));
    });
  }

  getWarranty(pid);
// setInterval(getWarranty, 1500, "RFREVYSXE2YJJHSG");

  