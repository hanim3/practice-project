import { useEffect, useState } from "react";
import style from "./App.module.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [money, setMoney] = useState(0);
  const [total, setTotal] = useState(0);
  const [canCoins, setCanCoins] = useState([]);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
    .then((response) => response.json())
    .then((json) => {
      setCoins(json)
      setLoading(false);
    });
  }, [])
  const onChange = (event) => setMoney(event.target.value)
  const onSubmit = (event) => {
    event.preventDefault();
    if (money === "") {
      return;
    }
    setCanCoins(
      coins.reduce((prevs, cur) => {
      if (money >= (cur.quotes.USD.price * 1197)) {
        const canGetCount = Math.floor(money / (cur.quotes.USD.price * 1197));
        prevs.push({
          name: cur.name,
          price: (cur.quotes.USD.price * 1197.44000).toFixed(6),
          count: canGetCount
        })
        setTotal((prev) => prev + canGetCount);
      }
      return prevs
    }, []));
  }
  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      <form onSubmit={onSubmit}>
        <input 
          value={money}
          onChange={onChange}
          type="number"
          placeholder="How much money do you have?"
        />
        <button>Search</button>
      </form>
      {
        loading ? (
          <strong>Loading...</strong>
        ) : (
          <div>
            <h3>You can get ... {total} coins!</h3>
            <h3>[What, How many] Coins You can Get?</h3>
            <ul>
              {canCoins.map((coin, index) => (
                <li key={index}>you can get [<strong>{coin.name}, {coin.count}</strong>] ({coin.price}WON)</li>
              ))}
            </ul>
          </div>
        )
      }
    </div>
  );
}

export default App;
