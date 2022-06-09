#!/bin/bash
zip -r DOMPurifyNodeLambda.zip ./ -x '.dockerignore' '*.git*' '.nvmrc' 'Dockerfile' '*.zip' '*README.md' 'config.json' '*.sh'  \
 '*.spec.js*'