var s = document.createElement('script');
s.src = chrome.extension.getURL('injects/dice.js');
(document.head||document.documentElement).appendChild(s);
s.onload = function() {
    s.parentNode.removeChild(s);
};
chrome.runtime.sendMessage({
      action : 'dice'
});