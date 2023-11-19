// Fetch data for multiple cryptocurrencies
async function fetchMultipleCrypto(ids) {
  const apiUrl = `https://api.coincap.io/v2/assets`;

  try {
    const response = await fetch(apiUrl, { method: "GET" });

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const data = await response.json();
    const filteredData = data.data.filter((asset) => ids.includes(asset.id));
    return filteredData;
  } catch (error) {
    throw error;
  }
}

// Search for cryptocurrency by symbol
async function searchCrypto() {
  const cryptoInput = document.getElementById("cryptoSearch").value.toUpperCase();

  try {
    const cryptoData = await fetchCryptoById(cryptoInput);

    if (!cryptoData) {
      console.error("Crypto not found for symbol:", cryptoInput);
      document.getElementById("searchResultPrice").textContent = "Crypto not found.";
      return;
    }

    const searchResultsContainer = document.getElementById("searchResultsContainer");
    searchResultsContainer.innerHTML = `
      <p>Search Results:</p>
      <p>Name: ${cryptoData.name}</p>
      <p>Symbol: ${cryptoData.symbol}</p>
      <p>Price (USD): ${cryptoData.priceUsd}</p>
    `;

    document.getElementById("searchResultPrice").textContent = "";
    renderCryptoData([cryptoData]);
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    document.getElementById("searchResultsContainer").textContent = "Error fetching crypto data.";
  }
}

// Fetch cryptocurrency data by ID
async function fetchCryptoById(id) {
  const apiUrl = `https://api.coincap.io/v2/assets/${id.toLowerCase()}`;

  try {
    const response = await fetch(apiUrl, { method: "GET" });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(`Error fetching crypto data for ${id}: ${errorData.error}`);
      return null;
    }

    const data = await response.json();
    console.log(`Data for ${id}:`, data);
    return data.data;
  } catch (error) {
    console.error(`Error fetching crypto data for ${id}:`, error);
    throw error;
  }
}

// Render cryptocurrency data
function renderCryptoData(cryptoData) {
  const bitcoinData = document.getElementById("cryptoDataBitcoin");
  const ethereumData = document.getElementById("cryptoDataEthereum");
  const litecoinData = document.getElementById("cryptoDataLitecoin");

  bitcoinData.innerHTML = "";
  ethereumData.innerHTML = "";
  litecoinData.innerHTML = "";

  cryptoData.forEach((asset) => {
    const item = document.createElement("div");
    item.innerHTML = `
      <p>Name: ${asset.name}</p>
      <p>Symbol: ${asset.symbol} </p>
      <p>Price (USD): ${asset.priceUsd}</p>
      <button class="saveButton" onclick="saveCryptoPrice ('${asset.symbol}', ${asset.priceUsd})">Save Price</button>
    `;

    if (asset.id === "bitcoin") {
      bitcoinData.appendChild(item);
    } else if (asset.id === "ethereum") {
      ethereumData.appendChild(item);
    } else if (asset.id === "litecoin") {
      litecoinData.appendChild(item);
    }
  });

  const savedCrypto = JSON.parse(localStorage.getItem("savedCrypto")) || {};
  updateSavedCryptoList(savedCrypto);
}

// Save cryptocurrency price
function saveCryptoPrice(symbol, price) {
  const savedCrypto = JSON.parse(localStorage.getItem("savedCrypto")) || {};
  savedCrypto[symbol] = price;
  localStorage.setItem("savedCrypto", JSON.stringify(savedCrypto));
  updateSavedCryptoList(savedCrypto);
}

// Update the list of saved cryptocurrencies
function updateSavedCryptoList(savedCrypto) {
  const savedCryptoList = document.getElementById("savedCryptoList");
  savedCryptoList.innerHTML = "";

  for (const symbol in savedCrypto) {
    const listItem = document.createElement("ul");
    listItem.textContent = `${symbol}: $${savedCrypto[symbol]}`;
    savedCryptoList.appendChild(listItem);
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  const cryptoIds = ["bitcoin", "ethereum", "litecoin"];

  try {
    const cryptoData = await fetchMultipleCrypto(cryptoIds);
    renderCryptoData(cryptoData);
  } catch (error) {
    console.error("Error:", error);
  }

  const searchButton = document.getElementById("searchButton");
  searchButton.addEventListener("click", searchCrypto);

  // Fetch a joke
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

  // Reveal punchline on button click
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

  // Save name to localStorage
  function saveName() {
    const userName = document.getElementById("nameInput").value;
    localStorage.setItem("userName", userName);
    displayName(userName);
  }

  // Display user's name on HTML
  function displayName(name) {
    const displayElement = document.getElementById("displayName");
    displayElement.textContent = `User's Name: ${name}`;
  }

  // Show welcome alert
  function showWelcomeAlert() {
    const userName = localStorage.getItem("userName");
    if (userName) {
      alert(`Welcome back, ${userName}!`);
    }
  }

  // Check if the user's name exists in localStorage on page load
  document.addEventListener("DOMContentLoaded", function () {
    const userName = localStorage.getItem("userName");
    if (userName) {
      displayName(userName);
      showWelcomeAlert();
    }
  });

  // Call function to reveal punchline
  revealPunchline();

  // Update the clock
  function updateClock() {
    var now = dayjs().format("h:mm A MM-DD-YYYY");
    document.getElementById("timeClock").textContent = now;
  }

  // Call updateClock() immediately to set the initial time
  updateClock();

  // Update the clock every second
  setInterval(updateClock, 1000);
});
