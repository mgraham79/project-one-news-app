var politifactSibs;
$(document).on('click', '.relevant', function () {
    politifactSibs = $(this).siblings()
    console.log(politifactSibs)
    console.log("relevant")
    $(this).hide()
    console.log(searchTerm)
    politifactLink = politifactSibs[3]
    console.log(politifactLink)
    var postData = {
        politifactSpeaker: $(politifactSibs[0]).text(),
        politifactExplanation: $(politifactSibs[1]).text(),
        politifactImage: $(politifactSibs[2]).attr('src'),
        politifactText: $(politifactSibs[3]).text()
    }
    var updates = {};
    updates['/Terms/' + (searchTerm || searchTerm2)] = postData;

    return database.ref().update(updates);



})
var searchTerm = $("#search-term").val()
database.ref('/Terms').on("child_changed", function (snapshot) {
    console.log(searchTerm)
    console.log(snapshot.val())
    if (snapshot.val().politifactSpeaker == undefined) {
        $('.recentPolitifact').hide()}
    else{
        console.log('here')
        $('.recentPolitifact').show()
        $('.recentPolitifact').append('<h5>' + snapshot.val().politifactSpeaker + '<h5>')
        $('.recentPolitifact').append('<p>' + snapshot.val().politifactExplanation + '<p>')
        var polImage = $('<img>')
        polImage.attr('src', snapshot.val().politifactImage)
        polImage.css('height', '100px')
        $('.recentPolitifact').append(polImage)
        $('.recentPolitifact').append('<p>' + snapshot.val().politifactText + '<p>')
    }

    

})
// use an update instead of a set

    /*
    $("#submit-update-form").on("click", function (e) {

      // prevent the form from submitting on default
      e.preventDefault();

      // using postData object to store the name and the movie
      var postData = {
        name: $("#name-modal").val().trim(),
        favMovie: $("#fav-movie-modal").val().trim()
      };

      //hide our modal 
      $('#myModal').modal('hide');

      // Update the child by its id ex: /collectionName/id
      var updates = {};
      updates['/movies/' + updateId] = postData;

      return database.ref().update(updates);  

    });
*/