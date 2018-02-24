// Grab the articles as a json
$(document).ready(function(){
  $.getJSON("/articles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
        if(data[i]._id!==undefined){
          $("#articles").append(`<div > <p class="article" data-id=${data[i]._id}>${data[i].title}</p> <a  href="${data[i].link}" target="_blank"> Click Here to View</a> <div class="notes"></div></div>`);  
        }
      }
      // $("#articles").append("<a data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</a>");  }
    // $("#articles").append(`<a data-id=${data[i].id} href=${data[i].link}>${data[i].title}</a>`)
  });

  


  // Whenever someone clicks a p tag
  $(document).on("click", "p.article", function() {
    // console.log("clicked this");
    // Empty the notes from the note section
    $("#notes").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");
    var thisNotes = $(this).parent();
    console.log(thisNotes);
    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      // With that done, add the note information to the page
      .then(function(data) {
        console.log(data.title);
        // The title of the article
        thisNotes.append(
          "<form>" +
            "<h2>" + data.title + "</h2>" + 
            "<textarea id='bodyinput' name='body' autofocus></textarea>" +
            "<button data-id='" + data._id + "' id='savenote' type='submit'>Save Note</button>" +
          "</form>"
        );

        // $(".note-form").on("submit", function(e) {
        //   e.preventDefault();
        //   console.log("not-click-form");
        // });

        
        
        // If there's a note in the article
        if (data.note) {
          // Place the title of the note in the title input
          $("#titleinput").val(data.note.title);
          // Place the body of the note in the body textarea
          $("#bodyinput").val(data.note.body);
        }
      });
  });


  // When you click the savenote button
  $(document).on("click", "#savenote", function(e) {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from title input
        title: $("#titleinput").val(),
        // Value taken from note textarea
        body: $("#bodyinput").val()
      }
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#notes").empty();
      });

    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });
});//end of document 
