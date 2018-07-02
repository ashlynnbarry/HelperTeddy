
/**
 * Responds to the dropdown menu by directing the current tab 
 * to common Brown University web destinations through those
 * destinations' login pages and referrers when necessary.
 * 
 * show*() functions run upon clicks on the dropdown to navigate
 * through the selected destination's respective path.
 */


chrome.runtime.onMessage.addListener(function(request,sender,sendResponse) {
  if( request.action === "1" )
  {
    showTranscript();       
  } else if (request.action === "2") {
    showSchedule();
  } else if (request.action === "3") {
    showCanvas();
  } else if (request.action === "4") {
    showHandshake();
  } else if (request.action === "5") {
    showMenu();
  } else if (request.action === "6") {
    showMarket();
  } else if (request.action === "7") {
    showMemes();
  } else if (request.action === "8") {
    showNews();
  } else if (request.action === "9") {
    showEvents();
  } else if (request.action === "10") {
    showAddDrop();
  } else if (request.action === "11") {
    showOCRA();
  } else if (request.action === "12") {
    showEngage();
  } else if (request.action === "911") {
    showEmergency();
  }});

chrome.browserAction.onClicked.addListener(function() {showTranscript();});

function tryNavigate(url) {
  chrome.tabs.query({'active': true}, function(tabs) {
    var tab = tabs[0];
    if (tab.url != url) {
      chrome.tabs.executeScript(tab.id, 
        {code: "window.location = '" + url + "';", runAt:"document_idle"});
    } else {

    }
  });
}

function waitUntilLand(urls, callback) {
  chrome.tabs.query({'active': true}, function(tabs) {
    var tab = tabs[0];
    if (urls.some((url) => tab.url.startsWith(url))) {
      callback();
      console.log('callback here');
    } else {
      console.log('waiting', tab.url);
      waitUntilLand(urls, callback);
    }
  });
}

function showTranscript(){
  chrome.tabs.query({'active': true}, function(tabs) {
    chrome.tabs.update(tabs[0].id,
      {url: 'https://selfservice.brown.edu/ss/twbkwbis.P_WWWLogin', active: true, selected: true},
      function(tab) {
              console.log("in tabs.update callback");
              waitUntilLand(['https://selfservice.brown.edu/ss/twbkwbis.P_GenMenu?name=bmenu.P_MainMnu'],
                function() {
                  console.log("in waitUntilLand callback");
                  tryNavigate('https://selfservice.brown.edu/ss/swp_internal_acad_record.p_Stud_IAR');});
            });
  });
}

function showAddDrop(){
  chrome.tabs.query({'active': true}, function(tabs) {
    chrome.tabs.update(tabs[0].id,
      {url: 'https://selfservice.brown.edu/ss/twbkwbis.P_WWWLogin', active: true, selected: true},
      function(tab) {
        console.log("in tabs.update callback");
        waitUntilLand(['https://selfservice.brown.edu/ss/twbkwbis.P_GenMenu?name=bmenu.P_MainMnu'],
          function() {
            console.log("in waitUntilLand callback");
            tryNavigate('https://selfservice.brown.edu/ss/bwskfreg.P_AltPin');
            waitUntilLand(['https://selfservice.brown.edu/ss/bwskfreg.P_AltPin'], 
              function(){chrome.tabs.executeScript(tab.id,
                {code:'document.querySelector("body > div.pagebodydiv > form > input[type=submit]").click();'});});
          });
      });
  });
}

function showSchedule(){
  chrome.tabs.query({'active': true}, function(tabs) {
    chrome.tabs.update(tabs[0].id,
      {url: 'https://cab.brown.edu/', active: true, selected: true},
      function(tab) {
        console.log("in tabs.update callback");
        setTimeout(function(){waitUntilLand(['https://cab.brown.edu/'],
          function() {chrome.tabs.executeScript(tab.id,
            {code:'document.querySelector("#qs-form > fieldset.non-faculty > div:nth-child(3) > button").click();'});})},1000);
        setTimeout(function(){chrome.tabs.executeScript(tab.id,
          {code:'document.querySelector("#panel-container > div.panel.active > section > div.panel-head.scrollbar-sized > div.icons.icons-right > a").click();'});}, 3000);
      });
  });
}

