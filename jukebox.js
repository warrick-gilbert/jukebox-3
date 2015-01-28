$(document).ready(function() {

////////////// Part 3 not done

  $("#song-form").submit(function(){
    // gets the song name and string of notes, concatenates them with a ":"
    var songName = $("#song-form input[type='text']").eq(0).val();
    var songString = $("#song-form input[type='text']").eq(1).val();
    $("#song-queue").append("<li>" + songName + ": " + songString + "</li>");
    $("#song-form input[type='text']").val(""); // clear form
    event.preventDefault()  // prevent form from submitting
  });

// function that finds the first song and plays it
  var playFirstSong = function(){
    // check to see if we've got to the end of the queue.
    if ($("#song-queue li:first-child").text() ==""){ 
      // all code to do when songs stop.
      $("#play-button").slideDown();
      $("#enterASong").html("Enter a song to play.");
      return;
    };    
    // items from queue have to be cut back into title and song
    var firstTitleAndSong = $("#song-queue li:first-child").text();
    var cutoff = firstTitleAndSong.lastIndexOf(":")+1; // chop off the song title
    var thisSongName = firstTitleAndSong.substring(0, firstTitleAndSong.lastIndexOf(":"));
    var firstSong = firstTitleAndSong.substring(cutoff, firstTitleAndSong.length);

    $("#enterASong").html("Now playing "+ thisSongName + ".");
 
    $("#song-queue li:first-child").remove();
    // console.log(firstSong);
    var song = parseSong(firstSong);
    playSong(song, 400, function() {
      playFirstSong(); // callback
    });
  };

  $("#play-button").click(function(){ // when song playing starts
    $("#play-button").slideUp();
    playFirstSong();
  });



});