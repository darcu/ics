#!/bin/bash

# remove old files and recreate the directory structure
rm -rf ./bin;
mkdir -p ./bin/css;
mkdir -p ./bin/js;
mkdir -p ./bin/fonts;

# minify and compress JS
uglifyjs js/Dom.js js/Generics.js js/mimes.js js/Ui.js js/Events.js js/main.js js/Utils.js --output bin/js/ics.min.js -c unsafe,drop_console;
# --source-map ics.min.js.map;
# compile LESS
lessc -x css/general.less > ./bin/css/style.css;

# copy the html index
cp -rf css/fonts/* ./bin/fonts;
cp -rf index.html ./bin;
cp -rf _resources/mongoose-free-5.4.1.exe ./bin;