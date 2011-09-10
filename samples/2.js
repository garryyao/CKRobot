/**
 * @tc
 * @name test applying formatting style
 * @tags stable,style,combo
 */

// Load the page, switch the demo page language to 'en'.
browser.get( vars[ 'base' ] + "ui_languages.html" );
sampleLanguageTo( 'en' );

var editor = browser.editor( 'editor1' );

// Put cursor in doc, open formatting combo and apply "heading 3" style.
editor.focus().button( 'Paragraph Format' ).panel().item( 'Heading 3' );

// Verify editor output.
Assert.areEqual("<h3>\n	This is some <strong>sample text</strong>. You are using <a href=\"http://ckeditor.com/\">CKEditor</a>.</h3>\n",
    editor.data(), "Editor output doesn't match." );

