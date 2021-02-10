// SPDX-License-Identifier: MIT

pragma solidity ^0.7.1;

contract StockPrices {
    // quote structure
    struct Stock {
        uint price;
        uint volume;
    }
    
    address owner;
    mapping(bytes4 => Stock) stockQuotes;
    
    constructor() {
        owner = msg.sender;
    }
    
    modifier onlyOwner {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }
    
    // Set the value of a stock
    function setStock(bytes4 _symbol, uint _price, uint _volume) onlyOwner public {
        Stock memory newStock = Stock({
            price: _price,
            volume: _volume
        });
        stockQuotes[_symbol] = newStock;
    }
    
    // Get the value of a stock
    function getStockPrice(bytes4 _symbol) public view returns (uint) {
        return stockQuotes[_symbol].price;
    }
    
    // Get the value of volume traded for a stock
    function getStockVolume(bytes4 _symbol) public view returns (uint) {
        return stockQuotes[_symbol].volume;
    }
}
