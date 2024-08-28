import { useState, useEffect } from 'react';

function App() {
  const [loading, SetLoading] = useState(true);
  const [coins, setCoins] = useState([])
  
  const coinSymbols = ["BTC", "ETH", "BNB", "DOGE", "USDT"];

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((data) => {
        const filteredCoins = data.filter((coin) => coinSymbols.includes(coin.symbol));
        setCoins(filteredCoins);
        SetLoading(false);
      });
  }, []);
  return (
    <div>
      <h1>Coin Tracker {loading ? "": `(${coins.length})`}</h1>
      {loading && <strong>Loading...</strong>}
      <select hidden={loading === true}>
        {coins.map((coin) => (
          <option key={coin.id}>{coin.name}({coin.symbol}): {coin.quotes.USD.price} USD</option>
        ))}
      </select>
    </div>
  );
}

export default App;
