
async function fetchCrypto() {
  const apiUrl = 'https://api.coincap.io/v2/assets';

  try {
    const response = await fetch(apiUrl, { method: 'GET' });

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const data = await response.json();
    return data.data; // Assuming you want the array of assets, adjust as needed
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

// Usage
fetchCrypto()
  .then(assets => {
    renderCryptoData(assets);
  })
  .catch(error => {
    console.error('Error:', error);
  });

  document.addEventListener('DOMContentLoaded', function () {
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

    fetchJoke()
      .then((jokeData) => {
        document.getElementById("jokeTextPlaceholder").innerText =
          jokeData.setup + " " + jokeData.punchline;
      })
      .catch((error) => {
        console.error("Error fetching joke:", error);
      });
      function revealPunchline() {
        fetchJoke()
          .then((jokeData) => {
            const jokeTextPlaceholder = document.getElementById("jokeTextPlaceholder");
            jokeTextPlaceholder.innerText = jokeData.setup;
            
            // Span element for the punchline and to set its style to hidden at start
            const punchlineSpan = document.createElement("span");
            punchlineSpan.innerText = jokeData.punchline;
            punchlineSpan.style.display = "none";
    
            // This appends the punchline span to the placeholder element
            jokeTextPlaceholder.appendChild(punchlineSpan);
    
            // Here you can change the button text as well as set the onclick function to toggle the punchline to show
            const revealButton = document.getElementById("revealButton");
            revealButton.innerText = "Hide Punchline";
            revealButton.onclick = function () {
              punchlineSpan.style.display = punchlineSpan.style.display === "none" ? "inline" : "none";
              revealButton.innerText = punchlineSpan.style.display === "none" ? "Reveal Punchline" : "Hide Punchline";
            };
          })
          .catch((error) => {
            console.error("Error fetching joke:", error);
          });
      }
      revealPunchline();
  });