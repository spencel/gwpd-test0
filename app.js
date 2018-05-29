// Module dependencies

const express = require('express');
const mysql = require('mysql');
const bodyParser = require( 'body-parser' );

const compression = require( 'compression' );
const helmet = require( 'helmet' );

// Globals

var app = express();
app.use( compression() );
app.use( helmet() );
var port = process.env.PORT || 8080 // process.env.PORT lets the port be set by Heroku 
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

app.use( "/public", express.static( __dirname + "/public" )); // make express look in the public directory for assets (css/js/img)

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
		'SELECT * FROM organism_view',
		( error, result ) => {
			if ( error ) { reponse.send( "" ); }
			// console.log( result );
			response.send( result );
	})
});

app.post( '/add-organism', jsonParser, ( request, response ) => {
	//response.sendFile( __dirname + '/index.html' ); 
	console.log( 'request.body:' );
	console.log( request.body );
	var set = {};
	set.species_name = request.body.speciesName;
	set.common_name = request.body.commonName;
	set.genome_length_bp = request.body.genomeLength;
	new Promise( ( resolve, reject ) => {
			mysqlConnection.query( 
			'SELECT id FROM organism_type WHERE name = ?',
			request.body.typeName,
			( error, result ) => {
				if ( error ) { response.send( {recordAdded: false } ); }
				set.type_id = result[ 0 ].id;
				console.log( `set.type_id: ${set.type_id}`);
				resolve();
			}
		);
	}).then( () => {
		return new Promise( ( resolve, reject ) => {
			mysqlConnection.query( 
				'SELECT id FROM organism_family WHERE name = ?',
				request.body.familyName,
				( error, result ) => {
					if ( error ) { response.send( {recordAdded: false } ); }
					set.family_id = result[ 0 ].id;
					console.log( `set.family_id: ${set.family_id}`);
					resolve();
				}
			);
		});
	}).then( () => {
		return new Promise( ( resolve, reject ) => {
			mysqlConnection.query( 
				'SELECT id FROM organism_subfamily WHERE name = ?',
				request.body.subfamilyName,
				( error, result ) => {
					if ( error ) { response.send( {recordAdded: false } ); }
					set.subfamily_id = result[ 0 ].id;
					console.log( `set.subfamily_id: ${set.subfamily_id}`);
					resolve();
				}
			);
		});
	}).then( () => {
		return new Promise( ( resolve, reject ) => {
			mysqlConnection.query( 
				'SELECT id FROM organism_genus WHERE name = ?',
				request.body.genusName,
				( error, result ) => {
					if ( error ) { response.send( {recordAdded: false } ); }
					set.genus_id = result[ 0 ].id;
					console.log( `set.genus_id: ${set.genus_id}`);
					resolve();
				}
			);
		});
	}).then( () => {
		return new Promise( ( resolve, reject ) => {
			mysqlConnection.query( 
				'SELECT id FROM gram_stain_group WHERE name = ?',
				request.body.gramStainGroupName,
				( error, result ) => {
					if ( error ) { response.send( {recordAdded: false } ); }
					set.gram_stain_group_id = result[ 0 ].id;
					console.log( `set.gram_stain_group_id: ${set.gram_stain_group}`);
					resolve();
				}
			);
		});
	}).then( () => {
		return new Promise( ( resolve, reject ) => {
			mysqlConnection.query( 
				'SELECT id FROM genome_type WHERE name = ?',
				request.body.genomeTypeName,
				( error, result ) => {
					if ( error ) { response.send( {recordAdded: false } ); }
					set.genome_type_id = result[ 0 ].id;
					console.log( `set.genome_type_id: ${set.genome_type_id}`);
					resolve();
				}
			);
		});
	}).then( () => {
		return new Promise( ( resolve, reject ) => {
			mysqlConnection.query(
				'INSERT INTO organism SET ?', 
				set, 
				( error, result ) => {
					if ( error ) { response.send( {recordAdded: false } ); }
					console.log( 'set:' );
					console.log( set );
					console.log( 'result:' );
					console.log( result );
					resolve( result );
				}
			);
		});
	}).then( resolved => {
		mysqlConnection.query(
			'SELECT * FROM organism_view WHERE id = ?', 
			resolved.insertId, 
			( error, result ) => {
				if ( error ) { response.send( {recordAdded: false } ); }
				console.log( 'set:' );
				console.log( set );
				console.log( 'result:' );
				console.log( result );
				//response.send( { recordAdded: false } );
				response.send({ 
					id: resolved.insertId,
					record: result,
					recordAdded: true
				});
			}
		);
	});
});

app.post( '/delete-organism', jsonParser, ( request, response ) => {
	console.log( request.body );
	var id = request.body.id;
	mysqlConnection.query(
		'DELETE FROM organism WHERE id = ? ', 
		id, 
		( error, result ) => {
			if ( error ) { response.send( { recordDeleted: false } ) };
			console.log( result );
			response.send({
				recordDeleted: true
			});
		}
	);
});

// END Organism Database

// Begin listening

app.listen( port, () => {
	console.log( `Our app is running on heroku_b2cf77a96af7a57 (or localhost) and listening on port ${port}` );
});