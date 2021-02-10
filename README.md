# BCDV1011-oracle
## Design Patterns Lab 1

1. cd into "/express" and "npm i"
2. cd into "/react" and "npm i"
3. Spin up Ganache or ganache-cli -d (deterministric beacuse of hardcoded EOA, private key and first contract deploy), and change "/express/index.js:3" from 8545 to 7545 if needed
4. Compile StockPrices.sol with solc v0.7.1 and deploy
5. cd into "/express" and perform "node index"
6. In a separate shell, cd into "/react" and perform "npm start"
7. If not auto-launched, navigate to http://localhost:3000 and open the browser console
8. For the "symbol", enter "0x41424344" without quotes
9. Click "Get" buttons to read from the contract using the oracle (output to browser console)
10. Enter Price and Volume and click "Set" button to write to the contract using the oracle (tx hash in browser console)
