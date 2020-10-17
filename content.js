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
