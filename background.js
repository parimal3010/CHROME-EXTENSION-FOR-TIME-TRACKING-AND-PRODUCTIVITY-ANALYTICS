let currentDomain = "";
let startTime = Date.now();

function sendTimeData(domain, timeSpent) {
    fetch("http://localhost:3000/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain, timeSpent })
    })
    .then(res => console.log("Data sent:", domain, timeSpent))
    .catch(err => console.error("Failed to send data", err));
}

function getDomain(url) {
    try {
        return new URL(url).hostname;
    } catch {
        return "unknown";
    }
}

chrome.tabs.onActivated.addListener(async (activeInfo) => {
    const tab = await chrome.tabs.get(activeInfo.tabId);
    const newDomain = getDomain(tab.url);

    const endTime = Date.now();
    const timeSpent = Math.floor((endTime - startTime) / 1000); // in seconds

    if (currentDomain && currentDomain !== "unknown") {
        sendTimeData(currentDomain, timeSpent);
    }

    currentDomain = newDomain;
    startTime = Date.now();
});
