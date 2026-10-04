# Install the required node modules
#   ``` npm run setup ```
#

$env:NODE_OPTIONS = "--openssl-legacy-provider"

# Run Age-Viewer
npm run start

# To check if the server is running, you can use the following command
# to see if anything is listening on port 3000:
#   ``` Get-NetTCPConnection -LocalPort 3000 ```
#   (or ``` netstat -ano | findstr :3000 ```)
