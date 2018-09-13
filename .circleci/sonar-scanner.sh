#!/bin/bash
wget https://sonarsource.bintray.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-${SONAR_SCANNER_VERSION}-linux.zip
unzip sonar-scanner-cli-${SONAR_SCANNER_VERSION}-linux
sudo chmod +x sonar-scanner-${SONAR_SCANNER_VERSION}-linux/bin/sonar-scanner

sonar-scanner-${SONAR_SCANNER_VERSION}-linux/bin/sonar-scanner \
  -Dsonar.projectKey=${SONAR_PROJECT_KEY} \
  -Dsonar.organization=${SONAR_ORGANIZATION} \
  -Dsonar.sources=./src \
  -Dsonar.tests=./test \
  -Dsonar.typescript.lcov.reportPaths=./coverage/lcov.info \
  -Dsonar.host.url=${SONAR_HOST_URL} \
  -Dsonar.login=${SONAR_TOKEN}