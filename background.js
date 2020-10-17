console.log("background.js");
chrome.runtime.onMessage.addListener(
    function(arg, sender, sendResponse) {
        console.log("arg",arg)
        try {
             chrome.downloads.download({
             url: arg.url,
             filename: arg.filename + ".mp4",
            saveAs: false
            });
        } catch (error) {
            console.log(error)
            console.log(arg)
        }
     }
);