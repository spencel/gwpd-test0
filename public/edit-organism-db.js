jQuery( document ).ready( function () {
	
	//console.log("script2.js loaded successfully.");

	// Initialize table
	console.log( 'initializing table' );
	jQuery.ajax({
		url: 'get-organism-table',
		type: 'POST',
		complete: function( response ) {
			//console.log( response );
			var data = JSON.parse( response.responseText );
			var totalRecords = data.length;
			console.log( data );		
			// Add records
			for ( var iRecord in data ) {
				jQuery( 'table#organism' ).append(
					"<tr id='" + data[ iRecord ].id + "'>\
						<td id='edit-speciesName'>" + data[ iRecord ].speciesName + "</td>\
						<td id='edit-commonName'>" + data[ iRecord ].commonName + "</td>\
						<td id='edit-type'>" + data[ iRecord ].typeId + "</td>\
						<td id='edit-familyName'>" + data[ iRecord ].familyNameId + "</td>\
						<td id='edit-subfamilyName'>" + data[ iRecord ].subfamilyNameId + "</td>\
						<td id='edit-genusName'>" + data[ iRecord ].genusNameId + "</td>\
						<td id='edit-genomeType'>" + data[ iRecord ].genomeTypeId + "</td>\
						<td id='edit-gramStain'>" + data[ iRecord ].gramStainId + "</td>\
						<td id='edit-genomeLength'>" + data[ iRecord ].genomeLength + "</td>\
						<td>\
							<input id='delete-record'class='delete' type='submit' value='X'>\
						</td>\
					</tr>"
				)
			}
		}
	});

	// Handle click events
	jQuery( document )
	.on( 'click', function( event ) {
		event.preventDefault();
		event.stopPropagation();
		event.stopImmediatePropagation();

		console.log( event );
		var action = event.target.id;
		console.log( 'action: ' + action );
		switch( action ) {
			case 'add-record':
				console.log( 'adding record' );
				addRecord();
				break;
			case 'delete-record':
				console.log( 'deleting record' );
				console.log( event.target.parentElement.parentElement.id );
				deleteRecord( event.target.parentElement.parentElement.id );
				break;
		}
	});

	// Add new record
	function addRecord() {
		var newRecordTr = jQuery( 'table#organism tr#new-record' );
		console.log( 'newRecordTr:' );
		console.log( newRecordTr );
		var payload = {
			speciesName: jQuery( '#speciesName', newRecordTr ).val(),
			commonName: jQuery( '#commonName', newRecordTr ).val(),
			type: jQuery( '#type', newRecordTr ).val(),
			familyName: jQuery( '#familyName', newRecordTr ).val(),
			subfamilyName: jQuery( '#subfamilyName', newRecordTr ).val(),
			genusName: jQuery( '#genusName', newRecordTr ).val(),
			genomeType: jQuery( '#genomeType', newRecordTr ).val(),
			gramStain: jQuery( '#gramStain', newRecordTr ).val(),
			genomeLength: jQuery( '#genomeLength', newRecordTr ).val()
		}
		console.log( payload );
		jQuery.ajax({
			url: '/add-organism',
			type: 'POST',
			contentType: 'application/json',
			processData: false,
			data: JSON.stringify( payload ),
			complete: function( response ) {
				console.log( 'completing ajax' );
				console.log( JSON.parse( response.responseText ));
				var responseData = JSON.parse( response.responseText );
				console.log()
				if ( responseData.recordAdded === true ) {

					// reset values
					jQuery( '#speciesName', newRecordTr ).val('');
					jQuery( '#commonName', newRecordTr ).val('');
					jQuery( '#type', newRecordTr ).val('');
					jQuery( '#familyName', newRecordTr ).val('');
					jQuery( '#subfamilyName', newRecordTr ).val('');
					jQuery( '#genusName', newRecordTr ).val('');
					jQuery( '#genomeType', newRecordTr ).val('');
					jQuery( '#gramStain', newRecordTr ).val('');
					jQuery( '#genomeLength', newRecordTr ).val('');

					// append new record
					console.log( 'set:' );
					console.log( responseData.set );
					jQuery( 'table#organism' ).append(
						"<tr id='" + responseData.id + "'>\
							<td id='edit-speciesName'>" + responseData.set.speciesName + "</td>\
							<td id='edit-commonName'>" + responseData.set.commonName + "</td>\
							<td id='edit-type'>" + responseData.set.typeId + "</td>\
							<td id='edit-familyName'>" + responseData.set.familyNameId + "</td>\
							<td id='edit-subfamilyName'>" + responseData.set.subfamilyNameId + "</td>\
							<td id='edit-genusName'>" + responseData.set.genusNameId + "</td>\
							<td id='edit-genomeType'>" + responseData.set.genomeTypeId + "</td>\
							<td id='edit-gramStain'>" + responseData.set.gramStainId + "</td>\
							<td id='edit-genomeLength'>" + responseData.set.genomeLength + "</td>\
							<td>\
								<input id='delete-record'class='delete' type='submit' value='X'>\
							</td>\
						</tr>"
					);
				}
			}
		})
	}

	// Delete record
	function deleteRecord( id ) {
		//console.log( 'deleting artist with id as ' + id );
		var payload = {
				id: id
			}
		jQuery.ajax({
			url: '/delete-organism',
			type: 'POST',
			contentType: 'application/json',
			processData: false,
			data: JSON.stringify( payload ),
			complete: function( response ) {
				//console.log( JSON.parse( response.responseText ));
				var data = JSON.parse( response.responseText );
				if ( data.recordDeleted === true ) {
					jQuery( 'table#organism tr#' + id ).remove();
				}
			}
		});
	}
});
