#!/bin/bash
cd /home/kavia/workspace/code-generation/calmnest-37921-b497270f/calmnest_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

