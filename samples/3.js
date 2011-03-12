/**
 * @tc
 * @name test edit link properties
 * @tags stable,link,dialog
 * @browsers ie,ff,cr
 */

// Load the page, switch the demo page language to 'en'.
browser.get( "http://nightly.ckeditor.com/latest/ckeditor/_samples/ui_languages.html" );
sampleLanguageTo( 'en' );

var editor = browser.editor( 'editor1' );

// Open link dialog via context menu.
editor.focus().selection( "//a/text()`2" ).contextmenu();

// Click on edit link men option.
editor.panel().item( 'Edit Link' );

// Fill in dialog fields.
var dialog = editor.dialog();
dialog.field('Link‌ Type').select( 'E-mail' )
dialog.field( 'E-Mail Address' ).type( "someone@unkown.com" )
dialog.page('Advanced').field( 'Id' ).type( "test-link-id" )
dialog.button('OK');

// Verify editor output.
Assert.areEqual("<p>\n	This is some <strong>sample text</strong>. You are using <a href=\"mailto:someone@unkown.com\" id=\"test-link-id\">CKEditor</a>.</p>\n",
    editor.data(), "Editor output doesn't match." );


