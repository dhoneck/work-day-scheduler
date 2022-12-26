// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // Map weekday indices to weekday names
  const DAYS = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };

  // Maps hour with time block element ID
  const TIME_BLOCK_IDS = {
    9: "#hour-9",
    10: "#hour-10",
    11: "#hour-11",
    12: "#hour-12",
    13: "#hour-13",
    14: "#hour-14",
    15: "#hour-15",
    16: "#hour-16",
    17: "#hour-17",
  };

  // Holds time block text
  var timeBlockValues = {
    "hour-9": '',
    "hour-10": '',
    "hour-11": '',
    "hour-12": '',
    "hour-13": '',
    "hour-14": '',
    "hour-15": '',
    "hour-16": '',
    "hour-17": '',
  };

  // Get current day information
  var today = dayjs();
  var weekdayIndex = today.day(); // Gets day as a number - 0 (Sunday) to 6 (Saturday)
  var weekdayName = DAYS[weekdayIndex]; // Store the weekday name
  var month = today.format("MMMM"); // Full name of month
  var currentHour = today.format("H"); // Current hour from 0-23
  var dayOfMonth = today.format("D"); // Non-padded day of month
  var ordinalDayOfMonth = ordinal(dayOfMonth); // Ordinal day of month

  // Grab local storage data
  var savedTimeBlocks = window.localStorage.getItem('timeBlocks');
  if (savedTimeBlocks ) {
    timeBlockValues = JSON.parse(savedTimeBlocks);
    console.log("Saved data found");
  } else {
    console.log("No saved data found");
  }
  console.log(timeBlockValues);

  // Convert cardinal number (e.g. 1, 2, 3, 4) to an ordinal number (1st, 2nd, 3rd, 4th)
  function ordinal(n) {
    var s = ["th", "st", "nd", "rd"];
    var v = n%100;
    return n + (s[(v-20)%10] || s[v] || s[0]);
  }

  // Save text area text to local storage on save button click
  $('.saveBtn').on('click', function() {
    var timeBlockID = this.parentElement.id;
    var textAreaValue = this.previousElementSibling.value;
    timeBlockValues[timeBlockID] = textAreaValue;

    // Set local storage
    window.localStorage.setItem('timeBlocks', JSON.stringify(timeBlockValues));
  });
  
  // Add past, present, or future class to each time block
  for (var hourIdx = 9; hourIdx < 18; hourIdx++) {
    // Grab time-block element
    var elementID = TIME_BLOCK_IDS[hourIdx];
    var timeBlockElement = $(elementID);

    // Assign class to time-block element
    if (currentHour > hourIdx) {
      timeBlockElement.addClass("past");
    } else if (currentHour == hourIdx) {
      timeBlockElement.addClass("present");
    } else if (currentHour < hourIdx) {
      timeBlockElement.addClass("future");
    }
  }

  // Get any user input that was saved in localStorage and set the values of the corresponding textarea elements
  for (var hourIdx = 9; hourIdx < 18; hourIdx++) {
    var timeBlockContent = timeBlockValues['hour-' + hourIdx];
    $('#hour-' + hourIdx + ' > textarea')[0].value = timeBlockContent;
  }

  // Display the current date in the header of the page
  var dateString = weekdayName + ", " + month + " " + ordinalDayOfMonth;
  $('#currentDay').text(dateString);
});
