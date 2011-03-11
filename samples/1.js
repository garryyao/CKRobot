/**
 * @tc
 *@name test text editing and inline styles application.
 * @tags stable,type,style,panel
 * @browsers ie,ff,cr
 */

// Load the page.
var editor = browser.get( "http://nightly.ckeditor.com/latest/ckeditor/_samples/replacebyclass.html" ).editor( 'editor1' );

// Move focus into editor and clear all content.
editor.focus( 'editor1' ).type( Keys.CONTROL, "a" ).type( Keys.DELETE );

// Adding some text
editor.type( "This's a unit" );
editor.type( Keys.CONTROL, Keys.BACK_SPACE );
editor.type( "functional test for" );
editor.type( Keys.CONTROL, Keys.LEFT );
editor.type( Keys.CONTROL, Keys.LEFT );
editor.type( Keys.LEFT );
editor.type( Keys.CONTROL, Keys.LEFT_SHIFT, Keys.LEFT );

// Apply bold style by Ctrl-B.
editor.type( Keys.CONTROL, "b" );
editor.type( Keys.END, Keys.ENTER );
editor.type( "CKEditor" );

// Select last word "CKEditor" and apply blue background color over it.
editor.selection( "//p[2]/text()[1]`0,//p[2]/text()[1]`8" )
.button( 'Background Color' )
.panel()
.item( 'Blue' );


// Verify editor output, note that color styles vary from browsers.
var expected;
switch( env )
{
	case 'ie' : expected  = '<p>This&#39;s a <strong>functional</strong> test for</p><p><span style="background-color: #0000cd">CKEditor</span></p>';break;
	case 'ff' : expected  = '<p>This&#39;s a <strong>functional</strong> test for</p><p><span style="background-color: rgb(0, 0, 205);">CKEditor</span></p>';break;
	case 'cr' : expected  = '<p>This&#39;s a <strong>functional</strong> test for</p><p><span style="background-color:#0000cd;">CKEditor</span></p>';break;
}
Assert.areEqual(expected, editor.compactData(), "Editor output doesn't match." );
