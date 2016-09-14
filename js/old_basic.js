var formVar = $("#myForm")[0]; // the [0] is to access the DOM first element
var head = $("#header")[0];
var results = $("#resultsParagraph")[0];




function getExchangeRate() {
    //head.innerHTML = "called";

    //document.getElementById("myForm").
    var sel1 = formVar.elements[0].selectedIndex;
    var sel2 = formVar.elements[1].selectedIndex;

    var option1 = formVar.elements[0].options[sel1].value;
    var option2 = formVar.elements[1].options[sel2].value;
    
    var urlString = "http://api.fixer.io/latest?base=" + option1 + "&symbols=" + option2;

    sendRequest(urlString, function(data) {
        //head.innerHTML = JSON.stringify(data);
        
        var convertString = "";

        if (data.rates.AUD != undefined) {
            convertString = data.rates.AUD + " AUD";
        } else if (data.rates.NZD != undefined) {
            convertString = data.rates.NZD + " NZD";
        } else if (data.rates.USD != undefined) {
            convertString = data.rates.USD + " USD";
        } 

        results.innerHTML = "1 " + data.base + " is equal to " + convertString;
    });
}


function sendRequest (urlString, callback) {
    $.ajax({
        url: urlString,
        type: "GET",
        processData: false
    })
        .done(callback)
        .fail(function (error) {
            head.innerHTML = "Sorry, something went wrong. :( Try again later?";
            console.log(error.getAllResponseHeaders());
        });
}