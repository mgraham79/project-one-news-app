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

  // var searchTerm= $("#search-term").val().trim()
  // var articleCount= $("#article-count").val()
  // var startYear = 
  // var queryURL = "https://newsapi.org/v2/everything?sources=the-new-york-times&q="+ searchTerm+"&pageSize="+ articleCount+ "&from="+  +"apiKey=5573b7a235654d248bf3d502bd3417e6"

  // var buildURL = function () {
  //   queryURL = "https://newsapi.org/v2/everything?sources=the-new-york-times";
  //   var queryParams = {
  //       searchTerm: "q=" + $("#search-term").val().trim(),
  //       articleCount: "pageSize=" + $("#article-count").val(),
  //       startYear: "from=" + $("#start-year").val().trim(),
  //       endYear: "to=" + $("#end-year").val().trim(),
  //       api_key: "5573b7a235654d248bf3d502bd3417e6"
  //   }
  //   queryParams.q = $("#form-input").val().trim();
  //   return queryURL + $.param(queryParams);}
  //   buildURL()
  //   console.log(queryURL+ $.param(queryParams))

  var buildURL = function () {
    queryURL = "https://newsapi.org/v2/everything?sources=the-new-york-times&";
    var queryParams = {
        q:$("#search-term").val(),
        pageSize:  $("#article-count").val(),
        from: $("#start-year").val(),
        to: $("#end-year").val(),
        apikey: "5573b7a235654d248bf3d502bd3417e6"
    
    }
    console.log(queryURL+ $.param(queryParams))
    return queryURL + $.param(queryParams);
  }
    
    
    var buildURL2 = function () {
      queryURL2 = "https://newsapi.org/v2/everything?sources=breitbart-news&";
      var queryParams = {
          q:$("#search-term").val(),
          pageSize:  $("#article-count").val(),
          from: $("#start-year").val(),
          to: $("#end-year").val(),
          apikey: "5573b7a235654d248bf3d502bd3417e6"
      }
          console.log(queryURL2+ $.param(queryParams))
          return queryURL2+ $.param(queryParams)
        }


        

      $(document).on("click", "#run-search", function(e){
        e.preventDefault()
        
        $.ajax({
          url: buildURL(), 
          method: "GET"
        }).then(function (response){
          
          var results = response.articles
          console.log(results)
          for(i=0; i< results.length; i++){
            var resultDisplay= $("<div>")
            resultDisplay.attr("class", "card ")
            var resultImage = $("<img>")
            
            resultDisplay.attr("class", "card-img-top")
            resultImage.attr("src", results[i].urlToImage)
            var resultTitle = $("<h5>")
            resultTitle.text(results[i].title)
            var resultDescription=  $("<p>")
            resultDescription.text(results[i].description)
            var resultLink= $("<a>")
            resultLink.attr("href", results[i].url)
            resultLink.text("Read more")
            var resultAuthor = $("<p>")
            resultAuthor.text(results[i].author)
            var resultDate = $("<p>")
            resultDate.text(results[i].publishedAt)

            resultDisplay.append(resultTitle)
            resultDisplay.append(resultAuthor)
            resultDisplay.append(resultDate)
            resultDisplay.append(resultImage)
            resultDisplay.append(resultDescription)
            resultDisplay.append(resultLink)
            $("#Left").append(resultDisplay)

            
          }

        })
        $.ajax({
          url: buildURL2(), 
          method: "GET"
        }).then(function (response){
          
          var results = response.articles
          console.log(results)
          for(i=0; i< results.length; i++){
            var resultDisplay= $("<div>")
            resultDisplay.attr("class", "card ")
            var resultImage = $("<img>")
            
            resultDisplay.attr("class", "card-img-top")
            resultImage.attr("src", results[i].urlToImage)
            var resultTitle = $("<h5>")
            resultTitle.text(results[i].title)
            var resultDescription=  $("<p>")
            resultDescription.text(results[i].description)
            var resultLink= $("<a>")
            resultLink.attr("href", results[i].url)
            resultLink.text("Read more")
            var resultAuthor = $("<p>")
            resultAuthor.text(results[i].author)
            var resultDate = $("<p>")
            resultDate.text(results[i].publishedAt)

            resultDisplay.append(resultTitle)
            resultDisplay.append(resultAuthor)
            resultDisplay.append(resultDate)
            resultDisplay.append(resultImage)
            resultDisplay.append(resultDescription)
            resultDisplay.append(resultLink)
            $("#Right").append(resultDisplay)

            
          }

        })
      })