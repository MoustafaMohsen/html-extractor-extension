// Listen for messages
/*
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    // If the received message has the expected format...
    if (msg.text === 'report_back') {
        // Call the specified callback, passing
        // the web-page's DOM content as argument
        sendResponse(document.all[0].outerHTML);
    }
});*/

if ( 
    true
    //document.URL.includes('www.google.com/') 
) 
{
    var msg;
    function htmlToElement(html) {
        var template = document.createElement('templateMy');
        html = html.trim(); // Never return a text node of whitespace as the result
        template.innerHTML = html;
        return template;
    }
    function htmlToDom(tagString){
    tagString;
    var range = document.createRange();
    // make the parent of the first div in the document becomes the context node
    range.selectNode(document.getElementsByTagName("div").item(0));
    return range.createContextualFragment(tagString);
    }
    
    function WhoiToObject(DomElement){
        var rawwhoisData =DomElement.getElementById("registryData");
        var RawWhois = rawwhoisData.textContent
        let domainName = /Domain Name:(.*)/g.exec(RawWhois)[1];
        let Registry_Domain_ID = /Registry Domain ID:(.*)/g.exec(RawWhois)[1];
        let Registrar_WHOIS_Server = /Registrar WHOIS Server:(.*)/g.exec(RawWhois)[1];
        let Registrar_URL = /Registrar URL:(.*)/g.exec(RawWhois)[1];
        let Updated_Date = /Updated Date:(.*)/g.exec(RawWhois)[1];
        let Creation_Date = /Creation Date:(.*)/g.exec(RawWhois)[1];
        let Registry_Expiry_Date = /Registry Expiry Date:(.*)/g.exec(RawWhois)[1];
        let Registrar = /Registrar:(.*)/g.exec(RawWhois)[1];
        let Registrar_IANA_ID = /Registrar IANA ID:(.*)/g.exec(RawWhois)[1];
        let Registrar_Abuse_Contact_Email = /Registrar Abuse Contact Email:(.*)/g.exec(RawWhois)[1];
        let Registrar_Abuse_Contact_Phone = /Registrar Abuse Contact Phone:(.*)/g.exec(RawWhois)[1];
        let Domain_Status = /Domain Status:(.*)/g.exec(RawWhois)[1];
        let DNSSEC = /DNSSEC:(.*)/g.exec(RawWhois)[1];
        let URL_of_the_ICANN_Whois_Inaccuracy_Complaint_Form = /URL of the ICANN Whois Inaccuracy Complaint Form:(.*)/g.exec(RawWhois)[1];
        var whoisDataArray={
            domainName,
            Registry_Domain_ID,
            Registrar_WHOIS_Server,
            Registrar_URL,
            Updated_Date,
            Creation_Date,
            Registry_Expiry_Date,
            Registrar,
            Registrar_IANA_ID,
            Registrar_Abuse_Contact_Email,
            Registrar_Abuse_Contact_Phone,
            Domain_Status,
            DNSSEC,
            URL_of_the_ICANN_Whois_Inaccuracy_Complaint_Form
        }
        return whoisDataArray;
    }
    function receivedMessage(_recivedMsg,sender,sendResponse){
        console.log("receivedMessage");
        if(_recivedMsg.CreateDom == "Create"){
        console.log("Create Dom Recived");
        
        let _msg = _recivedMsg.str;
        console.log(_msg);
        whoisDom=htmlToDom(_msg);
        console.log( htmlToDom("<div>I am a div node</div>") );
        //console.log( WhoiToObject(htmlToDom(_msg)) );
        var object = WhoiToObject(whoisDom);
        console.log( object );
        let MessageTobackground = {sender:"whoisChecker",whoisJson:object};
        chrome.runtime.sendMessage(MessageTobackground);
        }
        if(_recivedMsg.sender == "alert"){
            alert("Whois Has Changed");
            alert("Whois Has Changed");
            alert("Whois Has Changed");
            alert("Whois Has Changed");
            alert("Whois Has Changed");
        }
        
    }
    chrome.runtime.onMessage.addListener(receivedMessage);
}//IF
if(false)
{

console.log("my app works!!?");


var contain = $("div.actualHadithContainer");






var county;

//copy element properties one by one 
var elements = [{}];
var no_number;

for (var i = 0; i < contain.length; i++) {

    myfn(i);

}
elements.shift();
console.log(elements);


//setTimeout(()=>{console.log(no_number);},100)

function myfn(i) {

    county = i;
    var arabicE = contain[i].getElementsByClassName("arabic_hadith_full","arabic")[0];
    var englishE = contain[i].getElementsByClassName("english_hadith_full")[0];
    var refrenceE = contain[i].getElementsByClassName("hadith_reference")[0].getElementsByTagName("tbody")[0];
   // var gradetableE = contain[i].getElementsByClassName("english_grade")[1];
   var tb =[0,1,2]

    //0
        var new_refrence = refrenceE.children[ tb[0] ].children[1].innerText;
        var myRegexp0_1 =/Sahih Muslim ((\d+).*)/g;
        var match0_1=myRegexp0_1.exec(new_refrence)
        var match_number = match0_1[1];
        match_number = match_number.replace(/ /g,'');
    

    /*
    var myRegexp1_2 = /Vol\. (\d+)/g;
    var match1_2 = myRegexp1_2.exec(In_book);
*/      
        /*
        if (!match0_1) {
            tb =[0,0,1]
        }*/
   // if (refrenceE.children[ tb[2] ]) {

       
       var In_book = refrenceE.children[ tb[1] ].children[1].innerText;
       var myRegexp1_1 = /Book (\d+)/g;
       var match1_1 = myRegexp1_1.exec(In_book);
       var myRegexp1_2 = /Hadith (\d+)/g;
       var match1_2 = myRegexp1_2.exec(In_book);

       var old_refrence = refrenceE.children[ tb[2] ].children[1].innerText;
       var myRegexp2_1 = /Book (\d+)/g;
       var match2_1 = myRegexp2_1.exec(old_refrence);
       var myRegexp2_2 = /Hadith (\d+)/g;
       var match2_2 = myRegexp2_2.exec(old_refrence);
       var myRegexp2_3 = /Vol\. (\d+)/g;
       var match2_3 = myRegexp2_3.exec(old_refrence);

  //  }
    /*
    else{
        var In_book = refrenceE.children[ tb[1] ].children[1].innerText;
        var myRegexp1_1 = /Book (\d+)/g;
        var match1_1 = myRegexp1_1.exec(In_book);
        var myRegexp1_2 = /Hadith (\d+)/g;
        var match1_2 = myRegexp1_2.exec(In_book);            

    }*/

    

/*
    if (gradetableE!=null) {
        var new_grad =
        /:[ | ]([A-Z].*)[ | ]\(([A-Z].*)\)/g.exec(gradetableE.innerText)[1]+":"+
        /:[ | ]([A-Z].*)[ | ]\(([A-Z].*)\)/g.exec(gradetableE.innerText)[2];
    }*/

    /*
    if (!match0_1) {
        match_number = match1_2[1] - 3
    }*/

    var all = {
        number: i + 1 + 7156,

        in_book_refrence:{
            book: match1_1?match1_1[1]:null,
            hadith: match1_2?match1_2[1]:null,
            tag:""+match_number
        },
        old_refrence: {
            vol: match2_3?match2_3[1]:0,
            book: match2_1?match2_1[1]:null,
            hadith: match2_2?match2_2[1]:null
        },

        arabicText:arabicE.innerText,
        arabicHTML: arabicE.innerHTML,
        englishText: englishE.innerText,
        englishHTML: englishE.innerHTML,
        grade:""


    }


    elements.push(all);
/*
    if (i == 126 -1) {

        console.log(all);

    }


    this.no_number=!match0_1?"NO NUMBER HADITH":null;
    */
    
}//myfn






// 850kb max
var mySaveText = function(filename, text) {

    var blob = new Blob([text], {type: "text/plain;charset=utf-8"});
    var url = URL.createObjectURL(blob);
    console.log(url);
    


    var a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = filename;
    a.textContent = 'Download file!';
    a.click();
/*
    var myfram = document.createElement('iframe');
    myfram.src = a.href;
    document.body.appendChild(myfram);

    /*    chrome.downloads.download({
        url: url,
        filename: filename // Optional
    });
    file = new BlobBuilder(); //we used to need to check for 'WebKitBlobBuilder' here - but no need anymore
    file.append(text); //populate the file with whatever text it is that you want
    var a = document.createElement('a');
    a.href = window.URL.createObjectURL(file.getBlob('text/plain'));
    a.download = filename; // set the file name
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click(); //this is probably the key - simulatating a click on a download link
    delete a;// we don't need this anymore*/
}

function saveText(filename, text) {
    var tempElem = document.createElement('a');
    tempElem.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    tempElem.setAttribute('download', filename);
    tempElem.click();
 }



//redirect
var Url= document.URL;
var chapter_number = Url.match(/(\d+)/g)[0]
var newUrl = Url.replace(chapter_number, parseInt(chapter_number, 10) + 1)
console.log(newUrl);

if (elements.length > 0) {
    if (!this.no_number) {
        setTimeout(()=>{location.replace(newUrl)},1000)
    }

}
var myStrText=JSON.stringify(elements);
console.log(myStrText);

if (elements.length > 0) {
    //saveText( chapter_number+".json", myStrText);

    mySaveText( chapter_number+".json", myStrText);
}
}//if