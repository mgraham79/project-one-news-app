// Initialize Firebase
var config = {
  apiKey: "AIzaSyDu3F6Hmqd_UCFWKAj9U0ktp9Ed8SdgLXw",
  authDomain: "news-project-bcd55.firebaseapp.com",
  databaseURL: "https://news-project-bcd55.firebaseio.com",
  projectId: "news-project-bcd55",
  storageBucket: "news-project-bcd55.appspot.com",
  messagingSenderId: "331431862356"
};
firebase.initializeApp(config);

// A variable to reference the database.
var database = firebase.database();


//URL query function for New York Times

var buildURL = function () {
  queryURL = "https://newsapi.org/v2/everything?sources=the-new-york-times&";
  var queryParams = {
    q: $("#search-term").val(),
    pageSize: $("#article-count").val(),
    from: $("#start-year").val(),
    to: $("#end-year").val(),
    apikey: "5573b7a235654d248bf3d502bd3417e6"

  }
  console.log(queryURL + $.param(queryParams))
  return queryURL + $.param(queryParams);
}

//URL query function for Bretbart News

var buildURL2 = function () {
  queryURL2 = "https://newsapi.org/v2/everything?sources=breitbart-news&";
  var queryParams = {
    q: $("#search-term").val(),
    pageSize: $("#article-count").val(),
    from: $("#start-year").val(),
    to: $("#end-year").val(),
    apikey: "5573b7a235654d248bf3d502bd3417e6"
  }
  console.log(queryURL2 + $.param(queryParams))
  return queryURL2 + $.param(queryParams)
}




$(document).on("click", "#run-search", function (e) {
  e.preventDefault()


  // Request for impformation from New York Times API

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


      // Remove special characters
      var urlWithSpecialChar = results[i].url;
      var urlNoSpecialChar = urlWithSpecialChar.replace(/[^\w\s]/gi, '')
      console.log("urlNoSpecialChar " + urlNoSpecialChar);

      // If the article all ready exists in the database, do not add it again.

      //   var refL = firebase.database().ref("/leftArticles");
      //   refL.orderByChild("articleUrl").equalTo(results[i].url).once("value",snapshot => {
      //     const userData = snapshot.val();
      //     if (userData){
      //       console.log("exists!"+userData);
      //     } else {
      //       console.log("Does not exist!"+userData);

      //     }
      // });



      // Putting the articleID object into the Firebase database
      database.ref().push({
        "leftArticles": {
          articleUrlToImage: results[i].urlToImage,
          articleTitle: results[i].title,
          articleDescription: results[i].description,
          articleUrl: results[i].url,
          articleAuthor: results[i].author,
          articlePublishedAt: results[i].publishedAt,
          articleSearchTerm: $("#search-term").val(),
          articleRecommendations: 0
        }
      });


    }

  })

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


      // Putting the articleID object into the Firebase database
      // database.ref().push({
      //   "rightArticles": {
      //     articleUrlToImage: results[i].urlToImage,
      //     articleTitle: results[i].title,
      //     articleDescription: results[i].description,
      //     articleUrl: results[i].url,
      //     articleAuthor: results[i].author,
      //     articlePublishedAt: results[i].publishedAt,
      //     articleSearchTerm: $("#search-term").val(),
      //     articleRecommendations: 0
      //   }
      // });

    }

    // Query of Politifact with user selected Most Relevant Subject ($("#subject").val())

    var queryPolitifact = "http://www.politifact.com/api/v/2/statement/?order_by=-ruling_date&edition__edition_slug=truth-o-meter&subject__subject_slug=" + $("#subject").val() + "&limit=" + $("#article-count").val()
    console.log(queryPolitifact)
    $.ajax({
      url: queryPolitifact,
      method: "GET",
      dataType: "jsonp"
    }).then(function (response3) {
      // After response from API build results
      console.log(response3)
      var results = response3.objects
      for (var i = 0; i < results.length; i++) {
        var politifactDiv = $("<div>")
        politifactDiv.attr("class", "politifacts")
        var politifactImage = $("<img>")
        politifactImage.attr("src", results[i].ruling.ruling_graphic)
        politifactImage.css("height", "100px")
        var politifactPerson = $("<h4>")
        politifactPerson.text(results[i].speaker.first_name + " " + results[i].speaker.last_name)
        var politifactStatement = (results[i].statement)
        var politifactHeadline = $("<a>")
        politifactHeadline.attr("target", "_blank")
        politifactHeadline.text(results[i].ruling_headline)
        politifactHeadline.attr("href", "http://politifact.com/" + results[i].canonical_url)

        // Append the results data to the politifactDiv
        politifactDiv.append(politifactPerson)
        politifactDiv.append(politifactStatement)
        politifactDiv.append(politifactImage)
        politifactDiv.append(politifactHeadline)
        $(".politifact").append(politifactDiv)

      }


    })
  })


})

function selectSubject() {
  $.ajax({
    url: "http://www.politifact.com/api/subjects/all/json/",
    method: "GET",
    dataType: "jsonp"
  }).then(function (response) {
    for (var i = 0; i < response.length; i++) {
      var selectOption = $("<option>")
      selectOption.text(response[i].subject_slug)
      //console.log(response)
      $(".subject-slug").append(selectOption)
    }
  })
}
selectSubject();

// on Click Events

$(document).on("click", ".checkbox", function () {

  var checkboxClickValue = $(this).val()
  console.log("checkboxClickValue = " + checkboxClickValue);

});