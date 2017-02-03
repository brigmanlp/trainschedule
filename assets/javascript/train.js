// Initialize Firebase
    var config = {
        apiKey: "AIzaSyC0TDuTvqOLMsfmcMP6wcTTvxJgK336v8k",
        authDomain: "train-tracker-41ca3.firebaseapp.com",
        databaseURL: "https://train-tracker-41ca3.firebaseio.com",
        storageBucket: "train-tracker-41ca3.appspot.com",
        messagingSenderId: "360873579241"
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
            start: moment(trainStart, "h:mm a").format("h:mm a"),
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

        // Use moment to make trainStart a valid date
        var empStartMoment = moment.unix(trainStart).format("MM/DD/YY");

        $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + empStartMoment + "</td><td>" + "</td><td>" + trainFrequency + "</td><td>" + "</td></tr>");

    });