//Capture onlyfans earnings
var dollarRe = /\$([0-9]){1,4}(\.)([0-9]){1,2}/
var yearRe = /20([1,2]{1})([0-9]{1})/

function collectRecords() {
    var records = [];
    if (document.URL === "https://onlyfans.com/my/statements/earnings") {
        var earn_table = document.getElementsByClassName('m-earnings');
        var rows = earn_table[0].getElementsByTagName('tr');

        for (var i = 1, j = rows.length; i < j; ++i) {
            var cells = rows[i].getElementsByTagName('td');
            if (!cells.length) {
                continue;
            }
            var id = "";
            var dateTags = cells[0].getElementsByTagName('span');
            var date = dateTags[0].innerText;
            var time = dateTags[2].innerText;
            var dateTime = new Date(date + time);
            var isoDateTime = dateTime.toISOString();
            var epoch = dateTime.getTime();
            var date = dateTime.toLocaleDateString();
            var time = dateTime.toLocaleTimeString();
            var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            var grossAmt = parseFloat(cells[1].innerText.substring(1,cells[1].innerText.length));
            var fee = parseFloat(cells[2].innerText.substring(1,cells[2].innerText.length));
            var netAmt = parseFloat(cells[3].innerText.substring(1,cells[3].innerText.length));
            var description = cells[4].innerText;
            var whoWhat = description.split(" ");
            var userNickName = "";
            var what = "";
            var user = "";
            if (whoWhat.length >= 3) {
                for (var k = 0; k < whoWhat.length; k++){
                    if ((whoWhat[k] == 'from') || whoWhat[k] == 'to') {
                        break;
                    } else if (what === ''){
                        what = what + whoWhat[k];
                    } else {
                        what = what + " " + whoWhat[k];
                    }

                }

                userNickName = whoWhat[whoWhat.length - 1];
                try {
                    user = cells[4].getElementsByTagName('a')[0].href.split("https://onlyfans.com/")[1]
                } catch(error) {
                    user = "deleted user"
                    userNickName = "deleted user"
                }
            }
            id = what + "_" + String(grossAmt) + "_" + String(epoch);  
            records.push({"gross":grossAmt, "fee":fee, "net":netAmt
            , "type":what, "user":user, "userNickName":userNickName, "date":date, "time":time
            , "tz":timeZone,"isoDate":isoDateTime,"epoch":epoch, "id":id});
        }

    } else if (document.URL === "https://onlyfans.com/my/notifications/tip") {
        var tipRows = document.getElementsByClassName('b-notifications__list__item');
        for (var i = 0; i < tipRows.length; i++) {
            var tipperUserName = "";
            var tipperNickName = "";
            try {
                tipperUsername = tipRows[i].getElementsByClassName('g-user-username')[0].innerText;
                if (tipperUsername[0] = "@") { tipperUsername = tipperUsername.substring(1,tipperUsername.length)}
            } catch (error){
                tipperUserName = "deleted user"
            }
            try {
                tipperNickName = tipRows[i].getElementsByClassName('g-user-name')[0].innerText
            } catch (error){
                tipperNickName = "deleted user"
            }
            var dateTime = tipRows[i].getElementsByClassName('g-date')[0].getElementsByTagName('span')[0].title;
            var year = yearRe.exec(dateTime);
            if (year === null){
                year = String(new Date().getFullYear());
                dateTime = new Date(dateTime + " " + year);
            } else {
                dateTime = new Date(dateTime);
            }
            
            var isoDateTime = dateTime.toISOString();
            var epoch = dateTime.getTime();
            var date = dateTime.toLocaleDateString();
            var time = dateTime.toLocaleTimeString();
            var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            var tippedPostObject = tipRows[i].getElementsByClassName('text-link');
            var tippedPost = "";
            var amount = tipRows[0].innerText;
            amount = parseFloat(dollarRe.exec(amount)[0].substring(1,amount.length));
            if ((typeof(tippedPost) !== 'undefined') && typeof(tippedPost) === "object" && (tippedPost.length > 0)){
                tippedPost = tippedPostObject[0].href;
            }
            records.push({"user":tipperUsername,"userNickName":tipperNickName
            ,"amount":amount,"post":tippedPost,"date":date, "time":time
            , "tz":timeZone,"isoDate":isoDateTime,"epoch":epoch});
        }
    }
    return records;
}

collectRecords();