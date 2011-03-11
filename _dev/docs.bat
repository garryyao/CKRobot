@ECHO OFF
::
:: Copyright (c) 2003-2011, CKSource - Frederico Knabben. All rights reserved.
:: For licensing, see LICENSE.html or http://ckeditor.com/license
::
:: Builds the documentation files.
::

del /F /Q "../docs/*.*"
java -jar jsdoc-toolkit/jsrun.jar jsdoc-toolkit/app/run.js -c=docs.conf
