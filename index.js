"use strict";

const getCert = require("./src/getCert");

const host = process.argv[2];

getCert(host).then(v => {
  console.log(`${host}: ${v.notBefore.format("YYYY-MM-DD")} - ${v.notAfter.format("YYYY-MM-DD")}  (${v.notAfter.fromNow()})`);
});

