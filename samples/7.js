/**
 * @tc
 *@name test adjusting test speed
 * @tags stable,speed
 * @browsers ie,ff,cr
 */

browser.stepSpeed( 3000 )
.typeSpeed( 'slow' );

var editor = browser.get( "http://nightly.ckeditor.com/latest/ckeditor/_samples/replacebyclass.html" ).editor( 'editor1');
editor.type( "I'm typing very slow...", Keys.ENTER );
Assert.isTrue( true );

