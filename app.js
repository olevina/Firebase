var config = {
    apiKey: "AIzaSyCUwtjLgZo5nTMSERtahpxYgLQK8nB-ybk",
    authDomain: "train-scheduler-58144.firebaseapp.com",
    databaseURL: "https://train-scheduler-58144.firebaseio.com",
    projectId: "train-scheduler-58144",
    storageBucket: "train-scheduler-58144.appspot.com",
    messagingSenderId: "75802218402"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

$("#add-train").on("click", function (event) {

    event.preventDefault();

    var trainName = $("#train-name").val().trim();
    var trainDestination = $("#train-destination").val().trim();
    var trainTime = $("#train-time").val().trim();
    var trainFrequency = $("#train-frequency").val().trim();

//    trainName.html("");

    database.ref().push({
        name: trainName,
        destination: trainDestination,
        time: trainTime ,
        frequency: trainFrequency
    });


});


database.ref().on("child_added", function (snapshot) {

    // Log everything that's coming out of snapshot
    console.log(snapshot.val().name);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().time);
    console.log(snapshot.val().frequency);

    var now = moment().format("HH:mm");
    console.log("this is my now var:" + now);
    var ftime = snapshot.val().time;
    console.log("this is my ftime: " + ftime)
    var splitTimes = ftime.split(":");
    var hr = splitTimes[0];
   // hr = moment.hour(parseInt(hr));
     var sett = moment().set("hour", hr);
    var min = splitTimes[1];
    sett.set('minute',min);
    console.log("this is my sett var: " + sett)
    
    var nt = next(sett,snapshot.val().frequency);


    var first = moment(hr).minute(min) ;
    first =moment(first).format("HH:mm")
    console.log( "this is my splitTime var " + hr);
    console.log( "this is my min var " + nt);
    //console.log(
        var na = moment(nt).fromNow('mm');
    // var nextTrain = function(){
    //     moment(first.add(snapshot.val().frequency));
    // console.log(nextTrain);
  
    // };

    $("#appendedItems").append("<tr><td> " + snapshot.val().name + "</td><td>" + snapshot.val().destination  +"</td><td>" + snapshot.val().frequency + "</td><td>"+ moment(nt).format("HH:mm") + "</td><td>" + na + "</td><td>");

    // Handle the errors
}
    , function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });

    var next = function(startTime,freq){
        while(startTime<moment()){
        startTime.add(freq,'m')
        }
        
    return startTime;
    }