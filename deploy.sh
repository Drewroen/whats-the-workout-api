#! /bin/bash

npm install -g serverless
serverless deploy --stage prod --package $CODEBUILD_SRC_DIR/target/prod -v -r us-east-2