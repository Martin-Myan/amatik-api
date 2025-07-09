#!/bin/bash

set -x

# Check if all arguments are provided
if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <ACCESS_TOKEN> <APP_ID>"
    exit 1
fi

ACCESS_TOKEN=$1
APP_ID=$2

# Download and set up doctl
wget https://github.com/digitalocean/doctl/releases/download/v1.101.0/doctl-1.101.0-linux-amd64.tar.gz
tar xf doctl-1.101.0-linux-amd64.tar.gz
sudo mv doctl /usr/local/bin

# Initialize doctl with the access token
doctl auth init --access-token "$ACCESS_TOKEN"

# Trigger deployment
# Use `--wait` flag to wait for the deployment to complete
doctl apps create-deployment "$APP_ID"

echo "Deployment completed"
