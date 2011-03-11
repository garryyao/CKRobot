/**
 *@tc
 *@name test keyboard navigation on toolbar
 * @tags stable,a11y
 * @browsers ie,ff,cr
 */

// Load the page and retrieve the editor.
var editor = browser.get( "http://nightly.ckeditor.com/latest/ckeditor/_samples/replacebyclass.html" ).editor( 'editor1' );

// Move focus to toolbar.
editor.command( 'toolbarFocus' );

// Move forward to the second (New Page) button and press space key, note that
// the keys is send to the browser instead of editor.
browser.keys( Keys.ARROW_RIGHT, 2, Keys.SPACE );

Assert.areEqual("", editor.data(), "Editor output doesn't match." );

