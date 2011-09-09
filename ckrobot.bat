@echo off
java ^
-Dwebdriver.chrome.driver="lib\chromedriver.exe" ^
-cp lib\js.jar;lib\ant.jar;lib\ant-launcher.jar;lib\ant-junit.jar;lib\cli.jar;lib\selenium.jar;lib\selenium-server.jar; org.mozilla.javascript.tools.shell.Main -opt -1 src/runner.js %*
