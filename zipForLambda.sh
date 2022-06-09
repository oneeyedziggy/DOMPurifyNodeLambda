#!/bin/bash
zip -r DOMPurifyNodeLambda.zip ./ -x '.dockerignore' '*.git*' '.nvmrc' 'Dockerfile' '*.zip' '*README.md' 'config.js' '*.sh'  \
 '*.spec.js*' 'package*.json'