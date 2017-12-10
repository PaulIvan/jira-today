//retrieve the saved Offset
let offset = 0;
document.body.onload = function() {
  chrome.storage.sync.get("value", function(items) {
    if ((!chrome.runtime.error) && (items.value > 0)) {
      offset = items.value;
    }
  });
}

// Select the node that will be observed for mutations
let targetNode = document.body;

// Options for the observer (which mutations to observe)
let config = {childList: true};

// Callback function to execute when mutations are observed
let callback = function(mutationsList) {
  for(var mutation of mutationsList) {
    if (mutation.type == 'childList') {
      let dateInputBox = document.getElementById('log-work-date-logged-date-picker');

      if ((dateInputBox !== null) && (!dateInputBox.touched)) {
        //prepare date and custom jira format.
        let date = new Date();

        date.setDate(date.getDate() - offset);
        date.setHours(12);
        date.setMinutes(0);

        let dateOptions = {
          year: '2-digit',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }
        //update value and set flag.
        dateInputBox.value = date.toLocaleDateString('en-GB', dateOptions);
        dateInputBox.touched = true;
      }
    }
  }
};

// Create an observer instance linked to the callback function
let observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);
