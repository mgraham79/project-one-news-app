var politifactSibs;
$(document).on('click', '.relevant', function(){
    politifactSibs = $(this).siblings()
    console.log(politifactSibs)
    fireArticles()
    console.log("relevant")
    console.log(this)

})