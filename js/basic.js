var formVar = $("#myForm")[0]; // the [0] is to access the DOM first element
var head = $("#header")[0];
var results = $("#resultsParagraph")[0];


function getExchangeRate() {
    //head.innerHTML = "called";

    var sel1 = formVar.elements[0].selectedIndex;
    var sel2 = formVar.elements[1].selectedIndex;

    var option1 = formVar.elements[0].options[sel1].value;
    var option2 = formVar.elements[1].options[sel2].value;
    
    //var urlString = "http://api.fixer.io/latest?base=" + option1 + "&symbols=" + option2;

   sendRequest(option1, option2, function(data) {
        //head.innerHTML = JSON.stringify(data);
        
        var convertString = "ERROR";

        if (data.rates.AUD != undefined) {
            convertString = data.rates.AUD + " AUD";
        } else if (data.rates.CAD != undefined) {
            convertString = data.rates.CAD + " CAD";
        } else if (data.rates.CHF != undefined) {
            convertString = data.rates.CHF + " CHF";
        } else if (data.rates.CNY != undefined) {
            convertString = data.rates.CNY + " CNY";
        } else if (data.rates.EUR != undefined) {
            convertString = data.rates.EUR + " EUR";
        } else if (data.rates.GBP != undefined) {
            convertString = data.rates.GBP + " GBP";
        } else if (data.rates.HKD != undefined) {
            convertString = data.rates.HKD + " HKD";
        } else if (data.rates.JPY != undefined) {
            convertString = data.rates.JPY + " JPY";
        } else if (data.rates.KRW != undefined) {
            convertString = data.rates.KRW + " KRW";
        } else if (data.rates.MXN != undefined) {
            convertString = data.rates.MXN + " MXN";
        } else if (data.rates.NOK != undefined) {
            convertString = data.rates.NOK + " NOK";
        } else if (data.rates.NZD != undefined) {
            convertString = data.rates.NZD + " NZD";
        } else if (data.rates.SEK != undefined) {
            convertString = data.rates.SEK + " SEK";
        } else if (data.rates.SGD != undefined) {
            convertString = data.rates.SGD + " SGD";
        } else if (data.rates.USD != undefined) {
            convertString = data.rates.USD + " USD";
        } else {
            convertString = "1 " + data.base;
        }

        results.innerHTML = "1 " + data.base + " is equal to " + convertString +
            "<br>The data was last updated on " + data.date;
    });
}

function minRequest(urlString, callback) {
    //results.innerHTML = "Getting data from " + urlString;
    $.getJSON(urlString, callback);
}

function sendRequest (option1, option2, callback) {
    results.innerHTML = "getting data";
    $.ajax({
        url: "http://api.fixer.io/latest?base=" + option1 + "&symbols=" + option2,
        type: "GET",
        processData: false
    })
        .done(function(data) {
            callback(data);
        })
        .fail(function (error) {
            head.innerHTML = "Sorry, something went wrong. :( Try again later?";
            //results.innerHTML = urlString;
            console.log(error.getAllResponseHeaders());
        });
}