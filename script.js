$(function () {
  // Initial jQuery grabs
  var dateEl = $('#currentDay');
  var buttons = $('.saveBtn');  // array
  var hours = $('.time-block'); // array
  var clearBtn = $('#clearBtn');

  // Start timer
  time();
  var dateUpdater = setInterval(time, 1000);

  // Populate text boxes using localStorage data
  populateText();

  // Updates the date every second as well as updating the colors of the time boxes
  function time (){
    var currentDate = new dayjs();
    dateEl.text(currentDate.format('ddd, MMM D - h:mm:ss A'));
    setState(currentDate.format('H')); // update colors
  }
  
  // Pushes the data parameter to the localStorage
  function saveData (data){
    localStorage.setItem("data", JSON.stringify(data));
  }
  
  // Pulls "data" from localStorage or returns an empty array if "data" doesn't exist
  function getData (){
    var data = JSON.parse(localStorage.getItem("data"));
    if(data !== null){
      return data;
    }else{
      return [];
    }
  }

  // Updates the colors of the boxes using the current hour
  // classes "past", "present", and "future" have styling in style.css
  function setState(hour){
    for(var i = 9; i < 18; i++){ // iterate from hours 9 - 17
      if(i < hour){
        hours.eq(i - 9).removeClass('present future'); // remove old classes
        hours.eq(i - 9).addClass('past'); // add class
      }else if(i > hour){
        hours.eq(i - 9).removeClass('past present');
        hours.eq(i - 9).addClass('future');
      }else{
        hours.eq(i - 9).removeClass('past future');
        hours.eq(i - 9).addClass('present');
      }
    }
  }

  // Event handler for save buttons
  buttons.on('click', function (event) {
    var clicked = $(event.target);
    if(clicked.is('i')){ // if user clicks on the save icon, this changes the clicked element to the button
      clicked = clicked.parent();
    }

    // Get text from the corresponding field
    var textField = clicked.siblings(".description");
    var text = textField.val();

    // Get the hour that corresponds to the button that was pressed
    var hourClicked = clicked.parent().attr('id');
    hourClicked = hourClicked.substring(hourClicked.length - 2, hourClicked.length); // Formats so its only the last 2 characters (09 - 17)
    // console.log(hourClicked);
    
    // Update localStorage
    var data = getData(); 
    data.push({hour: hourClicked, plan: text});
    saveData(data);
  });

  // Event handler for the clear button
  // Empties localStorage and clears all of the text boxes
  clearBtn.on('click', function () {
    var reset = [];
    saveData(reset);

    // Separate from the for loop because of "09" instead of "9"
    var editEl = $('#hour-09');
    editEl.children('.description').eq(0).text("");

    for(var i = 10; i < 18; i++){
      editEl = $('#hour-' + i);
      editEl.children('.description').eq(0).text("");
    }
  });

  // Uses localStorage to set the text on the page
  function populateText() {
    var data = getData();

    for(var i = 0; i < data.length; i++){
      var editEl = $('#hour-' + data[i].hour); // Searches for the correct id using string incantation
      editEl.children('.description').eq(0).text(data[i].plan); // Updates the text on the correct child
    }
  }
});

