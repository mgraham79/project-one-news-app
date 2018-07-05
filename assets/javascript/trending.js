/* global firebase */

// Initialize Firebase
// Make sure that your configuration matches your firebase script version
// (Ex. 3.0 != 3.7.1)
var config = {
    apiKey: "AIzaSyBV13RnJqyB9cwgjbjsYn-8I5Nn9QitCk0",
    authDomain: "trending-sample.firebaseapp.com",
    databaseURL: "https://trending-sample.firebaseio.com",
    projectId: "trending-sample",
    storageBucket: "trending-sample.appspot.com",
    messagingSenderId: "110559861463"
};
firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();



// database.ref("/").on("child_added").limitTo(5)

// PART I

// user can add a search term with a count to the database 
$("#search-button").on("click", function (event) {
    event.preventDefault();
    // grab user input
    var searchTerms = $("#search-term").val().trim();
    database.ref("/trending").push({ term: searchTerms, dateAdded: firebase.database.ServerValue.TIMESTAMP });
    // value = searchTerms;
    // console.log(value);
    // alert("Added to firebase");
});


database.ref("/trending").orderByChild("dateAdded").limitToLast(5).on("child_added", function (snapshot) {
    console.log(snapshot.val());


    // append recent searches to the page
    $("#run-search").append("<li class='list-inline-item'>" + snapshot.val().term + "</li>" + " | ");


});


$(document).on("click", ".list-inline-item", function (e) {
    e.preventDefault()
    var searchTerm = $(this).text();
    var buildURL = function () {
        queryURL = "https://newsapi.org/v2/everything?sources=the-new-york-times&";
        var queryParams = {
            q: searchTerm,
            pageSize: 5,
            from: $("#start-year").val(),
            to: $("#end-year").val(),
            apikey: "5573b7a235654d248bf3d502bd3417e6"

        }
        console.log($(this));
        console.log(queryURL + $.param(queryParams))
        console.log(queryParams);
        return queryURL + $.param(queryParams);
    }

        //URL query function for Bretbart News
        var buildURL2 = function () {
            queryURL2 = "https://newsapi.org/v2/everything?sources=breitbart-news&";
            var queryParams = {
                q: searchTerm,
                pageSize: 5,
                from: $("#start-year").val(),
                to: $("#end-year").val(),
                apikey: "5573b7a235654d248bf3d502bd3417e6"
            }
            console.log(queryURL2 + $.param(queryParams))
            return queryURL2 + $.param(queryParams)
        }

        var database = firebase.database()


        // Request for information from New York Times API

        $.ajax({
            url: buildURL(),
            method: "GET"
        }).then(function (response) {

            var results = response.articles
            console.log(results)
            for (var i = 0; i < results.length; i++) {
                // After response from API build card for each news article
                var resultDisplay = $("<div>")
                resultDisplay.attr("class", "card ")
                var resultImage = $("<img>")

                resultDisplay.attr("class", "card-img-top")
                resultImage.attr("src", results[i].urlToImage)
                var resultTitle = $("<h5>")
                resultTitle.text(results[i].title)
                var resultDescription = $("<p>")
                resultDescription.text(results[i].description)
                var resultLink = $("<a>")
                resultLink.attr("href", results[i].url)
                resultLink.text("Read more")
                var resultAuthor = $("<p>")
                resultAuthor.text(results[i].author)
                var resultDate = $("<p>")
                resultDate.text(results[i].publishedAt)
                resultLink.attr("target", "_blank")


                // Creating Div for subject options

                var subjectDiv = $("<div>");

                var subjectSelect = $("<select>");
                subjectSelect.attr("class", "subject-slug");
                subjectSelect.attr("id", "subject");

                subjectDiv.attr("class", "form-group");
                subjectDiv.append("<label for='end-year'>Select Most Relevant Subject</label>");
                subjectDiv.append(subjectSelect);

                // Getting the options
                selectSubject();

                // Recommendation Checkmark

                var checkLabel = $("<label>");
                checkLabel.attr("class", "check-container");
                checkLabel.text("Would you recommend this article?");
                var checkInput = $("<input>");

                checkInput.attr("class", "checkbox");
                checkInput.attr("type", "checkbox");
                checkInput.attr("value", results[i].url);
                checkInput.attr("id", "checkboxId_" + i);
                var checkSpan = $("<span>");
                checkSpan.attr("class", "checkmark");
                checkLabel.append(checkInput);
                checkLabel.append(checkSpan);

                // Append the results data to the resultsDisplay
                resultDisplay.append(resultTitle)
                resultDisplay.append(resultAuthor)
                resultDisplay.append(resultDate)
                resultDisplay.append(resultImage)
                resultDisplay.append(resultDescription)
                resultDisplay.append(resultLink)
                resultDisplay.append(subjectDiv)
                resultDisplay.append(checkLabel)
                $("#Left").append(resultDisplay)
            };
        });



    



// Request for impformation from Breitbart News API

$.ajax({
    url: buildURL2(),
    method: "GET"
}).then(function (response) {

    var results = response.articles
    console.log(results)
    for (var i = 0; i < results.length; i++) {
        // After response from API build card for each news article
        var resultDisplay = $("<div>")
        resultDisplay.attr("class", "card ")
        var resultImage = $("<img>")

        resultDisplay.attr("class", "card-img-top")
        resultImage.attr("src", results[i].urlToImage)
        var resultTitle = $("<h5>")
        resultTitle.text(results[i].title)
        var resultDescription = $("<p>")
        resultDescription.text(results[i].description)
        var resultLink = $("<a>")
        resultLink.attr("href", results[i].url)
        resultLink.attr("target", "_blank")
        resultLink.text("Read more")
        var resultAuthor = $("<p>")
        resultAuthor.text(results[i].author)
        var resultDate = $("<p>")
        resultDate.text(results[i].publishedAt)


        // Creating Div for subject options

        var subjectDiv = $("<div>");

        var subjectSelect = $("<select>");
        subjectSelect.attr("class", "subject-slug");
        subjectSelect.attr("id", "subject");

        subjectDiv.attr("class", "form-group");
        subjectDiv.append("<label for='end-year'>Select Most Relevant Subject</label>");
        subjectDiv.append(subjectSelect);

        // Getting the options
        selectSubject();


        // Recommendation Checkmark

        var checkLabel = $("<label>");
        checkLabel.attr("class", "check-container");
        checkLabel.text("Would you recommend this article?");
        var checkInput = $("<input>");
        checkInput.attr("class", "checkbox");
        checkInput.attr("type", "checkbox");
        checkInput.attr("value", results[i].url);
        checkInput.attr("id", "checkboxId_" + i);
        var checkSpan = $("<span>");
        checkSpan.attr("class", "checkmark");
        checkLabel.append(checkInput);
        checkLabel.append(checkSpan);


        // Append the results data to the resultsDisplay
        resultDisplay.append(resultTitle)
        resultDisplay.append(resultAuthor)
        resultDisplay.append(resultDate)
        resultDisplay.append(resultImage)
        resultDisplay.append(resultDescription)
        resultDisplay.append(resultLink)
        resultDisplay.append(subjectDiv)
        resultDisplay.append(checkLabel)
        $("#Right").append(resultDisplay)
    }
})
})