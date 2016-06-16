$( document ).ready( function(){
  $( '#addButton' ).on( 'click', function(){
    // get username from input
    var newUserName = $( '#usernameIn' ).val();
    // create object to post
    var newUser={
      "username": newUserName,
      "active": false
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
    $('#outputDiv').empty();
    for(let i=0; i<4; i++ )
    {
      console.log("Making user " + i + " " + users[i].name);
      // Create a label, input and button for users[i]
      $('#outputDiv').append( "<div><p>" + users[ i ].name + "</p><input id='" + i + "In'><button class ='btn btn-primary' id='" + i + "Button'>Submit</button> </div>" );
      //Create a click event for the submit button
      $('#' + i + 'Button').click(function(){
        $('#' + i + 'In').prop('readonly', true);

        //Update the user who has submitted what they will bring
        var updatedUser = {
          "username": users[i].name,
          "food": $('#' + i + 'In').val(),
          "created": 'now();'
        }


        $.ajax({
          type: 'POST',
          url: '/updateUser',
          data: updatedUser
        }); // end ajax
        $(this).remove();
      });
    } // end for loop
  } // end show users
}); // end jQuery
