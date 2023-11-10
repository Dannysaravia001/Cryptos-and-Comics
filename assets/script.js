
function fetchJoke() {
  const apiUrl = 'https://official-joke-api.appspot.com/random_joke';
  return fetch(apiUrl, { method: 'GET' })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      throw error;
    });
}
// Usage
fetchJoke()
  .then(quoteData => {
    console.log(quoteData);
  })
  .catch(error => {
    console.error('Error:', error);
  });

  
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
  
  // Usage for a specific asset (e.g., Bitcoin)
  const targetAssetName = 'Bitcoin';
  
  fetchCrypto()
    .then(assets => {
      const bitcoin = assets.find(asset => asset.name === targetAssetName);
  
      if (bitcoin) {
        const item = {
          name: bitcoin.name,
          symbol: bitcoin.symbol,
          stats: [],
        };
  
        if (bitcoin.stats && Array.isArray(bitcoin.stats)) {
          bitcoin.stats.forEach(stat => {
            item.stats.push(stat.name);
          });
        }
  
        console.log(item);
      } else {
        console.error(`Error: ${targetAssetName} not found.`);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });

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
    
 // Function to extract the priceUsd from the stats array
function getPriceUsd(stats) {
  if (Array.isArray(stats)) {
    const priceUsdStat = stats.find(stat => stat.name === 'priceUsd');
    return priceUsdStat ? priceUsdStat.value : 'N/A';
  } else {
    return 'N/A';
  }
}

// Function to render crypto data on the HTML page
function renderCryptoData(cryptoData) {
  const cryptoDataContainer = document.getElementById('cryptoDataContainer');

  // Check if there's at least one asset
  if (cryptoData.length > 0) {
    const asset = cryptoData[0]; // Displaying the first asset

    const item = document.createElement('div');
    item.innerHTML = `
      <p>Name: ${asset.name}</p>
      <p>Symbol: ${asset.symbol}</p>
      <p>Price (USD): ${getPriceUsd(asset.priceUsd)}</p>
      <hr>
    `;

    cryptoDataContainer.appendChild(item);
  } else {
    // Display a message if there are no assets
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