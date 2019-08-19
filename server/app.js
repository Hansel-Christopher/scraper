const dotenv = require('dotenv');
dotenv.config();
var cheerio = require('cheerio');
const axios = require('axios');
const querystring = require('query-string');
console.log('scraper started');

var config = {
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  };

console.log(process.env.domain);

const getProduct = async() =>{
    try{
        return await axios.get(
            process.env.domain,
          ).then(function(response){
        
          return data = response.data;
    });
    }catch(error){
        console.error(error)
    }
} 
const getFlipkart = async(pid) =>{
    try{
        return await axios.get(process.env.flipkart+pid).
        then(function(response) {
            const $ = cheerio.load(response.data);
            var war =  $("._3h7IGd")  
                    .text()
            .trim();
            var rate = $("._1i0wk8").text().trim();
            var warranty = war.substring(0, war.length-9);
            return warranty;
        })
    }catch(error){
        console.error(error);
    }
}

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

const putWarranty = async(fid,warranty) =>{
try{
    return await axios.put(
    "http://ec2-13-233-84-193.ap-south-1.compute.amazonaws.com:1337/refrigerators/"+fid, 
    querystring.stringify({ warranty: warranty }),
    config
    )
}
catch(error){
    console.error(error);
}
}
const scrapeWarranty = async() =>{
    const data = await getProduct();
    asyncForEach(data,async(element)=>{
        console.log(element._id);
        putWarranty(element._id, await getFlipkart(element.product_id_flipkart));

    });
}

scrapeWarranty();



    //  getWarranty(data[0].product_id_flipkart,data[0]._id);
    
    //   data.forEach((element)=>{
    //       getWarranty(element.product_id_flipkart,element._id);
    //     })
      
    //   }).catch(e => console.log(e));
// function getsWarranty(id, fid) {
//      axios.get(process.env.flipkart+id).then(function(response
//     ) {
    //   const $ = cheerio.load(response.data);
    //   var war =  $("._3h7IGd")  
    //         .text()
    // .trim();
    //   var rate = $("._1i0wk8").text().trim();
    //   var warranty = war.substring(0, war.length-9);

    //   console.log(warranty);
    //   console.log(rate);
    // console.log(response.data);
        // axios.put(
        // "http://ec2-13-233-84-193.ap-south-1.compute.amazonaws.com:1337/refrigerators/"+fid, 
        // querystring.stringify({ warranty: warranty }),
        // config
        // );
     //    .then(r => console.log(r));
    //     .catch(e => console.log(e));
//     });
//   }

//getWarranty(pid, "5d5626414be5372232eefe7f");
// setInterval(getWarranty, 1500, "RFREVYSXE2YJJHSG");

  