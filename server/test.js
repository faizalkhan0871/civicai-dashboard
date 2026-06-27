const dns = require("node:dns");

// Force public DNS
dns.setServers(["8.8.8.8", "1.1.1.1"]);

console.log("DNS:", dns.getServers());

dns.resolveSrv("_mongodb._tcp.cluster0.rnty3v0.mongodb.net", (err, records) => {
  console.log("ERR:", err);
  console.log("RECORDS:", records);
});