// Listen for messages
console.log("content.js");

var msg;

function htmlToElement(html) {
    var template = document.createElement('templateMy');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template;
}

function htmlToDom(tagString) {
    tagString;
    var range = document.createRange();
    // make the parent of the first div in the document becomes the context node
    range.selectNode(document.getElementsByTagName("div").item(0));
    return range.createContextualFragment(tagString);
}

function WhoiToObject(DomElement) {
    var rawwhoisData = DomElement.getElementById("registryData");
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
    var whoisDataArray = {
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

function receivedMessage(_recivedMsg, sender, sendResponse) {
    console.log("receivedMessage");
    if (_recivedMsg.CreateDom == "Create") {
        console.log("Create Dom Recived");

        let _msg = _recivedMsg.str;
        console.log(_msg);
        whoisDom = htmlToDom(_msg);
        console.log(htmlToDom("<div>I am a div node</div>"));
        //console.log( WhoiToObject(htmlToDom(_msg)) );
        var object = WhoiToObject(whoisDom);
        console.log(object);
        let MessageTobackground = {
            sender: "whoisChecker",
            whoisJson: object
        };
        chrome.runtime.sendMessage(MessageTobackground);
    }
    if (_recivedMsg.sender == "alert") {
        alert("Whois Has Changed");
        alert("Whois Has Changed");
        alert("Whois Has Changed");
        alert("Whois Has Changed");
        alert("Whois Has Changed");
    }

}
chrome.runtime.onMessage.addListener(receivedMessage);

if (false) {

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


    function myfn(i) {

        county = i;
        var arabicE = contain[i].getElementsByClassName("arabic_hadith_full", "arabic")[0];
        var englishE = contain[i].getElementsByClassName("english_hadith_full")[0];
        var refrenceE = contain[i].getElementsByClassName("hadith_reference")[0].getElementsByTagName("tbody")[0];
        // var gradetableE = contain[i].getElementsByClassName("english_grade")[1];
        var tb = [0, 1, 2]

        //0
        var new_refrence = refrenceE.children[tb[0]].children[1].innerText;
        var myRegexp0_1 = /Sahih Muslim ((\d+).*)/g;
        var match0_1 = myRegexp0_1.exec(new_refrence)
        var match_number = match0_1[1];
        match_number = match_number.replace(/ /g, '');



        var In_book = refrenceE.children[tb[1]].children[1].innerText;
        var myRegexp1_1 = /Book (\d+)/g;
        var match1_1 = myRegexp1_1.exec(In_book);
        var myRegexp1_2 = /Hadith (\d+)/g;
        var match1_2 = myRegexp1_2.exec(In_book);

        var old_refrence = refrenceE.children[tb[2]].children[1].innerText;
        var myRegexp2_1 = /Book (\d+)/g;
        var match2_1 = myRegexp2_1.exec(old_refrence);
        var myRegexp2_2 = /Hadith (\d+)/g;
        var match2_2 = myRegexp2_2.exec(old_refrence);
        var myRegexp2_3 = /Vol\. (\d+)/g;
        var match2_3 = myRegexp2_3.exec(old_refrence);


        var all = {
            number: i + 1 + 7156,

            in_book_refrence: {
                book: match1_1 ? match1_1[1] : null,
                hadith: match1_2 ? match1_2[1] : null,
                tag: "" + match_number
            },
            old_refrence: {
                vol: match2_3 ? match2_3[1] : 0,
                book: match2_1 ? match2_1[1] : null,
                hadith: match2_2 ? match2_2[1] : null
            },

            arabicText: arabicE.innerText,
            arabicHTML: arabicE.innerHTML,
            englishText: englishE.innerText,
            englishHTML: englishE.innerHTML,
            grade: ""


        }

        elements.push(all);

    } //myfn






    function saveText(filename, text) {
        var tempElem = document.createElement('a');
        tempElem.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        tempElem.setAttribute('download', filename);
        tempElem.click();
    }



    //redirect
    var Url = document.URL;
    var chapter_number = Url.match(/(\d+)/g)[0]
    var newUrl = Url.replace(chapter_number, parseInt(chapter_number, 10) + 1)
    console.log(newUrl);

    if (elements.length > 0) {
        if (!this.no_number) {
            setTimeout(() => {
                location.replace(newUrl)
            }, 1000)
        }

    }
    var myStrText = JSON.stringify(elements);
    console.log(myStrText);

    if (elements.length > 0) {
        //saveText( chapter_number+".json", myStrText);

        mySaveText(chapter_number + ".json", myStrText);
    }
} //if

// get url from iframe

async function getIframeSrc(selector) {
    console.log("getIframeSrc(" + selector + ")");
    let iframe = $(selector);
    console.log(iframe);
    return iframe?.src ? iframe.src : iframe[0]?.src ? iframe[0].src : false;
}

async function openInNewTab(link) {
    console.log("getLinkFromAnchor(" + link + ")");

    Object.assign(document.createElement('a'), {
        target: '_blank',
        href: link,
    }).click();
}
async function saveFile(url) {
    console.log("saveFile(\"" + url + "\")");
    let filename = $(".video-title h1")[0].textContent.replace(/[^a-zA-Z0-9 –]/g, "");
    var param = {
        url ,
        filename
    };
    chrome.runtime.sendMessage(param);
}

async function getLinkFromAnchor(selector) {
    console.log("getLinkFromAnchor(" + selector + ")");
    let anchor = $(selector);
    return anchor[0].href;
}

async function redirectToUrl(newUrl) {
    console.log("redirectToUrl(" + newUrl + ")");
    location.replace(newUrl)
}

function getTabs() {
    let count = localStorage.getItem('tabs');
    count = count ? count : 1;
    return count;
}

function addTab() {
    let count = getTabs('tabs');
    localStorage.setItem('tabs', parseInt(count) + 1);
    console.log(count);
    return;
}

function shouldContinue(limit = 10) {
    return true;
    let count = getTabs();
    if (count >= limit) {
        return false
    }
    return true;
}

function getInsideIframe(iframeSelector, srcSelector) {
    return new Promise((resolve, reject) => {
        console.log("getInsideIframe(\"" + iframeSelector + "\" ,\"" + srcSelector + "\")");
        let iframe = $(iframeSelector);
        console.log(iframe);
        var loadSrc = ()=>{
            try {
                let src = iframe.contents().find(srcSelector)[0].currentSrc;
                if (src) {
                    resolve(src);
                }else{
                    console.log("no src!");
                    setTimeout(() => {
                        loadSrc()
                    }, 3000);
                }
            } catch (error) {
                console.error(error);
                setTimeout(() => {
                    loadSrc()
                }, 3000);
            }
            
        }
        loadSrc();


    })

}

async function loop() {
    console.log("loop()");
    // get iframe src
    let isShouldContinue = shouldContinue();
    if (isShouldContinue === false) {
        console.log("Limit reached looping again after 5 seconds");
        setTimeout(() => {
            loop();
        }, 5000);
        return;
    }
    addTab();
    let src = await getInsideIframe(iframeSelector, srcSelector);
    console.log("src", src);
    if (src) {
        // open in new tab
        await saveFile(src);
        console.log("saveFile", src);

        // get next page src
        let newUrl = await getLinkFromAnchor(nextPageAnchor);

        // redirect to next page
        await redirectToUrl(newUrl);
        console.log("redirectToUrl", newUrl);

    } else {
        console.log("no src looping and polling again");
        setTimeout(() => {
            loop();
        }, 5000);
    }
}
var iframeSelector = ".fourteen.columns iframe";
var srcSelector = "#video-js_html5_api";
var nextPageAnchor = ".prev-fln .prev-next:nth-child(2) a";
var locationHost = "www.wco.tv";
chrome.storage.local.get(["isExtentionEnabled","iframeSelector","srcSelector","nextPageAnchor","locationHost"], function(items){
    console.log(items);
    if (items&&items['isExtentionEnabled']) {
        // set inputs
        iframeSelector = items['iframeSelector']?items['iframeSelector']:iframeSelector
        srcSelector = items['srcSelector']?items['srcSelector']:srcSelector
        nextPageAnchor = items['nextPageAnchor']?items['nextPageAnchor']:nextPageAnchor
        locationHost = items['locationHost']?items['locationHost']:locationHost

        // run loop
        $(function () {
            console.log(window.location.host);
            if (window.location.host == locationHost) {
                console.log("Executing loop() ...");
                loop();
            }
        })
    }
})
