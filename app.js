// Module dependencies

const express = require('express');
const mysql = require('mysql');
const bodyParser = require( 'body-parser' );
const multer = require( 'multer' );

const compression = require( 'compression' );
const helmet = require( 'helmet' );

// Globals

var app = express();
app.use( compression() );
app.use( helmet() );
var urlencodedParser = bodyParser.urlencoded( { extended: false } );
var jsonParser = bodyParser.json()

// Database connection

//mysql://bf625d1cf3ab45:6d68558b@us-cdbr-iron-east-04.cleardb.net/heroku_b2cf77a96af7a57?reconnect=true
var mysqlHostName = 'us-cdbr-iron-east-04.cleardb.net';
var mysqlUserName = 'bf625d1cf3ab45';
var mysqlUserPassword = '6d68558b';
var mysqlDatabase = 'heroku_b2cf77a96af7a57';

/*var mysqlConnection = mysql.createConnection({
	host: mysqlHostName,
	user: mysqlUserName,
	password: mysqlUserPassword,
	database: mysqlDatabase
});
	
// Test connection
mysqlConnection.connect( error => {
	if ( error ) throw error;

	console.log( `Connected to ${mysqlHostName} MySQL database as user ${mysqlUserName}.` );
	//mysqlConnection.end();
});*/

var mysqlPool = mysql.createPool({
	connectionLimit: 100,
	host: mysqlHostName,
	user: mysqlUserName,
	password: mysqlUserPassword,
	database: mysqlDatabase
});

// Configuration

app.use( "/public", express.static( __dirname + "/public" )); // make express look in the public directory for assets (css/js/img)

// Routes sends our HTML file

app.get('/', ( request, response ) => {
	console.log( 'getting /index.html' );
	response.sendFile( __dirname + '/index.html' ); 
});

// START Organism Database



app.get('/edit-organism-db', ( request, response ) => {
	console.log( 'getting /edit-organism-db')
	response.sendFile( __dirname + '/edit-organism-db.html' ); 
});

app.post( '/get-organism-table', ( request, response ) => {
	mysqlPool.getConnection( ( error, connection ) => {
		connection.query(
			'SELECT * FROM organism_view',
			( error, result ) => {
			connection.release();
			if ( error ) { reponse.send( "" ); }
			// console.log( result );
			response.send( result );
		});
	});
});

