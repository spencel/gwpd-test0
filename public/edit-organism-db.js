jQuery( document ).ready( function () {
	
	//console.log("script2.js loaded successfully.");

	// Initialize table
	console.log( 'initializing table' );
	jQuery.ajax({
		url: '/get-organism-table',
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
						<td id='edit-speciesName'>" + data[ iRecord ].species_name + "</td>\
						<td id='edit-commonName'>" + data[ iRecord ].common_name + "</td>\
						<td id='edit-typeName'>" + data[ iRecord ].type_name + "</td>\
						<td id='edit-familyName'>" + data[ iRecord ].family_name + "</td>\
						<td id='edit-subfamilyName'>" + data[ iRecord ].subfamily_name + "</td>\
						<td id='edit-genusName'>" + data[ iRecord ].genus_name + "</td>\
						<td id='edit-genomeTypeName'>" + data[ iRecord ].genome_type_name + "</td>\
						<td id='edit-gramStainGroupName'>" + data[ iRecord ].gram_stain_group_name + "</td>\
						<td id='edit-genomeLength'>" + data[ iRecord ].genome_length_bp + "</td>\
						<td>\
							<input id='delete-record'class='delete' type='submit' value='X'>\
						</td>\
					</tr>"
				)
			}
		}
	});

	// Autocomplete

	jQuery( function() {
    var typeName = [
    	'bacteria',
    	'helminth',
    	'protist',
    	'virus'
    ];
    var familyName = [
	    'hexamitidae',
	    'reoviridae',
	    'retroviridae',
	    'schistosomatidae',
	    'vibrionaceae'
    ];
    var subfamilyName = [
    	'giardiinae',
    	'NO SUBFAMILY',
    	'orthoretrovirinae',
    	'sedoreovirinae',
    	'vibrionaceae'
    ];
    var genusName = [
    	'giardia',
    	'lentivirus',
    	'rotavirus',
    	'schistosoma',
    	'vibrio'
    ];
    var genomeTypeName = [
    	'(+)ssDNA',
    	'(+)ssRNA',
    	'(-)ssDNA',
    	'(-)ssRNA',
    	'dsDNA',
    	'dsRNA'
    ];
    var gramStainGroupName = [
    	'gram-negative',
    	'gram-positive',
    	'NOT A PROKARYOTE'
    ];
    jQuery( "table#organism tr#new-record input#typeName" ).autocomplete({
      source: typeName
    });
    jQuery( "table#organism tr#new-record input#familyName" ).autocomplete({
      source: familyName
    });
    jQuery( "table#organism tr#new-record input#subfamilyName" ).autocomplete({
      source: subfamilyName
    });
    jQuery( "table#organism tr#new-record input#genusName" ).autocomplete({
      source: genusName
    });
    jQuery( "table#organism tr#new-record input#genomeTypeName" ).autocomplete({
      source: genomeTypeName
    });
    jQuery( "table#organism tr#new-record input#gramStainGroupName" ).autocomplete({
      source: gramStainGroupName
    });
  });

	// Handle click events
	jQuery( document )
	.on( 'click', function( event ) {
		//event.preventDefault();
		//event.stopPropagation();
		//event.stopImmediatePropagation();

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
		//console.log( 'newRecordTr:' );
		//console.log( newRecordTr );
		var payload = {
			speciesName: jQuery( '#speciesName', newRecordTr ).val(),
			commonName: jQuery( '#commonName', newRecordTr ).val(),
			typeName: jQuery( '#typeName', newRecordTr ).val(),
			familyName: jQuery( '#familyName', newRecordTr ).val(),
			subfamilyName: jQuery( '#subfamilyName', newRecordTr ).val(),
			genusName: jQuery( '#genusName', newRecordTr ).val(),
			genomeTypeName: jQuery( '#genomeTypeName', newRecordTr ).val(),
			gramStainGroupName: jQuery( '#gramStainGroupName', newRecordTr ).val(),
			genomeLength: jQuery( '#genomeLength', newRecordTr ).val()
		}
		console.log( 'payload:' );
		console.log( payload );
		jQuery.ajax({
			url: '/add-organism',
			type: 'POST',
			contentType: 'application/json',
			processData: false,
			data: JSON.stringify( payload ),
			complete: function( response ) {
				console.log( 'completing ajax' );
				console.log( `response text: ${response.responseText}` );
				console.log( JSON.parse( response.responseText ));
				var data = JSON.parse( response.responseText );
				console.log()
				if ( data.recordAdded === true ) {

					// reset values
					jQuery( '#speciesName', newRecordTr ).val('');
					jQuery( '#commonName', newRecordTr ).val('');
					jQuery( '#typeName', newRecordTr ).val('');
					jQuery( '#familyName', newRecordTr ).val('');
					jQuery( '#subfamilyName', newRecordTr ).val('');
					jQuery( '#genusName', newRecordTr ).val('');
					jQuery( '#genomeTypeName', newRecordTr ).val('');
					jQuery( '#gramStainGroupName', newRecordTr ).val('');
					jQuery( '#genomeLength', newRecordTr ).val('');

					// append new record
					console.log( 'set:' );
					console.log( data.record );
					jQuery( 'table#organism' ).append(
						"<tr id='" + data.id + "'>\
							<td id='edit-speciesName'>" + data.record[ 0 ].species_name + "</td>\
							<td id='edit-commonName'>" + data.record[ 0 ].common_name + "</td>\
							<td id='edit-typeName'>" + data.record[ 0 ].type_name + "</td>\
							<td id='edit-familyName'>" + data.record[ 0 ].family_name + "</td>\
							<td id='edit-subfamilyName'>" + data.record[ 0 ].subfamily_name + "</td>\
							<td id='edit-genusName'>" + data.record[ 0 ].genus_name + "</td>\
							<td id='edit-genomeTypeName'>" + data.record[ 0 ].genome_type_name + "</td>\
							<td id='edit-gramStainGroupName'>" + data.record[ 0 ].gram_stain_group_name + "</td>\
							<td id='edit-genomeLength'>" + data.record[ 0 ].genome_length_bp + "</td>\
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
