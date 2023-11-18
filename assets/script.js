async function fetchMultipleCrypto(ids) {
  const apiUrl = `https://api.coincap.io/v2/assets`;
  try {
    const response = await fetch(apiUrl, { method: "GET" });
    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }
    const data = await response.json();
    const filteredData = data.data.filter((asset) => ids.includes(asset.id));
    return filteredData; // Return data for the specific crypto
  } catch (error) {
    throw error;
  }
}

async function searchCrypto() {
  const cryptoInput = document
    .getElementById("cryptoSearch")
    .value.toUpperCase();

  try {
    const cryptoData = await fetchCryptoById(cryptoInput);

    if (!cryptoData) {
      // Handle the case where cryptoData is not found
      console.error("Crypto not found for symbol:", cryptoInput);
      document.getElementById("searchResultPrice").textContent =
        "Crypto not found.";
      return;
    }

    // Display search results
    const searchResultsContainer = document.getElementById(
      "searchResultsContainer"
    );
    searchResultsContainer.innerHTML = `
      <p>Search Results:</p>
      <p>Name: ${cryptoData.name}</p>
      <p>Symbol: ${cryptoData.symbol}</p>
      <p>Price (USD): ${cryptoData.priceUsd}</p>
    `;

    // Display crypto price under the search bar
    document.getElementById("searchResultPrice").textContent = "";

    // Render the crypto data
    renderCryptoData([cryptoData]);
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    // Clear search results on error
    document.getElementById("searchResultsContainer").textContent =
      "Error fetching crypto data.";
  }
}

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

function renderCryptoData(cryptoData) {
  const bitcoinData = document.getElementById("cryptoDataBitcoin");
  const ethereumData = document.getElementById("cryptoDataEthereum");
  const litecoinData = document.getElementById("cryptoDataLitecoin");
  // Clear previous content
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
  // Fetch saved crypto prices and update the list
  const savedCrypto = JSON.parse(localStorage.getItem("savedCrypto")) || {};
  updateSavedCryptoList(savedCrypto);
}

function saveCryptoPrice(symbol, price) {
  // Save crypto price to localStorage
  const savedCrypto = JSON.parse(localStorage.getItem("savedCrypto")) || {};
  savedCrypto[symbol] = price;
  localStorage.setItem("savedCrypto", JSON.stringify(savedCrypto));
  updateSavedCryptoList(savedCrypto);
}

function updateSavedCryptoList(savedCrypto) {
  // Update the saved crypto list on the webpage
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

  // Add event listener for the search button
  const searchButton = document.getElementById("searchButton");
  searchButton.addEventListener("click", searchCrypto);

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
        const jokeTextPlaceholder = document.getElementById(
          "jokeTextPlaceholder"
        );
        jokeTextPlaceholder.innerText = jokeData.setup;
        const punchlineSpan = document.createElement("span");
        punchlineSpan.innerText = ` ${jokeData.punchline}`;
        punchlineSpan.style.display = "none";
        jokeTextPlaceholder.appendChild(punchlineSpan);
        const revealButton = document.getElementById("revealButton");
        revealButton.innerText = "Reveal Punchline";
        revealButton.onclick = function () {
          punchlineSpan.style.display =
            punchlineSpan.style.display === "none" ? "inline" : "none";
          revealButton.innerText =
            punchlineSpan.style.display === "none"
              ? "Reveal Punchline"
              : "Hide Punchline";
        };
      })
      .catch((error) => {
        console.error("Error fetching joke:", error);
      });
  }

  // Function to save name to localStorage
  function saveName() {
    const userName = document.getElementById("nameInput").value;
    localStorage.setItem("userName", userName);
    displayName(userName);
  }

  // Function to display user's name on HTML
  function displayName(name) {
    const displayElement = document.getElementById("displayName");
    displayElement.textContent = `User's Name: ${name}`;
  }

  // Function to show welcome alert
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

  // timeClock
  function updateClock() {
    var now = dayjs().format("h:mm A MM-DD-YYYY");
    // Update the content of the clock element
    document.getElementById("timeClock").textContent = now;
  }

  // Call updateClock() immediately to set the initial time
  updateClock();

  // Update the clock every second
  setInterval(updateClock, 1000);
});
