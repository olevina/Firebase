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
    console.log(now);
    var first = moment(snapshot.val().time).format("HH:mm");
    console.log(first);
    // var nextTrain = function(){
    //     moment(first.add(snapshot.val().frequency));
    // console.log(nextTrain);
  
    // };

    $("#appendedItems").append("<tr><td> " + snapshot.val().name + "</td><td>" + snapshot.val().destination  +"</td><td>" + snapshot.val().frequency + "</td><td>"+ snapshot.val().nextTrain + "</td><td>");

    // Handle the errors
}
    , function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });
