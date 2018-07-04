function recommendSetter(counter, urlNoSpecialChar) {
    var RecommendCountRef = firebase.database().ref('leftArticles/' + urlNoSpecialChar + '/articleRecommendations');
    // RecommendCountRef.once("value").then(function (snapshot) {
    //     counter.text(snapshot.val())
    // })
    RecommendCountRef.on('value', function (snapshot) {
        // counter.html("<span>" + snapshot.val() + "</span>")
        console.log("Counter text", snapshot.val());
        var myCounterValue = snapshot.val();


        counter.text(myCounterValue);
    })
}




$(document).on("click", "#run-search", function (e) {
    e.preventDefault()
    searchTerm = $("#search-term").val()
    var urlWithSpecialChar;
    var urlNoSpecialChar;
    // Request for information from New York Times API
    function checkArticles(newArticle) {
        database.ref('leftArticles/' + urlNoSpecialChar).once('value').then(function (snapshot) {
            console.log("snapshot.val(): " + snapshot.val())
            console.log("snapshot.key: " + snapshot.key)
            if (!snapshot.val()) {
                console.log('here');
                database.ref("leftArticles/" + snapshot.key).set(newArticle)
            } else {

                console.log(searchTerm)

            }
        })
    }

    // Request for information from Breitbart News API
    function checkArticles2(newArticle) {
        database.ref('rightArticles/' + urlNoSpecialChar).once('value').then(function (snapshot) {
            console.log("snapshot.val(): " + snapshot.val())
            console.log("snapshot.key: " + snapshot.key)
            if (!snapshot.val()) {
                console.log('here');
                database.ref("rightArticles/" + snapshot.key).set(newArticle)
            } else {

                console.log(searchTerm)

            }
        })
    }



    $.ajax({
        url: buildURL(),
        method: "GET"
    }).then(function (response) {

        results = response.articles
        // console.log(results)
        for (i = 0; i < results.length; i++) {
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

            // Remove special characters
            urlWithSpecialChar = results[i].url;
            urlNoSpecialChar = urlWithSpecialChar.replace(/[^\w\s]/gi, '')
            // console.log("urlNoSpecialChar " + urlNoSpecialChar);


            // Recommendation Checkmark

            var checkLabel = $("<label>");
            checkLabel.attr("class", "check-container");
            checkLabel.text("Would you recommend this article?");
            var checkInput = $("<input>");
            checkInput.addClass("checkbox left-side");
            checkInput.attr("type", "checkbox");
            checkInput.attr("value", urlNoSpecialChar);
            checkInput.attr("id", "checkboxId_L_" + i);
            var checkSpan = $("<span>");
            checkSpan.attr("class", "checkmark");
            checkLabel.append(checkInput);
            checkLabel.append(checkSpan);

            recommendSetter(recommendCounter, urlNoSpecialChar)
            var recTotalLabel = $("<label>&#9786 Recommendation Total: " + recommendCounter + "<span class=recommend-count-" + i + " ></span ></label > ");
            // Recommendation symbol and total
            var recommendCounter = $(".recommend-count-" + i);


            //recommendSetter(recommendCounter, urlNoSpecialChar)


            // Append the results data to the resultsDisplay
            resultDisplay.append(resultTitle)
            resultDisplay.append(resultAuthor)
            resultDisplay.append(resultDate)
            resultDisplay.append(resultImage)
            resultDisplay.append(resultDescription)
            resultDisplay.append(resultLink)
            resultDisplay.append(subjectDiv)
            resultDisplay.append(checkLabel)
            resultDisplay.append(recTotalLabel)
            $("#Left").append(resultDisplay)



            var newArticle = {

                articleUrlToImage: results[i].urlToImage,
                articleTitle: results[i].title,
                articleDescription: results[i].description,
                articleUrl: results[i].url,
                articleAuthor: results[i].author,
                articlePublishedAt: results[i].publishedAt,
                articleSearchTerm: $("#search-term").val(),
                articleRecommendations: 0
            }

            checkArticles(newArticle);
        }

    })



    // Request for information from Breitbart News API

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

            // Remove special characters
            urlWithSpecialChar = results[i].url;
            urlNoSpecialChar = urlWithSpecialChar.replace(/[^\w\s]/gi, '')
            // console.log("urlNoSpecialChar " + urlNoSpecialChar);


            // Recommendation Checkmark

            var checkLabel = $("<label>");
            checkLabel.attr("class", "check-container");
            checkLabel.text("Would you recommend this article?");
            var checkInput = $("<input>");
            checkInput.addClass("checkbox right-side");
            checkInput.attr("type", "checkbox");
            checkInput.attr("value", urlNoSpecialChar);
            checkInput.attr("id", "checkboxId_R_" + i);
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


            var newArticle = {

                articleUrlToImage: results[i].urlToImage,
                articleTitle: results[i].title,
                articleDescription: results[i].description,
                articleUrl: results[i].url,
                articleAuthor: results[i].author,
                articlePublishedAt: results[i].publishedAt,
                articleSearchTerm: $("#search-term").val(),
                articleRecommendations: 0
            }

            checkArticles2(newArticle);

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
