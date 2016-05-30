"use strict";

const codecheck = require("codecheck");
const moment = require("moment");

const KEYS = {
  "Version": "version",
  "Signature Algorithm": "signatureAlgorithm",
  "Issuer": "issuer",
  "Not Before": "notBefore", 
  "Not After": "notAfter",
  "Subject": "subject"
};

function convertValue(key, value) {
  let ret = value;
  if (key === "notBefore"　|| key === "notAfter") {
    ret = moment(value, "MMM D HH:mm:ss YYYY Z");
  }
  return ret;
}

function getCert(host) {
  let doGet = codecheck.consoleApp("openssl s_client -connect " + host + ":443").consoleOut(false);
  return doGet.run().spread((code, stdout) => {
    let doDecode = codecheck.consoleApp("openssl x509 -text").consoleOut(false);
    doDecode.input(stdout);
    return doDecode.run();
  }).spread((code, stdout, stderr) => {
    let ret = {};
    stdout.forEach(v => {
      let strArray = v.split(":");
      let key = strArray[0].trim();
      if (KEYS[key]) {
        let value = strArray.slice(1).join(":").trim();
        ret[KEYS[key]] = convertValue(KEYS[key], value);
      }
    });
    return ret;
  })
}

module.exports = getCert;