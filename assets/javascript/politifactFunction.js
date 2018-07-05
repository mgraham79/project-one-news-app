// Query of Politifact with user selected Most Relevant Subject ($("#subject").val())
$(document).on("change", "#subject", function () {
    console.log($(this).val())
    console.log($("#subject").val())
    var queryPolitifact = "http://www.politifact.com/api/v/2/statement/?order_by=-ruling_date&edition__edition_slug=truth-o-meter&subject__subject_slug=" + $(this).val() + "&limit=" + $("#article-count").val()
    console.log(queryPolitifact)
    $.ajax({
      url: queryPolitifact,
      method: "GET",
      dataType: "jsonp"
    }).then(function (response3) {
      // After response from API build results
      $(".politifact").empty()
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
        var relevantButton = $("<button>")
        relevantButton.attr('class', 'relevant')
        relevantButton.text("Click If This Statement Is Relevant To Search Term")
  
        // Append the results data to the politifactDiv
        politifactDiv.append(politifactPerson)
        politifactDiv.append(politifactStatement)
        politifactDiv.append(politifactImage)
        politifactDiv.append(politifactHeadline)
        politifactDiv.append(relevantButton)
        $(".politifact").append(politifactDiv)
        
  
  
      }
  
    })
  })