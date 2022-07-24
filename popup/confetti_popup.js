/**
 * Listen for clicks on the buttons, and send the appropriate message to
 * the content script in the page.
 */
function listenForClicks() {

  document.addEventListener("click", (e) => {
    function confettify(tabs) {
      if (e.target.id) {
        /*
        browser.tabs.sendMessage(tabs[0].id, {
          command: e.target.id
        });
        */
        chrome.tabs.sendMessage(tabs[0].id, {
          command: e.target.id
        });
        window.close();
      }
    }

    /**
     * Just log the error to the console.
     */
    function reportError(error) {
      console.error(`Could not confettify: ${error}`);
    }

    /**
     * Get the active tab,
     * then call "confettify()".
     */
    if (e.target.classList.contains("confetti-button")) {
      /*
      browser.tabs.query({ active: true, currentWindow: true })
        .then(confettify)
        .catch(reportError);
      */

      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (chrome.runtime.lastError) {
          reportError();
        }
        confettify(tabs);
      });
    }
  });
}

/**
 * There was an error executing the script.
 * Display the popup's error message, and hide the normal UI.
 */
function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(
    `Failed to execute confettify content script: ${error.message}`
  );
}

/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */

/*
browser.tabs.executeScript({ file: "/content_scripts/confettify.js" })
  .then(listenForClicks)
  .catch(reportExecuteScriptError);
*/

chrome.tabs.executeScript(
  { file: "/content_scripts/confettify.js" },
  function () {
    if (chrome.runtime.lastError) {
      reportExecuteScriptError();
    }
    listenForClicks();
    checkActiveStateOfOnClick();
  }
);


// checkActiveStateOfOnClick
function checkActiveStateOfOnClick(){
  browser.tabs.query({
    currentWindow: true,
    active: true
  }).then(sendMessageToTab).catch(onError);
}

const $confettiClick = document.getElementById("confetti-click");

function sendMessageToTab(tabs) {
  browser.tabs.sendMessage(
    tabs[0].id,
    {greeting: "Hi from background script"}
  ).then((response) => {
    console.log("Message from the content script:");
    console.log(response);
    
    if (response) {
      $confettiClick.classList.add("confetti-button--active");
    }

  }).catch(onError);
}

function onError(error) {
  console.error(`Error: ${error}`);
}


// ACCORDION
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}
