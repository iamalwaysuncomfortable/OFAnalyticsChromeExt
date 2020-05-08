myHeader = document.getElementById("popupTitle");

if (document.URL === "https://onlyfans.com/my/notifications/tip"){
    myHeader.innerHTML = "Collect Tip Data";
} else if (document.URL === "https://onlyfans.com/my/statements/earnings") {
    myHeader.innerHTML= "Collect Earnings Data";
}