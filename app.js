// List of common South African first names
const sellerNames = ["Zoe", "Tshepo", "Mandisa", "Sarah", "Ntombi", "Joe", "Gugu", "Mpho", "Nathan", "Imran", "Emma", "Kayla", "Khathu", "Zamo", "Zama", "Hlukelo", "Dakalo", "Mulalo", "Ayanda", "Dudu", "Jabu", "Musa", "Zandile", "Zodwa", "Thabo", "Cyril", "Kgomotso"];

// Product Search Simulation
function searchProduct() {
    let productName = document.getElementById('product-name').value;
    if (productName) {
        let productList = document.getElementById('product-list');
        productList.innerHTML = ''; // Clear any previous entries
        for (let i = 0; i < 5; i++) {
            let randomSeller = sellerNames[Math.floor(Math.random() * sellerNames.length)];
            let availableItems = Math.floor(Math.random() * 45) + 1;
            let distance = (Math.random() * 9.8 + 0.2).toFixed(1);
            let logistics = getLogistics(distance);
            let price = (Math.random() * 45 + 5).toFixed(2);

            let row = document.createElement('tr');
            row.innerHTML = `
                <td><a href="product-details.html?product=${productName}&seller=${randomSeller}&available=${availableItems}&distance=${distance}&logistics=${logistics}&price=${price}" target="_blank">${productName}</a></td>
                <td>${randomSeller}</td>
                <td>${availableItems}</td>
                <td>${distance}</td>
                <td>${logistics}</td>
                <td>R ${price}</td>
            `;
            productList.appendChild(row);
        }
        document.getElementById('product-table').style.display = 'block';
    }
}

// Determine logistics based on distance
function getLogistics(distance) {
    if (distance <= 2) {
        return "Walk to collect";
    } else if (distance <= 6) {
        return "Free delivery by bicycle";
    } else if (distance <= 10) {
        return "R20 bicycle delivery fee";
    } else {
        return "Independent Corrier Service";
    }
}

// Voice recognition setup
function startVoiceRecognition() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.start();

    recognition.onresult = function(event) {
        const productName = event.results[0][0].transcript;
        document.getElementById('product-name').value = productName;
        searchProduct();
    };
}

// Handle form submission on Product Details page
document.getElementById('payment-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get selected payment methods
    let selectedPayments = [];
    document.querySelectorAll('input[name="payment-method"]:checked').forEach(function(checkbox) {
        selectedPayments.push(checkbox.value);
    });

    // Get product details from URL params
    let urlParams = new URLSearchParams(window.location.search);
    let productDetails = `
        Product: ${urlParams.get('product')}<br>
        Seller: ${urlParams.get('seller')}<br>
        Available: ${urlParams.get('available')}<br>
        Distance: ${urlParams.get('distance')} km<br>
        Logistics: ${urlParams.get('logistics')}<br>
        Price: R ${urlParams.get('price')}
    `;

    // Display summary
    document.getElementById('summary').style.display = 'block';
    document.getElementById('summary-product').innerHTML = urlParams.get('product');
    document.getElementById('summary-seller').innerHTML = urlParams.get('seller');
    document.getElementById('summary-payment').innerHTML = selectedPayments.join(', ');

    // Display product details
    document.getElementById('product-name-detail').innerHTML = urlParams.get('product');
    document.getElementById('seller-name-detail').innerHTML = urlParams.get('seller');
    document.getElementById('available-detail').innerHTML = urlParams.get('available');
    document.getElementById('distance-detail').innerHTML = urlParams.get('distance');
    document.getElementById('logistics-detail').innerHTML = urlParams.get('logistics');
    document.getElementById('price-detail').innerHTML = urlParams.get('price');
});
