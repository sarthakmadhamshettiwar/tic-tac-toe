const getQuote = async () => {
    try {
        const res = await fetch("https://dummyjson.com/quotes/random");
        const data = await res.json();
        alert(data.quote);
    } catch (error) {
        console.error("Failed to fetch quote:", error);
        alert("Failed to fetch a quote. Try again!");
    }
}

export {getQuote}