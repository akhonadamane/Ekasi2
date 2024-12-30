const products = [
    "phone - new",
    "phone - second hand",
    "umbhaco",
    "set of ear rings or amacici",
    "Maize meal",
    "Rice",
    "Bread",
    "Cooking oil",
    "Sugar",
    "Tea",
    "coffee",
    "1 litre milk",
    "2 litre milk",
    "Fresh produce (vegetables and fruits)",
    "apples",
    "oranges",
    "bananas",
    "mangoes",
    "pineapples",
    "tomatoes",
    "onion",
    "carrots",
    "spinach",
    "cabbage",
    "Meat and poultry",
    "Cleaning supplies (detergents, soaps)",
    "Toiletries (toothpaste, shampoo, toilet paper)",
    "toilet paper singles",
    "toilet paper 4's",
    "toilet paper 20's",
    "Cooking utensils and basic kitchenware",
    "Soft drinks",
    "Bottled water",
    "Alcoholic beverages (beer, spirits, wine)",
    "Chips",
    "Biscuits",
    "Sweets",
    "chocolates",
    "Hair care products (shampoos, conditioners, hair relaxers)",
    "Skincare products (lotions, creams)",
    "Diapers",
    "Baby food",
    "Baby toiletries",
    "Mobile phones accessories",
    "phone cover",
    "Prepaid airtime and data bundles",
    "Everyday wear",
    "jeans",
    "School uniform"
];

function startVoiceSearch() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";

    recognition.onstart = () => {
        alert("Voice recognition started. Please speak the product name.");
    };

    recognition.onspeechend = () => {
        recognition.stop();
    };

    recognition.onresult = (event) => {
        const userInput = event.results[0][0].transcript.toLowerCase();
        processVoiceInput(userInput);
    };

    recognition.onerror = (err) => {
        alert("Error occurred: " + err.error);
    };

    recognition.start();
}

function processVoiceInput(userInput) {
    const matchedProducts = products.filter((product) => product.toLowerCase().includes(userInput));

    if (matchedProducts.length === 0) {
        alert("Product not available now. The sellers will be notified of your desired product item.");
        return;
    }

    // Redirect to results.html or process the matched product display
    alert("Products found: " + matchedProducts.join(", ")); // Placeholder
}
