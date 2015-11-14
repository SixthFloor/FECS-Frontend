#!/bin/sh
set -ex
# npm run update-webdriver
gulp compile
http-server ./www -p 4444 &WEBSERVER_PID=$!
echo '$1 = ' $1
if [ $1 = "-protractor" ]
then
	npm run protractor
elif [ "$1" = "-unit" ]
then
	npm run unit
else
	npm run runtest
fi
killall node