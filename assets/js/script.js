// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  // Add code to display the current date in the header of the page.

  // Convert cardinal number (e.g. 1, 2, 3, 4) to an ordinal number (1st, 2nd, 3rd, 4th)
  function ordinal(n) {
    var s = ["th", "st", "nd", "rd"];
    var v = n%100;
    return n + (s[(v-20)%10] || s[v] || s[0]);
  };

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

  // Get current day information
  var today = dayjs();
  var weekdayIndex = today.day(); // Gets day as a number - 0 (Sunday) to 6 (Saturday)
  var weekdayName = DAYS[weekdayIndex]; // Changes day number to day name
  var month = today.format("MMMM");
  var dayOfMonth = today.format("D");
  var ordinalDayOfMonth = ordinal(dayOfMonth);

  // Add day information to HTML document
  var dateString = weekdayName + ", " + month + " " + ordinalDayOfMonth
  $('#currentDay').text(dateString);
});
