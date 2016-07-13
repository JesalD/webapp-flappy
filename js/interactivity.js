jQuery("#credits").on("click", function() {
    var message = "Game created by Jesal!";
    jQuery("#credits").append(
        "<p>" + message + "</p>"
    );
});


jQuery("#scoresbtn").on("click", function() {
    jQuery("#content").empty();
    jQuery("#content").append(
        "<ul>" +
            "<li>" + "Me" + "</li>" +
            "<li>" + "Also me" + "</li>" +
            "<li>" + "Me again" + "</li>" +
        "</ul>"
    );
});

jQuery("#creditsbtn").on("click", function() {
    jQuery("#content").empty();
    jQuery("#content").append(
        "<div>" + "Game created by Jesal!" + "</div>"
    );
});

jQuery("#helpbtn").on("click", function() {
    jQuery("#content").empty();
    jQuery("#content").append(
        "<ul>"
            + "<li>" + "Press SPACE to keep Flappy Man flying" + "</li>"
          + "<li>" + "Avoid the incoming pipes" + "</li>"
        + "</ul>"
    );
});

function registerScore(score) {


var playerName = prompt("What's your name?");
var scoreEntry = "<li>" + playerName + ":" + score.toString() + "</li>";

jQuery("#topScorers").on("click", function() {

  jQuery("#topScorers").append(scoreEntry);
});


}

jQuery("#sharing").on("click", function(){
    var text =
        "I scored " +
        score.toString() +
        " in Flappy Birdy! Can you do better?";
    var escapedText = encodeURIComponent(text);
    var url =
        "https:twitter.com/share?text=" +
        escapedText;
    jQuery("#sharing").attr("href", url);
});
