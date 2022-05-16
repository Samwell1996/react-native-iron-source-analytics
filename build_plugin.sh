#!/bin/bash

set -e

# install node_modules && bob build
echo "Installing node_modules and building with bob..."
yarn install && yarn prepare

# build and pack the module
echo "Packing react-native-iron-source-analytics..."
npm pack

# unzip the packed file
echo "Extracting the packed react-native-iron-source-analytics..."
tar -xvzf react-native-iron-source-analytics-*.tgz

# rename the unzipped module from package into build/iron-source-analytics-bridge
rm -rf build
mkdir -p build && mv package build/react-native-iron-source-analytics

# clean up
echo "Removing the packed file..."
rm -rf react-native-iron-source-analytics-*.tgz

echo "Build done!"