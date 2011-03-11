/**
 *@tc
 *@name test typing repeatedly
 * @tags stable,type
 * @browsers ie,ff,cr
 */

// Load the page and retrieve the editor.
var editor = browser.get( "http://nightly.ckeditor.com/latest/ckeditor/_samples/replacebyclass.html" ).editor( 'editor1' );
// Type three same words, then delete all of them.
editor.button( 'New Page' ).type( 'repeat',3, Keys.chord( Keys.LEFT_CONTROL, Keys.BACK_SPACE), 3 );
Assert.areEqual("", editor.data(), "Editor output doesn't match." );

