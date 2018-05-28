// Module dependencies

const express = require('express');
const mysql = require('mysql');
const bodyParser = require( 'body-parser' );

// Globals

var app = express();
var urlencodedParser = bodyParser.urlencoded( { extended: false } );
var jsonParser = bodyParser.json()

// Database connection

//mysql://bf625d1cf3ab45:6d68558b@us-cdbr-iron-east-04.cleardb.net/heroku_b2cf77a96af7a57?reconnect=true
var mysqlHostName = 'us-cdbr-iron-east-04.cleardb.net';
var mysqlUserName = 'bf625d1cf3ab45';
var mysqlUserPassword = '6d68558b';
var mysqlDatabase = 'heroku_b2cf77a96af7a57';

var mysqlConnection = mysql.createConnection({
	host: mysqlHostName,
	user: mysqlUserName,
	password: mysqlUserPassword,
	database: mysqlDatabase
});
	
// Test connection
mysqlConnection.connect( error => {
	if ( error ) throw error;

	console.log( `Connected to ${mysqlHostName} MySQL database as user ${mysqlUserName}.` );
});

// mysqlConnection.query('INSERT INTO artist ( name ) VALUE ( ? )', 'test2'); // this works


// Configuration

app.use( "/public", express.static( __dirname + "/public" ));

// Routes sends our HTML file

app.get('/', ( request, response ) => {
	response.sendFile( __dirname + '/index.html' ); 
});

// START Organism Database

app.get('/edit-organism-db', ( request, response ) => {
	response.sendFile( __dirname + '/edit-organism-db.html' ); 
});

app.post( '/get-organism-table', ( request, response ) => {
	mysqlConnection.query(
		'SELECT * FROM organism',
		( error, result ) => {
			if ( error ) throw error;
			// console.log( result );
			response.send( result );
	})
})

app.post( '/add-organism', jsonParser, ( request, response ) => {
	console.log( request.body );
	var set = {};
	set.species_name = request.body.speciesName;
	set.common_name = request.body.commonName;
	set.type_id = request.body.type;
	set.family_name_id = request.body.familyName;
	set.subfamily_name_id = request.body.subfamilyName;
	set.genus_name_id = request.body.genusName;
	set.genome_type_id = request.body.genomeType;
	set.gram_stain_group_id = request.body.gramStain;
	set.genome_length_bp = request.body.genomeLength;
	mysqlConnection.query(
		'INSERT INTO organism SET ?', 
		set, 
		function ( error, result ) {
			if ( error ) throw error;
			console.log( result );
			response.send({ 
				id: result.insertId,
				set: set,
				recordAdded: true
			});
		}
	);
});

app.post( '/delete-organism', jsonParser, ( request, response ) => {
	console.log( request.body );
	var id = request.body.id;
	mysqlConnection.query(
		'DELETE FROM organism WHERE id = ? ', 
		id, 
		( error, result ) => {
			if ( error ) throw error;
			console.log( result );
			response.send({
				recordDeleted: true
			});
		}
	);
});

// END Organism Database

// START Music Database

app.get('/edit-music-db', ( request, response ) => {
	response.sendFile( __dirname + '/edit-music-db.html' ); 
});

app.post( '/get-artist-table', ( request, response ) => {
	mysqlConnection.query(
		'SELECT * FROM artist',
		( error, result ) => {
			if ( error ) throw error;
			// console.log( result );
			response.send( result );
	})
})

app.post( '/add-artist', jsonParser, ( request, response ) => {
	console.log( request.body );
	name = request.body.name;
	mysqlConnection.query(
		'INSERT INTO artist ( name ) VALUE ( ? )', 
		name, 
		function ( error, result ) {
			if ( error ) throw error;
			console.log( result );
			response.send({
				id: result.insertId,
				name: name
			});
		}
	);
});

app.post( '/delete-artist', jsonParser, ( request, response ) => {
	console.log( request.body );
	id = request.body.id;
	mysqlConnection.query(
		'DELETE FROM artist WHERE id = ? ', 
		id, 
		( error, result ) => {
			if ( error ) throw error;
			console.log( result );
			response.send({
				recordDeleted: true
			});
		}
	);
});

// END Music Database

// Update MySQL database

app.post('/artist', jsonParser, function ( request, response ) {
	console.log( request.body );
	mysqlConnection.query('INSERT INTO artist ( name ) VALUE ( ? )', request.body.name, 
		function ( error, result ) {
			if ( error ) throw error;
			response.send('User added to database with ID: ' + result.insertId);
		}
	);
});

// Begin listening

app.listen(3000, () => {
	console.log( 'Listening on port 3000.' );
});