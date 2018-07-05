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

  var checkboxClickValue = $(this).val();
  var checkboxClickClass = $(this).attr('class');
  var checkboxClickID = $(this).attr('id');
  console.log("$(this).class(): " + checkboxClickClass);
  console.log("checkboxClickValue = " + checkboxClickValue);
  console.log("checkboxClickID = " + checkboxClickID);

  if (checkboxClickClass == 'checkbox left-side') {
    var RecommendCountRef = firebase.database().ref('leftArticles/' + checkboxClickValue + '/articleRecommendations');

    RecommendCountRef.once("value").then(function (snapshot) {
      var recommentCount = snapshot.val();
      // check if the checkbox is already checked
      isChecked = document.getElementById(checkboxClickID).checked;
      if (isChecked) {
        recommentCount++;
        RecommendCountRef.set(recommentCount);
      } else {
        recommentCount--;
        RecommendCountRef.set(recommentCount);
      }

    })
  } else {
    var RecommendCountRef = firebase.database().ref('rightArticles/' + checkboxClickValue + '/articleRecommendations');

    RecommendCountRef.once("value").then(function (snapshot) {
      var recommentCount = snapshot.val();
      // check if the checkbox is already checked
      isChecked = document.getElementById(checkboxClickID).checked;
      if (isChecked) {
        recommentCount++;
        RecommendCountRef.set(recommentCount);
      } else {
        recommentCount--;
        RecommendCountRef.set(recommentCount);
      }
    })
  }




});

$(document).on("click", "#clear-all", function () {
  $(".politifact").empty()
  $("#Left").empty()
  $("#Right").empty()
})




//This should work with the new article info Kevin did over the weekend if we swap out variables
function fireArticles() {

  return database.ref('Terms/' + searchTerm).once('value').then(function (snapshot) {
    console.log(snapshot.val())


    console.log(snapshot.val())
    console.log(searchTerm)
    if (snapshot.val() == undefined) {

      database.ref('Terms/' + searchTerm).set({
        politifactDiv: politifactSibs
      })

      console.log(searchTerm)
    } else {

      console.log(searchTerm)

    }
  })

}
