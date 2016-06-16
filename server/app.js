var express=require('express');
var app=express();
var path=require('path');
var bodyParser=require('body-parser');
var urlencodedParser=bodyParser.urlencoded( { extended: false } );
var pg=require('pg');
// user to connect to the "introToSQL" table on local host
// postgres must be running and you must have this db name correct
var connectionString = 'postgres://localhost:5432/nuBreakfastClub';

// static public folder
app.use( express.static( 'public' ) );

// base url
app.get( '/', function( req, res ){
  console.log( 'at base url' );
  res.sendFile( path.resolve( 'views/index.html' ) );
}); // end base url

// creates a new user from the req.body object that is received
app.post( '/createNew', urlencodedParser, function( req, res ){
  console.log( 'in POST createNew: ' + req.body.username + " " + req.body.active );
  pg.connect( connectionString, function( err, client, done ){
    // "users" is table. username = $1 = req.body.username
    client.query( 'INSERT INTO students ( name, active, created ) VALUES ( $1, $2, $3 )', [ req.body.username, req.body.active, 'now();' ] );
  });
}); // end createNew

app.post( '/updateUser', urlencodedParser, function( req, res ){
  console.log( 'in POST updateUser: ' + req.body.username + " with " + req.body.food );
  pg.connect( connectionString, function( err, client, done ){
    client.query( "UPDATE students SET created = 'now()', food = '" + req.body.food + "' WHERE name= '" + req.body.username + "'");
  });
}); // end updateUser

// send back all records in users that conform to the query
app.get( '/getUsers', function( req, res ){
  console.log( 'in get users' );
// this wil hold our results
  var results =[];
  pg.connect( connectionString, function( err, client, done ){
    // get all user records and store in "query" variable
    var query = client.query( 'SELECT * FROM students ORDER BY created DESC LIMIT 4;' );
    console.log( "query: " + query );
    // push each row in query into our results array
    var rows = 0;
    query.on( 'row', function ( row ){
      results.push( row );
    }); // end query push
    query.on( 'end', function (){
      return res.json( results );
    });
  }); // end connect
});

// spin up server
app.listen( 8080, 'localhost', function( req, res ){
  console.log( "server listening on 8080");
});
