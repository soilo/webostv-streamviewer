#!/bin/sh
echo "Clean"
rm -rf dist
mkdir dist
parcel build ./src/index.html --no-source-maps --public-url ./
cp appinfo.json dist/
cp icon.png dist/
cp largeIcon.png dist/
ares-package -o dist dist
