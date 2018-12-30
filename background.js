// Regex-pattern to check URLs against. 
// It matches URLs like: http[s]://[...]stackoverflow.com[...]
//var urlRegex = /^https?:\/\/(?:[^./?#]+\.)?stackoverflow\.com/;
var urlRegex = /^https?:\/\/(?:[^\.?#]+\.)?stackoverflow\.com/;
/*
// A function to use as callback
function doStuffWithDom(domContent) {
    console.log('I received the following DOM content:\n' + domContent);
}

// When the browser-action button is clicked...
chrome.browserAction.onClicked.addListener(function (tab) {
    // ...check the URL of the active tab against our pattern and...
    if ( true/*urlRegex.test(tab.url)*/ /*) {
        // ...if it matches, send a message specifying a callback too
        console.log("message Sent");
        
        chrome.tabs.sendMessage(tab.id, {text: 'report_back'}, doStuffWithDom);
    }
});
*/

/*
function sendfunc(tab){
    msg={txtt:"execute"};
    chrome.tabs.sendMessage(tab.id,msg);
}
chrome.browserAction.onClicked.addListener(sendfunc);

chrome.browserAction.onClicked.addListener(function(tab) 
{ 
    console.log(tab.id+' icon clicked');
    //alert(tab.id+' icon clicked'); 
});
*/
function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}
/*
chrome.browserAction.onClicked.addListener( function(tab){

    httpGetAsync("https://www.whois.com/whois/moustafamohsen.com", 
    (v)=>{
        //chrome.runtime.sendMessage( tab.id, v, function (response){} );
        chrome.tabs.sendMessage(tab.id, v)
        console.log(v);
        } );
    } 
);*/

function receivedMessage(msg,sender){
    if(msg.sender==="whoisChecker"){
        let whoischeck = {data:[{}]}
        let WhoisChecker;
        chrome.storage.local.get(['whoischeck'],function(v)
        { 
            WhoisChecker=v.data;
            console.log("The data was Get ");
            console.log(v);
        });

        if( WhoisChecker[1] == msg.whoisJson ){
            whoischeck.data[0] = WhoisChecker[1];
            whoischeck.data[1] = msg.whoisJson
            chrome.storage.local.set(whoischeck, function (v){console.log("the data was Set"); console.log(v) } );

        }

        if (WhoisChecker[1] != msg.whoisJson) {
            alert("Whois Has Changed");
            alert("Whois Has Changed");
            alert("Whois Has Changed");
            alert("Whois Has Changed");
            alert("Whois Has Changed");
            chrome.runtime.sendMessage( {sender: "alert" },function(response) {
                console.log(response);
              } );
            let i = WhoisChecker.length;
            whoischeck.data = WhoisChecker;
            whoischeck.data[i] = msg.whoisJson;
            chrome.storage.local.set(whoischeck, function (v){console.log("the data was Set"); console.log(v) });
        }
    }
}
//chrome.runtime.onMessage.addListener(receivedMessage);
chrome.browserAction.onClicked.addListener( function(tab){
    chrome.runtime.sendMessage( {sender: "alert" },function(response) {
        console.log(response);
      } );
})
/*
setInterval(() => {
    chrome.runtime.sendMessage( {CreateDom: "Create",str:"<div>test</div>"},function(response) {
        console.log(response);
      } );
      /*
    httpGetAsync("https://www.whois.com/whois/moustafamohsen.com", 
    (v)=>{
        //chrome.runtime.sendMessage( tab.id, v, function (response){} );
        chrome.runtime.sendMessage( {CreateDom: "Create",str:v},function(response) {
            console.log(response);
          } );
        console.log(v);
        } );
        */
       /*
}, 1000);

*/

/*
setInterval(() => {
    chrome.runtime.sendMessage( {greeting: "hello"},function(response) {
        console.log(response);
      } );
}, 5000);*/