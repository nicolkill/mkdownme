#!/bin/sh

set -e

if [ "$1" = 'start' ]; then
	./node_modules/.bin/nodemon server.js
fi

exec "$@"
