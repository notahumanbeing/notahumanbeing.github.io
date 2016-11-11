$(document).ready(function() {
  var url = "https://github.com/lina";

  $.ajaxPrefilter( function (options) {
    if (options.crossDomain && jQuery.support.cors) {
      var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
      options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
    }
  });
  $.get(
      url,
      function (response) {
          $("#viewer").html(response);
          getMeWhatIWant();
  });
});

var getToday = function() {
  var today = new Date(); var dd = today.getDate(); var mm = today.getMonth()+1;  var yyyy = today.getFullYear(); if(dd<10) { dd='0'+dd } if(mm<10) { mm='0'+mm } today = yyyy+'-'+mm+'-'+dd;
  return today;
}

var getMeWhatIWant = function(response) {
  var allG = document.querySelectorAll("g");
  console.log("allG:" + allG);
  var gLeng = allG.length;
  console.log("gLeng:" + gLeng);
  var targetG = allG[gLeng-1];
  console.log("targetG:" + targetG);
  var gChildCount = targetG.children.length;
  console.log("gChildCount:" + gChildCount);
  
  var todayDateString = getToday();
  for (var ii = 0 ; ii < gChildCount*2; ii++) {
    var targetRect = targetG.childNodes[ii];
    var objstring = targetRect.toString();
    if(objstring.indexOf("SVGRectElement") > -1) {
      var date = targetRect.getAttribute("data-date");
      if(date == todayDateString) {
        console.log("date:" + date);
        var contributions = targetRect.getAttribute("data-count");
        console.log("contributions:" + contributions);
        $("#viewer").html("");
        $("#contributions").html(0);
        globcontributions = contributions;
        console.log("globcontributions:" + globcontributions);
        setTimeout(showCountUp, 500);
        return;
      }
    }
  }
}

var intevalId;
var currVal = 0;
var globcontributions;

var showCountUp = function() {
  intevalId = setInterval(appendVal, 50);
}

var appendVal = function() {
  $("#contributions").html(currVal);
  currVal++;
  if(currVal > parseInt(globcontributions)) {
    clearInterval(intevalId);
  }
}


// var pageLoadWait = 20;
// var timeGap = 300;

// var message = 'buy this domain. ';
// var extraTimeToAdd = message.length * 100 + pageLoadWait;

// var displaymessage = function() {
//     messageArray = stringFactoryForIndividLetterDisplay(message, timeGap);
//     showElementInArrayIndividually(messageArray, extraTimeToAdd);
// };


// var showElementInArrayIndividually = function(array, extraTimeAdded) {
//  var extraTimeAdded = extraTimeAdded || 0;
//  var messageNode = document.getElementById("message");

//  for (var ii = 0 ; ii < array.length; ii++) {
//     var currentIndex = array[ii].currentIndex;
//     setTimeout(function () {
//      var currentIndex = this; 
//      // array
//      messageNode.innerHTML = messageNode.innerHTML + array[currentIndex].letter;
//    }.bind(currentIndex), array[ii].timeoutVal + extraTimeAdded);
//  }
// };

// var stringFactoryForIndividLetterDisplay = function(string, timeGap) {
//  var defaultTimeGap = timeGap || 100;
//  var extraTimeGap = 0;
//  var timeCount = 0, timeToWait, primaryTimGap;

//  var resultsArray = [];
//  for (var ii = 0 ; ii < string.length; ii++) {

//    if(string[ii] === " ") {
//      extraTimeGap = 50;
//    }

//    primaryTimeGap = Math.round(defaultTimeGap/2 + (Math.random()*(defaultTimeGap - defaultTimeGap/2)));

//    console.log("primaryTimeGap", primaryTimeGap);

//    timeToWait = primaryTimeGap + extraTimeGap + 1;
//   var letterObj = {
//     letter: string[ii],
//     timeoutVal: timeCount + timeToWait,
//     currentIndex: ii
//   };

//   timeCount += timeToWait;
//   resultsArray.push(letterObj);
//  }
//  return resultsArray;
// };

// displaymessage();