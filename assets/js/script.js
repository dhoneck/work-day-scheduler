// Wrap all code in a call to jQuery to ensure that HTML loads first
$(function () {

  // Convert cardinal number (1, 2, 3, 4) to an ordinal number (1st, 2nd, 3rd, 4th)
  function ordinal(n) {
    var s = ['th', 'st', 'nd', 'rd'];
    var v = n%100;
    return n + (s[(v-20)%10] || s[v] || s[0]);
  }

  // Store time block text
  var timeBlockData = {
    'hour-9': '',
    'hour-10': '',
    'hour-11': '',
    'hour-12': '',
    'hour-13': '',
    'hour-14': '',
    'hour-15': '',
    'hour-16': '',
    'hour-17': '',
  };

  // Get current day information
  var today = dayjs();
  var weekdayName = today.format('dddd'); // Sunday-Saturday
  var monthName = today.format('MMMM'); // January-December
  var currentHour = today.format('H'); // 0-23
  var dayOfMonth = today.format('D'); // 1-31
  var ordinalDayOfMonth = ordinal(dayOfMonth); // Ordinal day of month
  var dateString = weekdayName + ', ' + monthName + ' ' + ordinalDayOfMonth; // Example: Sunday, January 1st

  // Check for local storage data
  var savedTimeBlocks = window.localStorage.getItem('timeBlocks');
  if (savedTimeBlocks) {
    timeBlockData = JSON.parse(savedTimeBlocks);
    console.log('Saved data found');
    console.log(timeBlockData);
  } else {
    console.log('Saved data not found');
  }

  // Save text area text to local storage on save button click
  $('.saveBtn').on('click', function() {
    var timeBlockID = this.parentElement.id;
    var textAreaValue = this.previousElementSibling.value;
    timeBlockData[timeBlockID] = textAreaValue;

    // Set local storage
    window.localStorage.setItem('timeBlocks', JSON.stringify(timeBlockData));
  });
  
  // Update class and text content for each text block
  for (var hourIdx = 9; hourIdx < 18; hourIdx++) {
    // Grab time block element
    var elementID = '#hour-' + hourIdx;
    var timeBlockElement = $(elementID);

    // Assign past, present, or future class to time block element
    if (currentHour > hourIdx) {
      timeBlockElement.addClass('past');
    } else if (currentHour == hourIdx) {
      timeBlockElement.addClass('present');
    } else if (currentHour < hourIdx) {
      timeBlockElement.addClass('future');
    }

    // Get any user input that was saved in localStorage and set the values of the corresponding textarea elements
    var timeBlockValue = timeBlockData['hour-' + hourIdx];
    $('#hour-' + hourIdx + ' > textarea')[0].value = timeBlockValue;
  }

  // Display the current date in the header of the page
  $('#currentDay').text(dateString);
});
