var buildURL = function () {
    queryURL = "https://newsapi.org/v2/everything?sources=the-new-york-times&";
    var queryParams = {
      q: $("#search-term").val(),
      pageSize: $("#article-count").val(),
      from: $("#start-year").val(),
      to: $("#end-year").val(),
      apikey: "5573b7a235654d248bf3d502bd3417e6"
  
    }
    // console.log(queryURL + $.param(queryParams))
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
    // console.log(queryURL2 + $.param(queryParams))
    return queryURL2 + $.param(queryParams)
  }