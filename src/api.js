var step = 2000;

/**
 * The top controller for a browser page, don't instantiate this class,
 * a global singleton "browser" is always available. 
 * @class
 */
function BrowserBot( driver )
{
	/** @lends BrowserBot.prototype */
	return wave({

		meta :
		{
			chainable : [ 'get', 'stepSpeed','typeSpeed','keys' ],
			pacify : [ 'get' ]
		},

		/**
		 * Load the current page with specified url.
		 * @function
		 * @param url
		 * @returns {BrowserBot}
		 */
		get : function( url )
		{
			driver.get( url );
			// Load selenium core after page up.
			driver.executeScript( readFile( new File( 'lib/selenium-core.js' ) )
				+ 'self.Selenium = Selenium;'
				+ 'self.selenium = Selenium.createForWindow( self );');
		},

		/**
		 * Adjust the interval between actions.
		 * @param {Number} Milliseconds.
		 * @returns {BrowserBot}
		 */
		stepSpeed : function( msec )
		{
			step = msec;
		},

		/**
		 * Adjust the keyboard typing speed.
		 * @param {String} speed One of "fast","medium" or "slow".
		 * @returns {BrowserBot}
		 */
		typeSpeed : function( speed )
		{
			driver.manage().setSpeed( Speed[ speed.toUpperCase() ]);
		},

		/**
		 * @ignore
		 */
		active : function()
		{
			return driver.switchTo().activeElement();
		},

		/**
		 * Send keystrokes to the current page element under focus.
		 * @see EditorBot.type
		 * @returns {BrowserBot}
		 */
		keys : function()
		{
			var target = this.active();
			target.sendKeys.apply( target, repeat( arguments ) );
		},

		/**
		 * Retrieve the controller for the specified editor name
		 * @param {String} name  name of the editor
		 * @returns {EditorBot}
		 */
		editor : function( name )
		{
			return new EditorBot( name );
		}
	});
}

/**
 * Controller for driving per editor instance, don't instantiate this class, retrieve it by calling {@link BrowserBot.editor}.
 * @class 
 */
