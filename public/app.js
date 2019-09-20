$(document).ready(function() {
    $("#noteForm").hide();
    $(".savetheNote").hide();
    $(".deletetheNote").hide();
    $(".editting").hide();
});

var storedClickId= "";
var titleofNote = "";

// This will run the scrape route to get the articles
$(document).on("click", "#scrape", function() {
    location.href = "/scrape";
});

// This will save the article to the saved page
$(document).on("click", "#saved", function() {

   
  
    id = $(this).attr("data-id");


    $.ajax({
        method: "PUT",
        url: "/articles/" + id,
        data: {
            savedNews: true
        }
    });
});

// This will delete an article from the saved page
$(document).on("click", "#deleteFromSaved", function() {
   var id = $(this).attr("data-id");

   //alert("/articles/" + id)
    $.ajax({
        method: "PUT",
        url: "/articles/" + id,
        data: {
            savedNews: false           
        }
    });
    location.href = "/saved";
});

// This will add a note to the related article
$(document).on("click", "#addNote", function() {
    // alert("clicked")
    $("#noteForm").fadeIn("slow");
    titleofNote = $(this).attr("title-id").trim();
    var id = $(this).attr("data-id");
    storedClickId= id ;
    $("#noteSection").show();
    $(".editting").show();
    $("#saveNote").show();
    $("#deleteComment").show();
    $(".saveOrDelete").hide();

    console.log( "/articles/" + id )
    $.ajax({
        method: "GET",
        url: "/articles/" + id 
      
    })
    .done(function(response) {
        // This empties the form
         console.log("data:"+response.note )
        if (response.note !== undefined) {
            $("#noteTextArea").html(response.note.body);
        }
        
        $("#title").html(titleofNote);
    });
});

// This will save the user entered note to the db
$(document).on("click", "#saveNote", function() {
    $("#noteForm").fadeIn("slow");
    titleofNote = $(this).attr("title-id").trim();
   
  
    $("#noteForm").fadeOut("slow");
     
    $("#noteSection").show();
    $("#saveNote").show();
     $("#deleteNote").show();
      $("#saveNote").show();
    $(".editting").hide();
 

    
    $.ajax({
        method: "POST",
        url: "/articles/" +  storedClickId,
        data: {
            body: $("#noteTextArea").val().trim()
        }
    })
    .done(function(data) {
        // This empties the form
        if (data.note) {
            $("#noteTextArea").html(data.note.body);
        }
       
    });


    

    $("#noteSection").show();
    $(".editting").show();
    $("#saveNote").show();

    $("#addNote").show();
    $("#deleteNote").show();
    $("#deleteNote").show();
    // $(".saveOrDelete").hide();
    $("#title").html(titleofNote);
});

// This deletes the note from the db
$(document).on("click", "#deleteComment", function() {
    $("#noteForm").fadeOut("slow");
    // This empties the form
    document.getElementById("noteForm").reset();
    $("#noteSection").hide();
    $(".editNote").hide();
    $(".editting").hide();
    $(".saveOrDelete").show();

    $.ajax({
        method: "POST",
        url: "/articles/" +  storedClickId,
        data: {
            body: ""
        }
    })
    .done(function(data) { 
        $("#saveNote").show();
        $("#deleteNote").show();  
    });
});