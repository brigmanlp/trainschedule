// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBVF2DepFPBidwFK7t4JS6HvC0vlXeof0I",
    authDomain: "trainschedule-97a39.firebaseapp.com",
    databaseURL: "https://trainschedule-97a39.firebaseio.com",
    storageBucket: "trainschedule-97a39.appspot.com",
    messagingSenderId: "113375866591"
  };
  firebase.initializeApp(config);

var database = firebase.database();

// Button for adding trains
$("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainStart = $("#start-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();

    // Creates local "temporary" object for holding train data
    var newTrain = {
        name: trainName,
        destination: trainDestination,
        start: trainStart,
        frequency: trainFrequency
    };

    // Uploads train data to the database
    database.ref().push(newTrain);

    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.start);
    console.log(newTrain.frequency);

    // Alert
    alert("Train successfully added");

    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#frequency-input").val("");

});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    console.log(trainName);
    var trainDestination = childSnapshot.val().destination;
    console.log(trainDestination);
    var trainStart = childSnapshot.val().start;
    console.log(trainStart);
    var trainFrequency = childSnapshot.val().frequency;
    console.log(trainFrequency);

    //train start pushed back by 1 year to ensure that it comes before the current time
    var trainStartConverted = moment(trainStart, "hh:mm").subtract(1, "years");
    console.log(trainStartConverted);
    
    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(trainStartConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var timeRemainder = diffTime % trainFrequency;
    console.log(timeRemainder);

    // Minute Until Train
    var minutesAway = trainFrequency - timeRemainder;
    console.log("MINUTES TILL TRAIN: " + minutesAway);

    // Next Train
    var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm");
    console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm"));

    //populate table in html with input data
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");

});
