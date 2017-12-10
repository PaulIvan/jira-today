window.onload = function() {
  chrome.storage.sync.get("value", function(items) {
    if (!chrome.runtime.error) {
      document.getElementById("input").value = items.value;
    }
  });
}

document.getElementById("input").onchange = function () {
  let theValue = document.getElementById("input").value;
  // Check that there's some code there.
  if (!theValue) {
    console.log('Error: No value specified');
    return;
  }

  // Save it using the Chrome extension storage API.
  chrome.storage.sync.set({"value": theValue}, function() {
    // Notify that we saved.
    console.log('Settings saved');
  });
}
