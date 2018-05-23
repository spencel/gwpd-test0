jQuery( document ).ready( function () {
	
	//console.log("script2.js loaded successfully.");

	// Initialize table
	console.log( 'initializing table' );
	jQuery.ajax({
		url: 'get-artist-table',
		type: 'POST',
		complete: function( response ) {
			//console.log( response );
			var data = JSON.parse( response.responseText );
			var totalRecords = data.length;
			//console.log( data );		
			// Add records
			for ( var iRecord in data ) {
				var id = data[ iRecord ].id;
				var name = data[ iRecord ].name;

				jQuery( 'table#artist' ).append(
					"<tr id='" + id + "'>\
						<td id='" + id + "'>" + id + "</td>\
						<td id='" + name + "'>" + name + "</td>\
						<td>\
							<input id='delete-artist-" + id + "'class='delete' type='submit' value='X'>\
						</td>\
					</tr>"
				)
			}
		}
	});

	jQuery( 'table#artist tr td input#add-artist' )
	.on( 'keyup', function( event ) {
		if ( event.key  === "Enter" ) {
			//console.log( event );
			var payload = {
				name: jQuery( 'input#add-artist' ).val()
			}
			//console.log( payload );
			jQuery.ajax({
				url: '/add-artist',
				type: 'POST',
				contentType: 'application/json',
				processData: false,
				data: JSON.stringify( payload ),
				complete: function( response ) {
					//console.log( JSON.parse( response.responseText ));
					jQuery( 'input#add-artist' ).val( "" );
					var data = JSON.parse( response.responseText );
					var id = data.id
					var name = data.name
					jQuery( 'table#artist' ).append(
						"<tr id='" + id + "'>\
							<td id='" + id + "'>" + id + "</td>\
							<td id='" + name + "'>" + name + "</td>\
							<td>\
								<input id='delete-artist-" + id + "' class='delete' type='submit' value='X'>\
							</td>\
						</tr>"
					)
				}
			});
		}
	});

	jQuery( document )
	.on( 'click', function( event ) {
		event.preventDefault();
		event.stopPropagation();
		event.stopImmediatePropagation();

		//console.log( event );
		var arTargetId = event.target.id.split( '-' );
		//console.log( 'arTargetId: ' + arTargetId );
		var action = arTargetId[ 0 ]
		switch( action ) {
			case 'delete':
				var what = arTargetId[ 1 ];
				switch( what ) {
					case 'artist': 
						var id = arTargetId[ 2 ];
						//console.log( 'delete artist with id as ' + id );
						deleteArtist( id );
						break;
				}
				break;
		}
	});

	function deleteArtist( id ) {
		//console.log( 'deleting artist with id as ' + id );
		var payload = {
				id: id
			}
		jQuery.ajax({
			url: '/delete-artist',
			type: 'POST',
			contentType: 'application/json',
			processData: false,
			data: JSON.stringify( payload ),
			complete: function( response ) {
				//console.log( JSON.parse( response.responseText ));
				var data = JSON.parse( response.responseText );
				if ( data.recordDeleted === true ) {
					jQuery( 'table#artist tr#' + id ).remove();
				}
			}
		})
	}
});
