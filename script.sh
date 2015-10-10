#!/bin/sh
set -ex
npm run update-webdriver
gulp compile
http-server ./www -p 4444 & WEBSERVER_PID=$!
npm run runtest