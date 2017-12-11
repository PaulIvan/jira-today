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

// custom dateformat function
let formatDate = function(date, offset) {
  const monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"
  ];

  date.setDate(date.getDate() - offset);

  let day = date.getDate();
  let monthIndex = date.getMonth();
  let year = date.getYear().toString().substr(-2);

  return day + '/' + monthNames[monthIndex] + '/' + year + ' ' + '12:00 PM';
};

// Callback function to execute when mutations are observed
let callback = function(mutationsList) {
  for(let mutation of mutationsList) {
    if (mutation.type == 'childList') {
      let dateInputBox = document.getElementById('log-work-date-logged-date-picker');

      if ((dateInputBox !== null) && (!dateInputBox.touched)) {
        //prepare date and custom jira format.
        let date = new Date();
        //update value and set flag.
        dateInputBox.value = formatDate(date, offset);
        dateInputBox.touched = true;
      }
    }
  }
};

// Create an observer instance linked to the callback function
let observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);
