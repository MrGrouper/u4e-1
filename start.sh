#!/bin/bash

# Start the backend server
node ./backend/dist/index.js &

# Start the socket server
node ./socketserver/server.js &

# Wait for any process to exit
wait -n

# Exit with status of the process that exited first
exit $?