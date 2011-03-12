/**
 * @tc
 * @name test text editing and inline styles application.
 * @tags stable,type,style,panel
 * @browsers ie,ff,cr
 */

// Load the page, switch the demo page language to 'en'.
browser.get( "http://nightly.ckeditor.com/latest/ckeditor/_samples/ui_languages.html" );
sampleLanguageTo( 'en' );

var editor = browser.editor( 'editor1' );

editor.button( 'Link');
// Move focus into editor and clear all content.
editor.focus( 'editor1' )
.type( Keys.CONTROL, "a" ).type( Keys.DELETE )
// Adding some text
.type( "This's a unit" )
.type( Keys.CONTROL, Keys.BACK_SPACE )
.type( "functional test for" )
.type( Keys.CONTROL, Keys.LEFT )
.type( Keys.CONTROL, Keys.LEFT )
.type( Keys.LEFT )
.type( Keys.CONTROL, Keys.LEFT_SHIFT, Keys.LEFT )

// Apply bold style by Ctrl-B.
.type( Keys.CONTROL, "b" )
.type( Keys.END, Keys.ENTER )
.type( "CKEditor" )

// Select last word "CKEditor" and apply blue background color over it.
.selection( "//p[2]/text()[1]`0,//p[2]/text()[1]`8" )
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
