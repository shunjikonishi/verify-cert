"use strict";

const codecheck = require("codecheck");

//"openssl s_client -connect app.code-check.io:443 < /dev/null 2> /dev/null | openssl x509 -text | grep Not"

const KEYS = {
  "Version": "version",
  "Signature Algorithm": "signatureAlgorithm",
  "Issuer": "issuer",
  "Not Before": "notBefore", 
  "Not After": "notAfter",
  "Subject": "subject"
};

let host = "app.code-check.io";
let getCert = codecheck.consoleApp("openssl s_client -connect " + host + ":443").consoleOut(false);
getCert.run().spread((code, stdout) => {
  let decodeCert = codecheck.consoleApp("openssl x509 -text").consoleOut(false);
  decodeCert.input(stdout);
  return decodeCert.run();
}).spread((code, stdout, stderr) => {
  let ret = {};
  stdout.forEach(v => {
    let strArray = v.split(":");
    let key = strArray[0].trim();
    if (KEYS[key]) {
      ret[KEYS[key]] = strArray.slice(1).join(":").trim();
    }
  });
  return ret;
}).then((v) => {
  console.log(v);
})