function EditorBot( name )
{
	function runAtEditor( fn ) { return runAtBrowser( fn, 'var editor = CKEDITOR.instances["'+name+'"];\n' ); }

	/** @lends EditorBot.prototype */
	return wave({
		meta :
		{
			chainable : [ 'selection', 'focus','command','empty','type','button','contextmenu' ],
			pacify : [ 'focus','empty','button','contextmenu','data' ]
		},

		/**
		 * <p>Make a text selection in editor, the range is denoted by the following pattern:</p>
		 * <p><strong>&lt;xpath of anchor node&gt; ' &lt;start offset&gt;, [ &lt;xpath of the focus node&gt; ' end offset ]</strong></p>
		 * <p>If the second part (of range end) is omitted, a collapsed selection on the anchor node is made.</p>
		 * @function
		 *@param selectionMark {String} selection range denotes
		 * Note: Editor must gain focus before calling this method.
		 * @example
		 * // Select word "CKEditor" from following content:
		 * // &lt;p&gt;line1&lt;p&gt;&lt;a href=&quot;#&quot;&gt;CKEditor&lt;/a&gt;&lt;/p&gt;
		 * editor.selection( "//p[1]/a/text()[1]`0,//p[1]/a/text()[1]`8" );
		 * @returns {EditorBot}
		 */
		selection : runAtEditor( function ( selectionMark )
		{
			selectionMark = selectionMark.split(',');

			var range,
				start = selectionMark[ 0 ].split( '`'),
				startPath = start[ 0 ],
				startNode,
				startOffset = Number( start[ 1 ] ),
				// End is optional.
				end = selectionMark[ 1 ] && selectionMark[ 1 ].split( '`'),
				endPath = end && end[ 0 ],
				endNode,
				endOffset = end && Number( end[ 1 ] );

			var doc = editor.document;

			// Clear up the document dirties for the xpath evaluation.
			var fillingChar = doc.removeCustomData( 'cke-fillingChar' );
			fillingChar && fillingChar.setText( fillingChar.getText().replace( /\u200B/g, '' ) );
			doc.getBody().$.normalize();

			var selenium = Selenium.createForWindow( editor.window.$ );
			startNode = selenium.page().findElement( startPath );
			endPath && ( endNode = selenium.page().findElement( endPath ) );

			range = new CKEDITOR.dom.range(  doc );
			range.setStart( new CKEDITOR.dom.node( startNode ), startOffset );
			endNode && range.setEnd( new CKEDITOR.dom.node( endNode ), endOffset );
			range.select();
		} ),

		/**
		 * Move focus into the editor frame.
		 * @function
		 * @returns {EditorBot}
		 */
		focus : runAtEditor( function()
	   {
		   editor.focus();
	   } ),

		/**
		 * Execute the specified editor command.
		 * @param {String} commandName  The command name defined in editor.
		 * @returns {EditorBot}
		 */
		command : function()
		{
			runAtEditor( function() { return  editor.execCommand.apply( editor, arguments ); } ).apply( this, arguments );
		},

		/**
		 * An utility method to clear all content of editor doc by calling the new page command.
		 * @returns {EditorBot}
		 */
		empty : function()
		{
			this.command( 'newpage' );
		},

		/**
		 * <p>Typing into the editor document with specified keystroke sequence.</p>
		 * <ul>
		 *     <li>String with each character an ascii char, e.g. editor.type("word");</li>
		 *      <li>Keys enum that present one non-ascii key, e.g. editor.type(Keys.ENTER)</li>
		 *      <li>Return value of Keys.chord that present a combination of multiple keys, e.g. editor.type(Keys.chord(Keys.LEFT_CTRL,Keys.F10))</li>
		 *      <li>A single number n indicate that the previous keystroke will be repeated n-1 times, e.g. editor.type( 'a', 3, 'b', 2); // 'aaabb' </li>
		 * </ul>
		 * <p><strong>Note:</strong> list of supported non-ascii keys:</p>
		 * <pre>NULL,  CANCEL,  HELP,  BACK_SPACE,  TAB,  CLEAR,  RETURN,  ENTER,  SHIFT,  LEFT_SHIFT,  CONTROL,  LEFT_CONTROL,
		 * ALT,  LEFT_ALT,  PAUSE,  ESCAPE,  SPACE,  PAGE_UP,  PAGE_DOWN,  END,  HOME,  LEFT,  ARROW_LEFT,  UP,  ARROW_UP,
		 * RIGHT,  ARROW_RIGHT,  DOWN,  ARROW_DOWN,  INSERT,  DELETE,  SEMICOLON,  EQUALS,  NUMPAD0,  NUMPAD1,  NUMPAD2,
		 * NUMPAD3,  NUMPAD4,  NUMPAD5,  NUMPAD6,  NUMPAD7,  NUMPAD8,  NUMPAD9,  MULTIPLY,  ADD,  SEPARATOR,  SUBTRACT,
		 * DECIMAL,  DIVIDE,  F1,  F2,  F3,  F4,  F5,  F6,  F7,  F8,  F9,  F10,  F11,  F12,  META,  COMMAND</pre>
		 * @param {String|Number|Key|Chord} keyStroke...  the keystroke to immolate keyboard input.
		 * @returns {EditorBot}
		 */
		type :  function()
		{
			var body = runAtEditor( function() { return  editor.document.getBody().$; } )();
			body.sendKeys.apply( body, repeat( arguments ) );
		},

		/**
		 * Click the specified button from the editor toolbar or any others available ones.
		 * @function
		 * @param title {String} Title attribute of the link element that plays the role of a button.
		 */
		button : runAtEditor( function( title )
		{
		 var selector = '//*[@id="cke_'+ editor.name + '"]//*[@role="toolbar"]//a[contains(@title,"' + title + '")]';
		 selenium.doClick( selector );
		} ),

		/**
		 * Open editor context menu at the cursor positon.
		 */
		 contextmenu :  function()
		{
			this.focus();
			// 	Currently there's no right click method in WebDriver, go keyboard shortcut Shift+F10 to simulate it.
			this.type( Keys.chord(Keys.SHIFT, Keys.F10) );
		},

		/**
		 * Retrieve the driver of currently opened topmost editor dialog.
		 */
		dialog : function()
		{
			return new DialogBot( name );
		},

		/**
		 * Retrieve the driver of the currently opened editor panel, including rich combo drop-down, button menu and context menu.
		 */
		panel : function()
		{
			return new PanelBot( name );
		},

		/**
		 * Retrieve or load the editor with the specified data.
		 * @param {String} data
		 * @returns {String|Undefined}
		 */
		data : function( data )
		{
			var retval = runAtEditor(
					function( data )
					{
						if ( data )
							editor.setData( data );
						else
							return editor.getData();
					} ).apply( this, arguments );

			data && wait( step );
			return retval;
		},

		/**
		 * Retrieve the compressed editor data that contains no formatting characters.
		 */
		compactData : function()
		{
			return runAtEditor( function( data )
			{
				var fragment = CKEDITOR.htmlParser.fragment.fromHtml( data ),
					writer = new CKEDITOR.htmlParser.basicWriter();
				fragment.writeHtml( writer );
				return writer.getHtml( true );
			} )( this.data() );
		}
	});
}

