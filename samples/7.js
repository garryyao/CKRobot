/**
 * @tc
 * @name test table editing
 * @tags stable,table,menu
 * @browsers ie,ff
 */

// Load the page, switch the demo page language to 'en'.
browser.get( vars[ 'base' ] + "ui_languages.html" );
sampleLanguageTo( 'en' );

var editor = browser.editor( 'editor1');
// Empty the doc and insert one default table.
editor.empty().button( 'Table' ).dialog().button('OK');
// Fill in cell contents, start from the first cell.
editor.selection( "//td[1]`0" )
.type('cell1', Keys.TAB)
.type('cell2', Keys.TAB)
.type('cell3', Keys.TAB)
.type('cell4', Keys.TAB)
.type('cell5', Keys.TAB)
.type('cell6')
// Select all cells and merge them into one.
.selection( "//tr[1]/td[1]/text()`0,//tr[3]/td[2]/text()`5" )
.contextmenu()
.panel().item( 'Cell' )
.sub().item( 'Merge Cells' );

// Verify editor output.
Assert.areEqual('<table border="1" cellpadding="1" cellspacing="1" style="width: 500px;"><tbody><tr><td>cell1cell2<br />cell3cell4<br />cell5cell6</td></tr></tbody></table><p>&nbsp;</p>',
    editor.compactData(), "Editor output doesn't match." );