app.post( '/add-organism', bodyParser.json(), ( request, response ) => {
	//response.sendFile( __dirname + '/index.html' ); 
	console.log( 'request.body:' );
	console.log( request.body );
	var set = {};
	set.species_name = request.body.speciesName;
	set.common_name = request.body.commonName;
	set.genome_length_bp = request.body.genomeLength;
	new Promise( ( resolve, reject ) => {
			mysqlPool.getConnection( ( error, connection ) => {
				connection.query( 
				'SELECT id FROM organism_type WHERE name = ?',
				request.body.typeName,
				( error, result ) => {
					connection.release();
					if ( error ) { response.send( {recordAdded: false } ); }
					console.log( result.length );
					if ( result.length === 0 ) { 
						console.log('reject');
						response.send( {recordAdded: false } );
						reject();
						return
					}
					set.type_id = result[ 0 ].id;
					console.log( `set.type_id: ${set.type_id}`);
					resolve();
				}
			);
		});
	}).then( () => {
		return new Promise( ( resolve, reject ) => {
			mysqlPool.getConnection( ( error, connection ) => {
					connection.query(
					'SELECT id FROM organism_family WHERE name = ?',
					request.body.familyName,
					( error, result ) => {
						connection.release();
						if ( error ) { response.send( {recordAdded: false } ); }
						if ( result.length === 0 ) { 
							console.log('reject');
							response.send( {recordAdded: false } );
							reject();
							return
						}
						set.family_id = result[ 0 ].id;
						console.log( `set.family_id: ${set.family_id}`);
						resolve();
					}
				);
			});
		});
	}).then( () => {
		return new Promise( ( resolve, reject ) => {
			mysqlPool.getConnection( ( error, connection ) => {
				connection.query(
					'SELECT id FROM organism_subfamily WHERE name = ?',
					request.body.subfamilyName,
					( error, result ) => {
						connection.release();
						if ( error ) { response.send( {recordAdded: false } ); }
						if ( result.length === 0 ) { 
							console.log('reject');
							response.send( {recordAdded: false } );
							reject();
							return
						}
						set.subfamily_id = result[ 0 ].id;
						console.log( `set.subfamily_id: ${set.subfamily_id}`);
						resolve();
					}
				);
			});
		});
	}).then( () => {
		return new Promise( ( resolve, reject ) => {
			mysqlPool.getConnection( ( error, connection ) => {
				connection.query(
					'SELECT id FROM organism_genus WHERE name = ?',
					request.body.genusName,
					( error, result ) => {
						connection.release();
						if ( error ) { response.send( {recordAdded: false } ); }
						if ( result.length === 0 ) { 
							console.log('reject');
							response.send( {recordAdded: false } );
							reject();
							return
						}
						set.genus_id = result[ 0 ].id;
						console.log( `set.genus_id: ${set.genus_id}`);
						resolve();
					}
				);
			});
		});
	}).then( () => {
		return new Promise( ( resolve, reject ) => {
			mysqlPool.getConnection( ( error, connection ) => {
				connection.query(
					'SELECT id FROM gram_stain_group WHERE name = ?',
					request.body.gramStainGroupName,
					( error, result ) => {
						connection.release();
						if ( error ) { response.send( {recordAdded: false } ); }
						if ( result.length === 0 ) { 
							console.log('reject');
							response.send( {recordAdded: false } );
							reject();
							return
						}
						set.gram_stain_group_id = result[ 0 ].id;
						console.log( `set.gram_stain_group_id: ${set.gram_stain_group}`);
						resolve();
					}
				);
			});
		});
	}).then( () => {
		return new Promise( ( resolve, reject ) => {
			mysqlPool.getConnection( ( error, connection ) => {
				connection.query(
					'SELECT id FROM genome_type WHERE name = ?',
					request.body.genomeTypeName,
					( error, result ) => {
						connection.release();
						if ( error ) { response.send( {recordAdded: false } ); }
						if ( result.length === 0 ) { 
							console.log('reject');
							response.send( {recordAdded: false } );
							reject();
							return
						}
						set.genome_type_id = result[ 0 ].id;
						console.log( `set.genome_type_id: ${set.genome_type_id}`);
						resolve();
					}
				);
			});
		});
	}).then( () => {
		return new Promise( ( resolve, reject ) => {
			mysqlPool.getConnection( ( error, connection ) => {
				connection.query(
					'INSERT INTO organism SET ?', 
					set, 
					( error, result ) => {
						connection.release();
						if ( error ) { response.send( {recordAdded: false } ); }
						if ( result.length === 0 ) { 
							console.log('reject');
							response.send( {recordAdded: false } );
							reject();
							return
						}
						console.log( 'set:' );
						console.log( set );
						console.log( 'result:' );
						console.log( result );
						resolve( result );
					}
				);
			});
		});
	}).then( resolved => {
		mysqlPool.getConnection( ( error, connection ) => {
			connection.query(
				'SELECT * FROM organism_view WHERE id = ?', 
				resolved.insertId, 
				( error, result ) => {
					connection.release();
					if ( error ) { response.send( {recordAdded: false } ); }
					if ( result.length === 0 ) { 
						console.log('reject');
						response.send( {recordAdded: false } );
						reject();
						return
					}
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
});

const multerConfig = {
    
storage: multer.diskStorage({
 //Setup where the user's file will go
 destination: function(req, file, next){
   next(null, './public/photo-storage');
   },   
    
    //Then give the file a unique name
    filename: function(req, file, next){
        console.log(file);
        const ext = file.mimetype.split('/')[1];
        next(null, file.fieldname + '-' + Date.now() + '.' + ext);
      }
    })
};

/*app.post(
	'/add-organisms',
	multer( multerConfig ).single( 'organisms' ),
	( request, response, next ) => {
		console.log( 'adding organisms' );
		console.log( 'request:' );
		console.log( request );
		console.log( 'request.file:' );
		console.log( request.file );
		response.send({
			isFileUploaded: false
		});
	}
);*/

app.post(
	'/add-organisms',
	bodyParser.json(),
	( request, response, next ) => {
		console.log( 'adding organisms' );
		console.log( 'request:' );
		console.log( request );
		console.log( 'request.file:' );
		console.log( request.file );
		response.send({
			isFileUploaded: false
		});
	}
);

app.post( '/delete-organism', jsonParser, ( request, response ) => {
	console.log( request.body );
	var id = request.body.id;
	mysqlPool.getConnection( ( error, connection ) => {
		connection.query(
			'DELETE FROM organism WHERE id = ? ', 
			id, 
			( error, result ) => {
				connection.release();
				if ( error ) { response.send( { recordDeleted: false } ) };
				if ( result.length === 0 ) { 
							console.log('reject');
							response.send( {recordDeleted: false } );
							reject();
							return
						}
				console.log( result );
				response.send({
					recordDeleted: true
				});
			}
		);
	});
});

// END Organism Database

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;