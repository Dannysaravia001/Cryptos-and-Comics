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

async function searchCrypto() {
  const cryptoInput = document.getElementById("cryptoSearch").value.toUpperCase();

  try {
    const apiUrl = `https://api.coincap.io/v2/assets/${cryptoInput.toLowerCase()}`;
    const response = await fetch(apiUrl, { method: "GET" });

    if (!response.ok) {
      console.error(`Crypto not found for symbol: ${cryptoInput}`);
      document.getElementById("searchResultPrice").textContent = "Crypto not found.";
      return;
    }

    const data = await response.json();
    const searchData = data.data; // Accessing data property

    const searchResultsContainer = document.getElementById("searchResultsContainer");

    // Create a new result element
    const newResultElement = document.createElement("div");
    newResultElement.innerHTML = `
      <p>Search Results:</p>
      <p>Name: ${searchData.name}</p>
      <p>Symbol: ${searchData.symbol}</p>
      <p>Price (USD): ${searchData.priceUsd}</p>
      <hr>
    `;

    // Append the new result element to the existing content
    searchResultsContainer.appendChild(newResultElement);

    document.getElementById("searchResultPrice").textContent = "";
    renderCryptoData([searchData]); // Passing the searchData as an array to render function
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    document.getElementById("searchResultsContainer").textContent = "Error fetching crypto data.";
  }
}
// Render cryptocurrency data
function renderCryptoData(cryptoData) {
  const bitcoinData = document.getElementById("cryptoDataBitcoin");
  const ethereumData = document.getElementById("cryptoDataEthereum");
  const litecoinData = document.getElementById("cryptoDataLitecoin");

// Function to update data for a specific cryptocurrency
  function updateCryptoData(element, asset) {
    element.innerHTML = `
      <p>Name: ${asset.name}</p>
      <p>Symbol: ${asset.symbol} </p>
      <p>Price (USD): ${asset.priceUsd}</p>
      <button class="saveButton" onclick="saveCryptoPrice ('${asset.symbol}', ${asset.priceUsd})">Save Price</button>
    `;
  }

  // Update data for Bitcoin if present in cryptoData
  const bitcoin = cryptoData.find(asset => asset.id === 'bitcoin');
  if (bitcoin) {
    updateCryptoData(bitcoinData, bitcoin);
  }

  // Update data for Ethereum if present in cryptoData
  const ethereum = cryptoData.find(asset => asset.id === 'ethereum');
  if (ethereum) {
    updateCryptoData(ethereumData, ethereum);
  }

  // Update data for Litecoin if present in cryptoData
  const litecoin = cryptoData.find(asset => asset.id === 'litecoin');
  if (litecoin) {
    updateCryptoData(litecoinData, litecoin);
  }

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
