const HOSTNAME = "localhost";
const PORT_EXPRESS = 2999;
const PORT_GANACHE = 8545;
const contractAddress = "0xe78A0F7E598Cc8b0Bb87894B0F60dD2a88d6a8Ab";
const { abi } = require("./abi.js");

const Web3 = require("web3");
const express = require("express");
const url = require("url");
const cors = require("cors");

const provider = new Web3(new Web3.providers.HttpProvider(`http://${HOSTNAME}:${PORT_GANACHE}`));
let accounts;
provider.eth.getAccounts().then(acc => accounts = acc);

const StockPrices = new provider.eth.Contract(abi, contractAddress);
console.log(StockPrices._address === contractAddress ? "contract init sucess" : "contract init fail");

const app = new express();
app.use(cors());
server = app.listen(PORT_EXPRESS, HOSTNAME, () => console.log(`Server running at http://${HOSTNAME}:${PORT_EXPRESS}/`));

app.get("/price", async (req, res, next) => {
  const urlQuery = url.parse(req.url, true).query;
  console.log("urlQuery:", urlQuery);
  
  console.log("StockPrices:");
	console.log(StockPrices);
	
	const price = await StockPrices.methods.getStockPrice(urlQuery.sym).call({ from: accounts[0] })
  res.status = 200; // OK
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(price));
});

app.get("/volume", async (req, res, next) => {
  const urlQuery = url.parse(req.url, true).query;
  console.log("urlQuery:", urlQuery);
  
  const volume = await StockPrices.methods.getStockVolume(urlQuery.sym).call({ from: accounts[0] });
  res.status = 200; // OK
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(volume));
});

app.post("/", async (req, res, next) => {
  const urlQuery = url.parse(req.url, true).query;
  console.log("urlQuery:", urlQuery);

  try {
    const tx = await StockPrices.methods.setStock(urlQuery.sym, urlQuery.pri, urlQuery.vol).send({ from: accounts[0] });
    if(!tx.status) {
      console.error(`tx '${tx.transactionHash}' failed`);
      res.status = 204; // No Content
      res.end({});
    }
    res.stats = 200; // OK
    res.send(JSON.stringify(tx.transactionHash));
  } catch(err) {
    console.error(err);
    res.status = 204; // No Content
    res.end({});
  }
});

module.exports = app;
