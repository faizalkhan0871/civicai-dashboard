const dns = require("dns");

dns.resolveSrv("_mongodb._tcp.cluster0.rnty3v0.mongodb.net", (err, addresses) => {
  console.log("ERR:", err);
  console.log("ADDRESSES:", addresses);
});