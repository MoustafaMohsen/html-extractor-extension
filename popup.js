console.log("popup.js");
let inputSwitch = $("#enableSwitch");

let input_locationHost = $("#locationHost")[0];
let input_iframeSelector = $("#iframeSelector")[0];
let input_srcSelector = $("#srcSelector")[0];
let input_nextPageAnchor = $("#nextPageAnchor")[0];

let input_submitBtn = $("#submitBtn")[0];

var iframeSelector = ".fourteen.columns iframe";
var srcSelector = "#video-js_html5_api";
var nextPageAnchor = ".prev-fln .prev-next:nth-child(2) a";
var locationHost = "www.wco.tv";

function syncInputs() {
    chrome.storage.local.get( null, function (items) {
        console.log("syncInputs",items);
        if (items) {
            input_locationHost.value = items['locationHost'] ? items['locationHost'] : locationHost;
            input_iframeSelector.value = items['iframeSelector'] ? items['iframeSelector'] : iframeSelector;
            input_srcSelector.value = items['srcSelector'] ? items['srcSelector'] : srcSelector;
            input_nextPageAnchor.value = items['nextPageAnchor'] ? items['nextPageAnchor'] : nextPageAnchor;
        }
    });
}

function SubmitValues() {
    var values = {
        "locationHost":input_locationHost.value || locationHost,
        "iframeSelector":input_iframeSelector.value || iframeSelector,
        "srcSelector":input_srcSelector.value || srcSelector,
        "nextPageAnchor":input_nextPageAnchor.value ||nextPageAnchor ,
    };
    chrome.storage.local.set(values, function () {
        syncInputs();
        console.log("submitted values",values);
    });
}

function enableExt() {
    chrome.storage.local.set({
        "isExtentionEnabled": true
    }, function () {
        inputSwitch[0].setAttribute("checked", "");
    });
}

function disableExt() {
    chrome.storage.local.set({
        "isExtentionEnabled": false
    }, function () {
        inputSwitch[0].removeAttribute("checked", "");
    });
}

function getValue() {
    console.log("getValue()");
    console.log(chrome.storage.local);

    chrome.storage.local.get( /* String or Array */ ["isExtentionEnabled"], function (items) {
        console.log(items);
        if (items && items['isExtentionEnabled']) {
            inputSwitch[0].setAttribute("checked", "");
        } else {
            console.log("inputSwitch[0].removeAttribute");
            inputSwitch[0].removeAttribute("checked")
        }
    });
}

function toggleExt() {
    console.log("toggleExt()");
    chrome.storage.local.get(null, function (items) {
        console.log(items);
        if (items && items['isExtentionEnabled']) {
            disableExt();
        } else {
            enableExt();
        }
        console.log(items);


    })
}
console.log(inputSwitch);

$(inputSwitch).click(function () {
    console.log("onclick");
    toggleExt();
});

$(input_submitBtn).click(function () {
    console.log("onclick");
    SubmitValues();
});

getValue();

syncInputs();