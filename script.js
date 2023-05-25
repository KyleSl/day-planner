$(function () {
  var dateEl = $('#currentDay');
  var buttons = $('.saveBtn');
  var hours = $('.time-block');
  var clearBtn = $('#clearBtn');

  time();
  var dateUpdater = setInterval(time, 1000);

  populateText();

  function time (){
    var currentDate = new dayjs();
    dateEl.text(currentDate.format('ddd, MMM D - h:mm:ss A'));
    setState(currentDate.format('H') - 4);
  }
  
  function saveData (data){
    localStorage.setItem("data", JSON.stringify(data));
  }
  
  function getData (){
    var data = JSON.parse(localStorage.getItem("data"));
    if(data !== null){
      return data;
    }else{
      return [];
    }
  }

  function setState(hour){
    for(var i = 9; i < 18; i++){
      if(i < hour){
        hours.eq(i - 9).addClass('past');
      }else if(i > hour){
        hours.eq(i - 9).addClass('future');
      }else{
        hours.eq(i - 9).addClass('present');
      }
    }
  }

  buttons.on('click', function (event) {
    var clicked = $(event.target);
    if(clicked.is('i')){
      clicked = clicked.parent();
    }
    var textField = clicked.siblings(".description");
    var text = textField.val();

    var hourClicked = clicked.parent().attr('id');
    hourClicked = hourClicked.substring(hourClicked.length - 2, hourClicked.length);
    console.log(hourClicked);
    
    var data = getData();
    data.push({hour: hourClicked, plan: text});
    saveData(data);
  });

  clearBtn.on('click', function () {
    var reset = [];
    saveData(reset);
    var editEl = $('#hour-09');
    editEl.children('.description').eq(0).text("");
    for(var i = 10; i < 18; i++){
      editEl = $('#hour-' + i);
      editEl.children('.description').eq(0).text("");
    }
  });

  function populateText() {
    var data = getData();
    for(var i = 0; i < data.length; i++){
      var editEl = $('#hour-' + data[i].hour);
      editEl.children('.description').eq(0).text(data[i].plan);
    }
  }
});

