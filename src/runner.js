// JVM and util libraries.
importPackage(java.lang);
importClass(java.text.SimpleDateFormat);
importClass( java.io.File );
importClass( java.io.FileReader );
importClass( java.io.BufferedReader );
importClass( java.io.BufferedReader );
importClass( org.apache.commons.io.FileUtils );

// Apache CLI
importPackage(org.apache.commons.cli);

// Ant libraries.
importClass( org.apache.tools.ant.Project );
importClass( org.apache.tools.ant.ProjectHelper );
importClass( org.apache.tools.ant.types.FileSet );

// Selenium2 - WebDriver packages.
importPackage(org.openqa.selenium);
importPackage(org.openqa.selenium.chrome);
importPackage(org.openqa.selenium.firefox);
importPackage(org.openqa.selenium.ie);

load( 'lib/underscore.js' );
load( 'lib/template.js' );
load( 'lib/env.js' );
load( 'lib/yuitest.js' );
load( 'src/patch.js' );

// Shortcuts for YUITest
var TestRunner = YUITest.TestRunner,
	TestSuite = YUITest.TestSuite,
	TestCase = YUITest.TestCase,
	Assert = YUITest.Assert;

var args = arguments;
( function()
{
	var DEFAULT_BROWSERS = [ 'ie','ff','cr' ],
		BROWSER_DRIVERS = { 'ie': 'InternetExplorerDriver','ff': 'FirefoxDriver', 'cr' : 'ChromeDriver' };

	// Reused browser sessions among test cases.
	var driverPool = {};

	// Test apis are loaded per test case.
	var testAPIs;

	// Build the CLI.
	var options = new Options();
	options.addOption( OptionBuilder.withArgName( "tests scripts repository" )
		   .isRequired()
		   .hasArgs()
		   .withValueSeparator( ',' )
		   .withDescription( "specify the location of the tests repository, default to be the parent directory. " +
											"E.g. ../tests" )
		   .create( "r" ) );

	options.addOption( OptionBuilder.withArgName( "tag1,tag2,..." )
		   .hasArgs()
		   .withValueSeparator( ',' )
		   .withDescription( "specify one or more tags on which test script would run. E.g. stable,a11y" )
		   .create( "t" ) );

	options.addOption( OptionBuilder.withArgName( "path1,path1,..." )
		   .hasArgs()
		   .withValueSeparator( ',' )
		   .withDescription( "specify one or more test script path (relative to repository) on which test script would run. " +
			                                 "E.g. tt/1234/1.js,dt/plugins/link/createLink.js" )
		   .create( "p" ) );

	options.addOption( OptionBuilder.withArgName( "reportdir" )
		   .hasArg()
		   .withDescription( "specify the directory where test reports are created, default to 'report'. " )
		   .create( "o" ) );

	options.addOption( OptionBuilder.withArgName( "browser1,browser2,..." )
		   .hasArgs()
		   .withValueSeparator( ',' )
		   .withDescription( "testing only the specified browsers in ignorance of what been assigned in @browsers of test script. " +
											 "E.g. ie,ff,ch" )
		   .create( "b" ) );

	options.addOption( new org.apache.commons.cli.Option( "s","reportstamp", false,
		  "Whether generate report every once in a new folder named by time stamp" ) );

	var parser = new PosixParser();

	try
	{
		var cmd = parser.parse( options, args );
		var cTags, cBrowsers, cPaths;

		// Repository location and script criteria are required.
		if ( cmd.hasOption( 'r' ) )
		{
			// Specified test script path have priorities over tags.
			if ( cmd.hasOption( 'p' ) )
				cPaths = _.map( cmd.getOptionValues( 'p' ), String );
			else if ( cmd.hasOption( 't' ) )
				cTags = _.map( cmd.getOptionValues( 't' ), String );

			if ( cmd.hasOption( 'b') )
				cBrowsers = _.map( cmd.getOptionValues( 'b' ), String );
		}
		else
			throw new Error();
	}
	catch( e )
	{
		console.log( '\nCKRobot - CKEditor functional testing automated!\n');
		var formatter = new HelpFormatter();
		formatter.printHelp( "ckrobot", options )
		return;
	}

	// Have fun.
	console.log( navigator.userAgent );

	// Modify the followng to define working directories and paths.
	var project = new Project(),
		reportDir = new File( cmd.getOptionValue( 'o','reports' ) ),
		rootDir = new File( cmd.getOptionValue( 'r', '../') ),
		includesWilcard = '**/*.js',
		excludesWilcard = '**/_assets/**/*';

	// Grouping all the cell files.
	var fs = new FileSet();
	fs.setDir( new File( rootDir ) );
	fs.setIncludes( includesWilcard );
	fs.setExcludes( excludesWilcard );
	var srcFiles = fs.getDirectoryScanner( project ).getIncludedFiles();

	// Test scripts registration by scanning the scripts repository.
	var tests = [],
			testInfo, testPath,testFile,content;
	for ( var i = 0; i < srcFiles.length; i++ )
	{
		testPath = String( srcFiles[ i ] );
		testFile = new File( rootDir, testPath );
		content = readFile( testFile );
		testInfo = { file : testFile, path : testPath, tags: [], name : 'Untitled', browsers : cBrowsers || DEFAULT_BROWSERS };

		// Bypass any file that wasn't a CKRobot script.
		if ( !content.match( /@tc\b/ ) )
			continue;

		// Grab meta data from script file annotations.
		content.replace( /@tags\s*(.+)/i, function( match, g1 )
		{
			testInfo.tags = testInfo.tags.concat( trim( g1 ).split( ',' ) );
		})
		.replace( /@name\s*(.+)/i, function( match, g1 )
		{
			testInfo.name = trim( g1 );
		})
		.replace( /@browsers\s*(.+)/i, function( match, g1 )
		{
			testInfo.browsers = _.intersect( DEFAULT_BROWSERS, testInfo.browsers, trim( g1 ).split( ',' ));
		});

		var deliminator = File.separator,
				folders = testPath.replace( /\.\w+$/, '' ).split( deliminator );

		testInfo.tags = _.uniq( testInfo.tags.concat( folders.pop(), folders ) );
		tests.push( testInfo );
	}

	// Criteria evaluation over all registered scripts.
	for ( i = 0; i < tests.length; i++ )
	{
		// Criteria hit.
		if ( !( cPaths || cTags )
			|| cPaths && cPaths.indexOf( tests[ i ].path ) != -1
			|| cTags && _( tests[ i ].tags ).intersect( cTags ).length )
			loadTest( tests[ i ] );
	}

	// Listen for events to publish to the console logger.
	TestRunner.attach( TestRunner.BEGIN_EVENT, consoleLog );
	TestRunner.attach( TestRunner.COMPLETE_EVENT, consoleLog );
	TestRunner.attach( TestRunner.TEST_CASE_BEGIN_EVENT, consoleLog );
	TestRunner.attach( TestRunner.TEST_CASE_COMPLETE_EVENT, consoleLog );
	TestRunner.attach( TestRunner.TEST_SUITE_BEGIN_EVENT, consoleLog );
	TestRunner.attach( TestRunner.TEST_SUITE_COMPLETE_EVENT, consoleLog );
	TestRunner.attach( TestRunner.TEST_PASS_EVENT, consoleLog );
	TestRunner.attach( TestRunner.TEST_FAIL_EVENT, consoleLog );
	TestRunner.attach( TestRunner.TEST_IGNORE_EVENT, consoleLog );

	try { TestRunner.run(); }
	finally
	{
		// Close all browser sessions.
		_.forEach( driverPool, function( driver ) { driver.quit(); });
	}

	report();

	function consoleLog( event )
	{
		//data variables
		var message = "",
				messageType = "";

		switch ( event.type )
		{
			case TestRunner.BEGIN_EVENT:
				message = "Testing began at " + (new Date()).toString() + ".";
				messageType = "info";
				break;

			case TestRunner.COMPLETE_EVENT:
				message = ("Testing completed at " +
						(new Date()).toString() + ".\n" +
						"Passed:${passed} Failed:${failed} " +
						"Total:${total} (${ignored} ignored)").process( event.results );
				messageType = "info";
				break;

			case TestRunner.TEST_FAIL_EVENT:
				message = event.testName + ": failed.\n" + event.error.getMessage();
				messageType = "fail";
				break;

			case TestRunner.TEST_IGNORE_EVENT:
				message = event.testName + ": ignored.";
				messageType = "ignore";
				break;

			case TestRunner.TEST_PASS_EVENT:
				message = event.testName + ": passed.";
				messageType = "pass";
				break;

			case TestRunner.TEST_SUITE_BEGIN_EVENT:
				message = "Test suite \"" + event.testSuite.name + "\" started.";
				messageType = "info";
				break;

			case TestRunner.TEST_SUITE_COMPLETE_EVENT:
				message = ("Test suite \"" +
						event.testSuite.name + "\" completed" + ".\n" +
						"Passed:${passed} Failed:${failed} " +
						"Total:${total} (${ignored} ignored)").process( event.results );
				messageType = "info";
				break;

			case TestRunner.TEST_CASE_BEGIN_EVENT:
				message = "Test case \"" + event.testCase.name + "\" started.";
				messageType = "info";
				break;

			case TestRunner.TEST_CASE_COMPLETE_EVENT:
				message = ("Test case \"" +
						event.testCase.name + "\" completed.\n" +
						"Passed:${passed} Failed:${failed} " +
						"Total:${total} (${ignored} ignored)").process( event.results );
				messageType = "info";
				break;
			default:
				message = "Unexpected event " + event.type;
				message = "info";
		}

		console.log( "[%s] %s", messageType, message );
	}

	// Generate JUNIT format report for this run.
	function report()
	{
		var reportXml = TestRunner.getResults( YUITest.TestFormat.JUnitXML );
		if ( !reportXml )
			return;

		!reportDir.exists() && reportDir.mkdir();

		var useStamp = cmd.hasOption( 's' );
		var stamp = new SimpleDateFormat('MM-dd-hh-mm-ss').format(new java.util.Date());
		var outputPath = [ reportDir.getAbsolutePath(), useStamp ? 'TESTS-'+ stamp : 'TESTS' ].join( File.separator );

		var outputDir = new File( outputPath );
		// overwrite the entire directory.
		FileUtils.deleteDirectory( outputDir),outputDir.mkdir();

		var xmlDocType = '<?xml version="1.0" encoding="UTF-8"?>\n';
		reportXml.replace(/<testsuite name="([^"]*?)" .*?>[\s\S]*?<\/testsuite>/gi, function( result, name )
		{
			writeFile( xmlDocType + result, [ outputPath,'TESTS-' + name.replace(/\s+/g,'-') + '.xml'].join( File.separator ) );
		});

		// Invoke ant junitreport task from a preset build file.
		var buildFile = new File( 'src/report.xml' );
		project.setUserProperty( 'ant.file', buildFile.getAbsolutePath() );
		project.setProperty( 'reportdir',outputPath );
		project.init();
		var helper = ProjectHelper.getProjectHelper();
		project.addReference('ant.projectHelper', helper);
		helper.parse(project, buildFile);
		project.executeTarget( project.getDefaultTarget() );
		console.log( 'HTML report generated at: %s', [ outputPath, 'html', 'index.html' ].join( File.separator ) );
	}

	function loadTest( aTest )
	{
		console.log( 'Load test script:%s, tags:%s, browsers:%s ', aTest.path, aTest.tags, aTest.browsers );
		var spec = { name : aTest.name };
		_.each( aTest.browsers, function( browser )
		{
			var driverClass = BROWSER_DRIVERS[ browser ];
			var testScript, browserName;
			if ( driverClass )
			{
				browserName = String( driverClass ).match( /([^.]*?)Driver/ )[ 1 ];
				testScript = readFile( new File( aTest.file ) );
				testAPIs = testAPIs || readFile( new File( 'src/api.js' ) );

				spec[ 'test'+browserName ] = new Function( [ 'data' ],
						'var env = "' + browser + '";' +
						'var driver = this.driverPool[ "' + browser + '" ] || ( this.driverPool[ "' + browser + '" ] = new '+ driverClass+ '() );'
						+ testAPIs + 'var browser = new BrowserBot( driver );'
						+ testScript );
			}
		} );

		var tc = new TestCase( spec );
		tc.driverPool = driverPool;
		TestRunner.add( tc );
	}


	function readFile( file )
	{
		return String( FileUtils.readFileToString( file, 'utf-8' ) );
	}

	function writeFile( content, path )
	{
		FileUtils.writeStringToFile( new File( path ), content ,'utf-8' );
	}

	function trim( str )
	{
		return String( new java.lang.String( str ).trim() );
	}

} )();