function showHandshake(){
  chrome.tabs.query({'active': true}, function(tabs) {
    chrome.tabs.update(tabs[0].id,
      {url: 'https://brown.joinhandshake.com/login', active: true, selected: true},
      function(tab) {
        console.log("in tabs.update callback");
        waitUntilLand(['https://brown.joinhandshake.com/login',
         'https://brown.joinhandshake.com/',
         'https://brown.joinhandshake.com/login?requested_authentication_method=standard'],
         function() {
          console.log("in showHandhake waitUntilLand callback");
          setTimeout(function(){chrome.tabs.executeScript(tab.id,
            {code:'document.querySelector("#main > div.login-container > div.login > div.login-main > a > div.login__btn-primary__text").click();'});},1000);
          setTimeout(function(){chrome.tabs.executeScript(tab.id,
            {code:'document.querySelector("#main > div.login-container > div.login > div.login-main > form > a > div.login__btn-primary__text").click();'});},1000);});

        console.log("in waitUntilLand callback");});
  });
}

function showMenu(){
  chrome.tabs.query({'active': true}, function(tabs) {
    chrome.tabs.update(tabs[0].id,
      {url: 'https://m.brown.edu/campus-life/dining/dining-menus', active: true, selected: true});
  });
}

function showMarket(){
  chrome.tabs.query({'active': true}, function(tabs) {
    chrome.tabs.update(tabs[0].id,
      {url: 'https://www.facebook.com/groups/BrownBuyingNSelling/', active: true, selected: true});
  });
}

function showMemes(){
  chrome.tabs.query({'active': true}, function(tabs) {
    chrome.tabs.update(tabs[0].id,
      {url: 'https://www.facebook.com/groups/BrownDankStashofMemes/', active: true, selected: true});
  });
}

function showNews(){
  chrome.tabs.query({'active': true}, function(tabs) {
    chrome.tabs.update(tabs[0].id,
      {url: 'http://www.browndailyherald.com/', active: true, selected: true});
  });
}

function showEvents(){
  chrome.tabs.query({'active': true}, function(tabs) {
    chrome.tabs.update(tabs[0].id,
      {url: 'https://news.brown.edu/events', active: true, selected: true});
  });
}

function showOCRA(){
  chrome.tabs.query({'active': true}, function(tabs) {
    chrome.tabs.update(tabs[0].id,
      {url: 'https://library.brown.edu/reserves/student/index.php', active: true, selected: true}
    );
  });
}

function showEngage(){
  chrome.tabs.query({'active': true}, function(tabs) {
    chrome.tabs.update(tabs[0].id,
      {url: 'https://www.givepulse.com/group/115516-Brown+University+%26+Swearer+Center', active: true, selected: true},
      function(tab) {
        console.log("in tabs.update callback");
        setTimeout(function(){waitUntilLand(['https://www.givepulse.com/group/115516-Brown+University+%26+Swearer+Center'],
          function() {chrome.tabs.executeScript(tab.id,
            {code:'document.querySelector("#yw5 > li:nth-child(5) > a").click();'});})},1000);
        setTimeout(function(){chrome.tabs.executeScript(tab.id,
          {code:'document.querySelector("#loginDiv > a").click();'});}, 3000);
      });
  });
}

function showEmergency(){
  chrome.tabs.query({'active': true}, function(tabs) {
    chrome.tabs.update(tabs[0].id,
      {url: 'http://emergency.brown.edu/', active: true, selected: true});
  });
}

function showCanvas(){
  chrome.tabs.query({'active': true}, function(tabs) {
    chrome.tabs.update(tabs[0].id,
      {url: 'http://canvas.brown.edu/', active: true, selected: true});
  });
}