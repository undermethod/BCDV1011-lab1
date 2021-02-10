//import logo from './logo.svg';
import './App.css';

const HOSTNAME = "localhost";
const PORT_EXPRESS = 2999;

function App() {
  const handleClickGetStockPrice = async (ev) => {
    ev.preventDefault();
    const symbol = document.querySelector("#stockSymbol").value;
    if(!symbol) {
      console.log("Fill in empty symbol field.");
      return;
    }

    const result = await fetch(`http://${HOSTNAME}:${PORT_EXPRESS}/price?sym=${symbol}`);
    const resultJson = await result.json();
    console.log(`Price: ${resultJson}`);
  };

  const handleClickGetStockVolume = async (ev) => {
    ev.preventDefault();
    const symbol = document.querySelector("#stockSymbol").value;
    if(!symbol) {
      console.log("Fill in empty symbol field.");
      return;
    }

    const result = await fetch(`http://${HOSTNAME}:${PORT_EXPRESS}/volume?sym=${symbol}`);
    const resultJson = await result.json();
    console.log(`Volume: ${resultJson}`);
  };

  const handleClickSetStock = async (ev) => {
    ev.preventDefault();
    const symbol = document.querySelector("#stockSymbol").value;
    const price = document.querySelector("#stockPrice").value;
    const volume = document.querySelector("#stockVolume").value;
    if(!symbol || !price || !volume) {
      console.log("Fill in empty fields.");
      return;
    }

    const result = await fetch(`http://${HOSTNAME}:${PORT_EXPRESS}?sym=${symbol}&pri=${price}&vol=${volume}`, { method: "POST" });
    const resultJson = await result.json();
    console.log(`Transaction hash: ${resultJson}`);
  };

  return (
    <div className="App">
      <h2>Playing with an Oracle</h2>
      <section>
        <div>
          Symbol:
          <input id="stockSymbol" type="text"></input>
        </div>
        <div>
          <button onClick={handleClickGetStockPrice}>Get Stock Price</button>
          <button onClick={handleClickGetStockVolume}>Get Stock Volume</button>
        </div>
      </section>
      <p></p>
      <section>
        <div>
          Price:
          <input id="stockPrice" type="number"></input>
          Volume:
          <input id="stockVolume" type="number"></input>
        </div>
        <div>
          <button onClick={handleClickSetStock}>Set Stock</button>
        </div>
      </section>
    </div>
  );
}

export default App;
