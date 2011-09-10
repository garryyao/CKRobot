/**
 * @tc
 * @name test keyboard navigation on toolbar
 * @tags stable,a11y
 */

// Load the page, switch the demo page language to 'en'.
browser.get( vars[ 'base' ] + "ui_languages.html" );
sampleLanguageTo( 'en' );

var editor = browser.editor( 'editor1' ).focus();

// Move focus to toolbar.
editor.command( 'toolbarFocus' );

// Give a while to browser when moving focus.
wait( 200 );

// Move forward to the second (New Page) button and press space key, note that
// the keys is send to the browser instead of editor.
browser.keys( Keys.ARROW_RIGHT, 2, Keys.SPACE );

Assert.areEqual("", editor.data(), "Editor output doesn't match." );

