/**
 * @tc
 * @name test typing repeatedly
 * @tags stable,type
 */

// Load the page, switch the demo page language to 'en'.
browser.get( vars[ 'base' ] + "ui_languages.html" );
sampleLanguageTo( 'en' );

var editor = browser.editor( 'editor1' );

// Type three same words, then delete all of them.
editor.button( 'New Page' ).type( 'repeat',3, Keys.chord( Keys.LEFT_CONTROL, Keys.BACK_SPACE), 3 );
Assert.areEqual("", editor.data(), "Editor output doesn't match." );

