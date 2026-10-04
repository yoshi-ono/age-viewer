#!/bin/bash

# Install the required node modules
#   ``` npm run setup ```
#

export NODE_OPTIONS=--openssl-legacy-provider

# Run Age-Viewer
npm run start

# To check if the server is running, you can use the following command
# to see if anything is listening on port 3000:
#   ``` lsof -i :3000 ```
