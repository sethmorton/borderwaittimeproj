// INI VARS AND IMPORT
const mongoClient = require("mongodb").MongoClient;
const axios = require("axios");
const xml2js = require("xml2js");
const distance = require("google-distance-matrix");

// VARS
const cbpUrl = "https://bwt.cbp.gov/xml/bwt.xml";
const uri =
  "mongodb+srv://seth:8FzjIfvkmIZicmzB@cluster0.j8pkw.mongodb.net/bajaborder?retryWrites=true&w=majority";
const API_KEY = "AIzaSyCXD1CInLtPgHXXkcUeps3XLaxkO7qNjxI";

// SETUP
const parser = new xml2js.Parser({ attrkey: "ATTR" });
const client = new mongoClient(uri, { useNewUrlParser: true });
distance.key(API_KEY);
const origin = ["32.525169,-117.017955"];
const destination = ["32.558894,-117.060704"];

// FUNCTION
async function getData() {
  const response = await axios.get(cbpUrl);
  parser.parseString(response.data, function (err, result) {
    this.cbpdata =
      result.border_wait_time.port[68].pedestrian_lanes[0].ready_lanes[0];
  });
  distance.matrix(origin, destination, function (err, distances) {
    if (distances.status == "OK") {
      this.mapdata = distances.rows[0].elements[0];
    }
  });
  client.connect((err) => {
    const collection = client.db("bajaborder").collection("bordertimes");
    const googlemapdata = this.mapdata;
    const cbpdata = this.cbpdata;
    const time = Date.now();
    collection.insertOne({ googlemapdata, cbpdata, time });
    client.close();
  });
}
getData();
