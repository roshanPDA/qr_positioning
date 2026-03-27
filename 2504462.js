const reader = new Html5Qrcode("camera");

let scannerOn = false;

function toggleScanner() {
  scannerOn = !scannerOn;
  if (scannerOn) {
    startScanner();
    mapContainer.style.display = "none";
    btn.innerText = "CANCEL";
  } else {
    stopScanner();
    mapContainer.style.display = "block";
    btn.innerText = "SCAN";
  }
}

function startScanner() {
  reader
    .start({ facingMode: "environment" }, {}, function (text) {
      const place = JSON.parse(text);
      showMarkerAt(place.top, place.left);
      showInventory(place.name, place.price, place.inStock); //adding inventory details to json
      toggleScanner();
    })
    .catch(function (err) {
      console.error(err);
    });
}

function stopScanner() {
  reader.stop();
}

function showMarkerAt(top, left) {
  marker.style.top = top;
  marker.style.left = left;
}

// Function to display inventory details
function showInventory(name, price, inStock) {
  // Get references to HTML elements
  const inventory = document.getElementById("inventory");
  const itemName = document.getElementById("itemName");
  const itemStock = document.getElementById("itemStock");
  const itemPrice = document.getElementById("itemPrice");

  inventory.style.display = "block"; // Make the inventory section visible

  itemName.textContent = "Item Name: " + name; 
  itemStock.textContent = "Available in Store: " + (inStock ? "Yes" : "No");
  itemPrice.textContent = "Item Price: €" + price.toFixed(2);
}
