#!/bin/sh
set -ex

REPORT_DATE="$(date +"%m-%d-%y")"

TEST_TIME="$(date +"%H:%M:%S")"

npm run update-webdriver
gulp compile
http-server ./www -p 3030 &WEBSERVER_PID=$!
echo '$1 = ' $1
if [ $1 = "-protractor" ];
then
	protractor test/protractor.conf.js && echo "skip"
	mv ./reports/ test_"${REPORT_DATE}"_"(${NUMBER_FILE})"/
	sshpass -p jl scp -r -o StrictHostKeyChecking=no test_"${REPORT_DATE}"_"(${TEST_TIME})"/ jl@128.199.133.224:/home/jl/Test_reports/feature-tests/ -o StrictHostKeyChecking=no
elif [ "$1" = "-unit" ];
then
	npm run unit
else
	npm run runtest
fi

killall node