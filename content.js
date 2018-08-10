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

if (document.URL.includes('bukhari')) 
{

console.log("my app works!!?");
var arabic = $(".arabic_hadith_full.arabic");
var english = $(".english_hadith_full");
var refrence = $("table.hadith_reference>tbody")
//copy element properties one by one 
var elements = [{}];
for (var i = 0; i < arabic.length; i++) {


    var new_refrence = refrence[i].children[0].children[1].innerText;
    var myRegexp1 = /Sahih al-Bukhari (\d+)/g;
    var match_number = myRegexp1.exec(new_refrence);

    var In_book = refrence[i].children[1].children[1].innerText;
    var myRegexp1_1 = /Book (\d+)/g;
    var match1_1 = myRegexp1_1.exec(In_book);
    var myRegexp1_2 = /Hadith (\d+)/g;
    var match1_2 = myRegexp1_2.exec(In_book);


    var old_refrence = refrence[i].children[2].children[1].innerText;
    var myRegexp2_1 = /Book (\d+)/g;
    var match2_1 = myRegexp2_1.exec(old_refrence);
    var myRegexp2_2 = /Hadith (\d+)/g;
    var match2_2 = myRegexp2_2.exec(old_refrence);
    var myRegexp2_3 = /Vol\. (\d+)/g;
    var match2_3 = myRegexp2_3.exec(old_refrence);

    var all = {
        number: match_number[1],

        in_book_refrence:{
            book: match1_1[1],
            hadith: match1_2[1]
        },
        old_refrence: {
            vol: match2_3[1],
            book: match2_1[1],
            hadith: match2_2[1]
        },

        arabicText: arabic[i].innerText,
        arabicHTML: arabic[i].innerHTML,
        englishText: english[i].innerText,
        englishHTML: english[i].innerHTML,

    }


    elements.push(all);

}
elements.shift();
//console.log(elements);

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
    setTimeout(()=>{location.replace(newUrl)},3000)
}
var myStrText=JSON.stringify(elements);
if (elements.length > 0) {
    saveText( chapter_number+".json", myStrText);
}




 function copyTextToClipboard(text) {
    //Create a textbox field where we can insert text to. 
    var copyFrom = document.createElement("textarea");
  
    //Set the text content to be the text you wished to copy.
    copyFrom.textContent = text;
  
    //Append the textbox field into the body as a child. 
    //"execCommand()" only works when there exists selected text, and the text is inside 
    //document.body (meaning the text is part of a valid rendered HTML element).
    document.body.appendChild(copyFrom);
  
    //Select all the text!
    copyFrom.select();
  
    //Execute command
    document.execCommand('copy');
  
    //(Optional) De-select the text using blur(). 
    copyFrom.blur();
  
    //Remove the textbox field from the document.body, so no other JavaScript nor 
    //other elements can get access to this.
    document.body.removeChild(copyFrom);
  }
  



}//if