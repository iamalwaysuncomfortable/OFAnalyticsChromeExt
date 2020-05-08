//import collectRecords from "./OF_Finance_Scraper.js";

//<script type="module" src="OF_Finance_Scraper.js"></script>

let collectData = document.getElementById('collectData');

var resultsArray;

collectData.onclick = function(element) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {file: "OF_Finance_Scraper.js"},
        receiveData);
  });
};

function receiveData(resultsArray){
  resultsArray = resultsArray;
}

console.log(resultsArray);