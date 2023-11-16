// Function to fetch cryptocurrency data
async function fetchCrypto() {
  const apiUrl = 'https://api.coincap.io/v2/assets';

  try {
    const response = await fetch(apiUrl, { method: 'GET' });

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    throw error;
  }
}

// Function to render crypto data on the HTML page
function renderCryptoData(cryptoData) {
  const cryptoDataContainer = document.getElementById('cryptoDataContainer');

  // Clear previous content
  cryptoDataContainer.innerHTML = '';

  // Check if cryptoData is defined and has a length property
  if (cryptoData && cryptoData.length > 0) {
    const asset = cryptoData[0]; // Displaying the first asset

    const item = document.createElement('div');
    item.innerHTML = `
      <p>Name: ${asset.name}</p>
      <p>Symbol: ${asset.symbol} ₿ </p>
      <p>Price (USD): ${asset.priceUsd} </p>
    `;

    cryptoDataContainer.appendChild(item);
  } else {
    // Display a message if there are no assets or if cryptoData is undefined
    cryptoDataContainer.textContent = 'No crypto data available.';
  }
}

// Function to fetch a joke
function fetchJoke() {
  const apiUrl = "https://official-joke-api.appspot.com/random_joke";
  return fetch(apiUrl, {
    method: "GET"
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
}

document.addEventListener('DOMContentLoaded', async function () {
  try {
    const cryptoData = await fetchCrypto();
    renderCryptoData(cryptoData);
  } catch (error) {
    console.error('Error fetching crypto data:', error);
  }

  const apiUrl = "https://official-joke-api.appspot.com/random_joke";
  try {
    const jokeData = await fetchJoke();
    document.getElementById("jokeTextPlaceholder").innerText = jokeData.setup + " " + jokeData.punchline;
  } catch (error) {
    console.error("Error fetching joke:", error);
  }

  function revealPunchline() {
    fetchJoke()
      .then((jokeData) => {
        const jokeTextPlaceholder = document.getElementById("jokeTextPlaceholder");
        const setupParagraph = document.createElement("p");
        setupParagraph.textContent = jokeData.setup;
  
        const punchlineParagraph = document.createElement("p");
        punchlineParagraph.textContent = jokeData.punchline;
        punchlineParagraph.style.display = "none";
  
        jokeTextPlaceholder.innerHTML = '';
        jokeTextPlaceholder.appendChild(setupParagraph);
        jokeTextPlaceholder.appendChild(punchlineParagraph);
  
        const revealButton = document.getElementById("revealButton");
        revealButton.innerText = "Reveal Punchline";
        revealButton.onclick = function () {
          punchlineParagraph.style.display = punchlineParagraph.style.display === "none" ? "block" : "none";
          revealButton.innerText = punchlineParagraph.style.display === "none" ? "Reveal Punchline" : "Hide Punchline";
        };
      })
      .catch((error) => {
        console.error("Error fetching joke:", error);
      });
  }

  // Call revealPunchline immediately after the page loads
  revealPunchline();
});

// Update the clock every second
function updateClock() {
  var now = dayjs().format('HH:mm:ss');
  // Update the content of the clock element
  document.getElementById('timeClock').textContent = now;
}

// Call updateClock() immediately to set the initial time
updateClock();

// Update the clock every second
setInterval(updateClock, 1000);