/**
 * Controller of the current opened editor dialog, don't instantiate this class, retrieve it by calling {@link EditorBot.dialog}.
 * @class
 */
function DialogBot( editor )
{
	function runAtDialog( fn ) { return runAtBrowser( fn,
		"var context = \"//div[not(contains(@style,'display: none') or contains(@style,'DISPLAY: none')) and @role='dialog']/table[contains(@class,'cke_dialog')]\";" ); }

	function runAtPage( fn ) { return runAtBrowser( fn,
		"var context = \"//div[not(contains(@style,'display: none') or contains(@style,'DISPLAY: none')) and @role='dialog']/table[contains(@class,'cke_dialog')]" +
		"//*[@role='tabpanel' and not(contains(@style,'display: none') or contains(@style,'DISPLAY: none'))]\";" ); }


	/** @lends DialogBot.prototype */
	return wave({
		meta :
		{
			chainable : [ 'button', 'page' ],
			pacify : [ 'button', 'page' ]
		},

		/**
		 * Click the specified dialog button.
		 * @function
		 * @param {String} title Title attribute of the link element that plays the role of a dialog button.
		 * @returns {DialogBot}
		 */
		button : runAtDialog( function( title )
		{
			selenium.doClick( context + "//*[@role='button' and @title='"+ title + "']" );
		}),

		/**
		 * Activate the specified dialog tab page.
		 * @function
		 * @param {String} title  Title attribute of the link element that plays the role of a dialog tab button.
		 * @returns {DialogBot}
		 */
		page : runAtDialog( function( page )
		{
			selenium.doClick( context + "//*[@role='tab' and contains(@title,'"+ page + "')]" );
		}),

		/**
		 * Focus the input element of the specified dialog field
		 * and retrieve the controller of that field.
		 * @function
		 * @param {String} label Label text of the dialog field.
		 * @returns {InputBot}
		 */
		field : function()
		{
			var input = runAtPage( function( label )
					{
						var field = context + "//label[contains(text(),'"+ label + "')]/following-sibling::*//",
							input = [field + 'input', field + 'select'].join( '|' );
						selenium.doFocus( input );
						return selenium.page().findElement( input );
					}).apply( this, arguments );

			return new InputBot( input );
		}
	});
}

/**
 * Controller of a (dialog) input field, don't instantiate this class, retrieve it by calling {@link DialogBot.field}.
 * @class
 */
function InputBot( input )
{
	/** @lends InputBot.prototype */
	return wave({
		meta :
		{
			chainable : [ 'type', 'select','clear', 'toggle' ],
			pacify : [ 'type', 'select', 'clear', 'toggle' ]
		},

		/**
		 * Typing into the current text/password/file input.
		 * @see EditorBot.type
		 * @returns {InputBot}
		 */
		type : function()
		{
			input.sendKeys.apply( input, repeat( arguments ) );
		},

		/**
		 * Add the specified option(sto the current select input.
		 * @param {String} label...  one or more label text of the option(s)
		 * @returns {InputBot}
		 */
		select : function( label )
		{
			_.forEach( arguments, function( label )
			{
				var option = input.findElement( By.xpath("//option[contains(text(),'" + label + "')]") );
				!option.isSelected() && option.setSelected();
			} );
		},

		/**
		 * Empty the current input value.
		 * @returns {InputBot}
		 */
		clear : function()
		{
			input.clear();
		},

		/**
		 * Check/uncheck the current radio or checkbox input.
		 * @returns {InputBot}
		 */
		toggle : function()
		{
			input.toggle();
		}
	});
}

