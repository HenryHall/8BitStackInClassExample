$( document ).ready( function(){
  $( '#addButton' ).on( 'click', function(){
    // get username from input
    var newUserName = $( '#usernameIn' ).val();
    // create object to post
    var newUser={
      "username": newUserName,
      "active": true
    };// end object
    // send object to server as a post
    $.ajax({
      type: 'POST',
      url: '/createNew',
      data: newUser
    }); // end ajax
  }); // end addbutton

  $('#getUsers').on('click', function(){
    $.ajax({
      type: 'GET',
      url: '/getUsers',
      success: function( data ){
      showUsers( data );
      } // end success
    }); //end ajax
  });
  function showUsers( users ){
    console.log( 'in showUsers:' + users );
    for( i=0; i<4; i++ )
    {
      var foodInput = document.createElement( 'input' );
      foodInput.type = "text";
      var submitButton = document.createElement ( 'button' );
      submitButton.textContent = "Add Food";
      submitButton.className = "submitButton";
      // var userOut = "<div>" + users[ i ].username + " " + foodInput + " " + submitButton "</div>" ;
      $('#outputDiv').append( "<div>" + users[ i ].username + " " + foodInput + " " + submitButton + "</div>" );
    } // end for loop
  } // end show users
}); // end jQuery
