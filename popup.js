//import collectRecords from "./OF_Finance_Scraper.js";

//<script type="module" src="OF_Finance_Scraper.js"></script>

let collectData = document.querySelector("#collectData");

console.log(collectData);
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
  var email = auth.currentUser.email;
  resultsArray = resultsArray;
  console.log(resultsArray[0]);
  console.log(typeof(resultsArray[0]));
  db.collection('users').doc(email).set(resultsArray[0], {merge: true});
}