/**
 * Controller of all panel-like UI controls including dropdown, context menu, button menu, etc, don't instantiate this class, retrieve it by calling {@link EditorBot.panel}.
 * @class
 */
function PanelBot( editor, parent )
{
	// Select any visible panel on the page that is not the parent panel if specified,
	// base on the assumption that there are at most two panels visible per page.
	function runAtPanel( fn ) { return runAtBrowser( fn,
	    "var iframe = selenium.page().findElement( \"" +
		"//div[not(contains(@style,'display: none') or contains(@style,'DISPLAY: none'))]/div[contains(@class,'cke_panel')]/iframe[not(@id='"+ parent + "')]\" );" +
		"var panel = iframe.contentWindow;" ); }

	/** @lends PanelBot.prototype */
	return wave({
		meta : {
			chainable : [ 'item', 'close' ],
			pacify : [ 'item', 'close' ]
		},

		/**
		 * Close the current panel.
		 * @returns {PanelBot}
		 */
		close : function()
		{
			runAtPanel( function() { panel.focus(); } );
			browser.keys( Keys.ESCAPE );
		},

		/**
		 * Select the specified menu item (for menu) or list item (for list) from the panel.
		 * @function
		 * @param title {String} Title attribute of the link element that plays the role of either an menu item or list option.
		 * @returns {PanelBot}
		 */
		item : runAtPanel(function( title )
		{
			var se = Selenium.createForWindow( panel );
			se.doClick( "//a[contains(@title,'"+ title + "')]" );
		}),

		/**
		 * Retrieve the controller of the sub menu opened from this menu.
		 * @returns {PanelBot}
		 */
		sub : function()
		{
			return PanelBot( editor, runAtPanel( function () { return iframe.id;} )() );
		}
	});
}

/**
 * @param fn {Function} The function whose content will be be executed at browser.
 * @param [head] {String} An optional head code in front of the function body, this's usually used to establish environment variables.
 */
function runAtBrowser( fn, head )
{
	var source = fn.toSource(),
		content;

	head = head || '';

	// Receiving other arguments.
	source.replace( /function\b.*?\((.*?)\)/,function( match, paramStr )
	{
		if ( paramStr )
		{
			_.forEach( paramStr.split( ',' ), function( name, pos )
			{
				head += [ 'var',name,'=','arguments[',pos,'];\n'].join(' ');
			});
		}
	}).replace(/.*?\{(.*)\}/,function( match, body )
	{
		content = body;
	});

	return function()
	{
		// Make sure execution context is always at the main window.
		driver.switchTo().defaultContent();
		var val = driver.executeScript.apply( driver,[ head + content ].concat( _(arguments).toArray() ) );
		if ( val instanceof java.lang.String )
			val = String( val );
		return val;
	};
}

function wait( msecs )
{
	Thread.sleep(msecs);
}

// Pause for a while after function execution.
function pace( org )
{
	var retval = org.apply( this, _(arguments).slice( 1 ) );
	wait( step );
	return retval;
}

function chain( org)
{
	org.apply( this, _(arguments).slice( 1 ) );
	return this;
}

// Repeat previous keystroke when encountering any
// number appeared in key sequence.
function repeat( keys )
{
	keys = _( keys );
	var retval = [];
	keys.forEach( function( key, i )
	{
		if ( typeof key == 'number' )
		{
			var count = key - 1,
				repeat = keys.value()[ i -1 ];

			if ( repeat && typeof repeat != 'number' )
			{
				for ( var j = 0; j < count; j++ )
					retval.push( repeat );
			}
		}
		else
			retval.push( key );
	});

	return retval;
}

// Add chain-ability and pace speed into actions
// according to the meta defined on the object.
function wave( obj )
{
	var meta = obj.meta,
		chainable = meta && meta.chainable,
		pacify = meta && meta.pacify;

	_.forEach( obj, function( val, key )
	{
		if ( typeof val != 'function' )
			return;

		if ( chainable && chainable.indexOf( key ) != -1 )
			obj[ key ] = _.wrap( val, chain );
		if ( pacify && pacify.indexOf( key ) != -1 )
			obj[ key ] = _.wrap( obj[ key ], pace );

	});

	delete obj.meta;
	return obj;
}
