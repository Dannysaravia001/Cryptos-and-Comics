async function fetchMultipleCrypto(ids) {
  const apiUrl = `https://api.coincap.io/v2/assets`;

  try {
    const response = await fetch(apiUrl, { method: 'GET' });

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const data = await response.json();
    const filteredData = data.data.filter(asset => ids.includes(asset.id));
    return filteredData; // Return data for the specified cryptocurrencies
  } catch (error) {
    throw error;
  }
}

function renderCryptoData(cryptoData) {
  const bitcoinData = document.getElementById('cryptoDataBitcoin');
  const ethereumData = document.getElementById('cryptoDataEthereum');
  const litecoinData = document.getElementById('cryptoDataLitecoin');

  // Clear previous content
  bitcoinData.innerHTML = '';
  ethereumData.innerHTML = '';
  litecoinData.innerHTML = '';

  cryptoData.forEach(asset => {
    const item = document.createElement('div');
    item.innerHTML = `
      <p>Name: ${asset.name}</p>
      <p>Symbol: ${asset.symbol} </p>
      <p>Price (USD): ${asset.priceUsd}</p>
      `;

    if (asset.id === 'bitcoin') {
      bitcoinData.appendChild(item);
    } else if (asset.id === 'ethereum') {
      ethereumData.appendChild(item);
    } else if (asset.id === 'litecoin') {
      litecoinData.appendChild(item);
    }
  });
}

// Usage
const cryptoIds = ['bitcoin', 'ethereum', 'litecoin'];

fetchMultipleCrypto(cryptoIds)
  .then(cryptoData => {
    renderCryptoData(cryptoData);
  })
  .catch(error => {
    console.error('Error:', error);
  });

 document.addEventListener('DOMContentLoaded', function () {
  function fetchJoke() {
    const apiUrl = "https://official-joke-api.appspot.com/random_joke";
    return fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .catch((error) => {
        throw error;
      });
  }


  // Function to reveal punchline on button click
  function revealPunchline() {
    fetchJoke()
      .then((jokeData) => {
        const jokeTextPlaceholder = document.getElementById("jokeTextPlaceholder");
        jokeTextPlaceholder.innerText = jokeData.setup;
        
        const punchlineSpan = document.createElement("span");
        punchlineSpan.innerText = ` ${jokeData.punchline}`;
        punchlineSpan.style.display = "none";
  
        jokeTextPlaceholder.appendChild(punchlineSpan);
  
        const revealButton = document.getElementById("revealButton");
        revealButton.innerText = "Reveal Punchline";
        revealButton.onclick = function () {
          punchlineSpan.style.display = punchlineSpan.style.display === "none" ? "inline" : "none";
          revealButton.innerText = punchlineSpan.style.display === "none" ? "Reveal Punchline" : "Hide Punchline";
        };
      })
      .catch((error) => {
        console.error("Error fetching joke:", error);
      });
  }

  // Call function to reveal punchline
  revealPunchline();
});

//id is timeClock
function updateClock() {
  var now = dayjs().format('h:mm:ss');
  // Update the content of the clock element
  document.getElementById('timeClock').textContent = now;
}

// Call updateClock() immediately to set the initial time
updateClock();

// Update the clock every second
setInterval(updateClock, 1000);

