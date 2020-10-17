console.log("ExtractTextFromWebPager.js");

var arabic = $(".arabic_hadith_full.arabic");
var english = $(".english_hadith_full");
var refrence = $("table.hadith_reference>tbody")
//copy element properties one by one 
var elements =[{}];
for(var i=0;i <arabic.length;i++ ){

  var number_mini_book = refrence[i].children[0].children[1].innerText;
  var match1 = number_mini_book.replace(" : Sahih Muslim ","")

  var new_refrence = refrence[i].children[1].children[1].innerText;
  var myRegexp1_1 = /Book (\d+)/g;
  var match1_1 = myRegexp1_1.exec(new_refrence);
  var myRegexp1_2 = /Hadith (\d+)/g;
  var match1_2 = myRegexp1_2.exec(new_refrence);

  var old_refrence = refrence[i].children[2].children[1].innerText;
  var myRegexp2_1 = /Book (\d+)/g;
  var match2_1 = myRegexp2_1.exec(old_refrence);
  var myRegexp2_2 = /Hadith (\d+)/g;
  var match2_2 = myRegexp2_2.exec(old_refrence);

  var all = 
  {
	number : i + 1 
	
	,
	in_book_refrence:match1,
	mini_new_refrence:{book:match1_1[1],hadith:match1_2[1]},
	old_refrence:{book:match2_1[1],hadith:match2_2[1]},
	
	arabicText: arabic[i].innerText,
	arabicHTML: arabic[i].innerHTML,
	englishText: english[i].innerText,
	englishHTML: english[i].innerHTML,

  }
  
  
  elements.push(all);

}
elements.shift();
console.log(elements);
copy(elements);

//===========TESTING

function Convert_st2DOM(){
  var str2DOMElement = function(html) {
    var frame = document.createElement('iframe');
    frame.style.display = 'none';
    document.body.appendChild(frame);             
    frame.contentDocument.open();
    frame.contentDocument.write(html);
    frame.contentDocument.close();
    var el = frame.contentDocument.body.firstChild;
    document.body.removeChild(frame);
    return el;
  }
  var markup  = '<div><p>text here</p></div>';
  var el = str2DOMElement(markup);
  console.log(el);    
}


function rep(vu) {
  let vy = [];
  vy = vu;
  var Notsliced = true
  for (let index = 0; index < vu.length; index++) {

        let nu =index + 625 +1 ;
        if (index >= 40) {
          vy[index].number--;
        }

    
    }
  return vy;
} 