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

//article number for firebase going to tic the number up one each time the for loop runs that appends the arcticle card

var articleNumber = 0
var database = firebase.database()

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

  $(document).on("click", "#clear-all", function () {
    $(".politifact").empty()
    $("#Left").empty()
    $("#Right").empty()
  })

  


//This should work with the new article info Kevin did over the weekend if we swap out variables
function fireArticles() {

  return database.ref('Terms/' + searchTerm).once('value').then(function(snapshot){
console.log(snapshot.val())
console.log(snapshot.key)
console.log(searchTerm)
console.log(politifactSibs[3])
politifactLink=politifactSibs[3]
if (snapshot.val() == undefined) {

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
    
    database.ref('Terms/'+snapshot.key).set({
      politifacts: politifactLink
    })
    
    console.log(searchTerm)
  } else {
    
    console.log(searchTerm)

  }
  })


  
}
