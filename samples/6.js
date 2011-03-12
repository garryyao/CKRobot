/**
 * @tc
 * @name test creating a nested list.
 * @tags stable,list
 * @browsers ie,ff,cr
 */

// Load the page, switch the demo page language to 'en'.
browser.get( "http://nightly.ckeditor.com/latest/ckeditor/_samples/ui_languages.html" );
sampleLanguageTo( 'en' );

var editor = browser.editor( 'editor1' );

editor.button( 'New Page' )
.button( 'Numbered List' )
.type( 'item1', Keys.ENTER )
// Create nested list.
.button( 'Increase Indent' )
.type( 'item2',Keys.ENTER, Keys.ENTER )
.type( 'item3',Keys.ENTER, Keys.ENTER );

// Verify compact output data.
Assert.areEqual("<ol><li>item1<ol><li>item2</li></ol></li><li>item3</li></ol><p>&nbsp;</p>",
                editor.compactData(), "Editor output doesn't match." );

