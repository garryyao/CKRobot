/**
 * @tc
 * @name test adjusting test speed
 * @tags stable,speed
 * @browsers ie,ff,cr
 */

// Load the page, switch the demo page language to 'en'.
browser.get( "http://nightly.ckeditor.com/latest/ckeditor/_samples/ui_languages.html" );
sampleLanguageTo( 'en' );
browser.stepSpeed( 3000 ).typeSpeed( 'slow' );

var editor = browser.editor( 'editor1');
editor.type( "I'm typing very slow...", Keys.ENTER );
Assert.isTrue( true );

