const dotenv = require('dotenv');
dotenv.config();
var request = require('request');
var cheerio = require('cheerio');
const axios = require('axios');
const url = require('url');
const querystring = require('query-string');
var pid = "";
var data;
console.log('scraper started');

var config = {
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  };

console.log(process.env.domain);

 axios.get(
        process.env.domain,
      ).then(function(response){
    
      data = response.data;
    //  getWarranty(data[0].product_id_flipkart,data[0]._id);
      data.forEach((element)=>{
          getWarranty(element.product_id_flipkart,element._id);
        })
      
      }).catch(e => console.log(e));
function getWarranty(id, fid) {
    axios.get(process.env.flipkart+id).then(function(response
    ) {
      const $ = cheerio.load(response.data);
      var war =  $("._3h7IGd")  
            .text()
    .trim();
      var rate = $("._1i0wk8").text().trim();
      var warranty = war.substring(0, war.length-9);

      console.log(warranty);
      console.log(rate);
      await axios.put(
        "http://ec2-13-233-84-193.ap-south-1.compute.amazonaws.com:1337/refrigerators/"+fid, 
        querystring.stringify({ warranty: warranty }),
        config
        );
     //    .then(r => console.log(r));
    //     .catch(e => console.log(e));
    });
  }

//getWarranty(pid, "5d5626414be5372232eefe7f");
// setInterval(getWarranty, 1500, "RFREVYSXE2YJJHSG");

  