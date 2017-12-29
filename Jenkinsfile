pipeline {
  agent any
  stages {
    stage('build') {
      steps {
        git(credentialsId: '0070ea751ab3c875b8f030d405fd9a546fcb85b3', url: 'https://github.com/ssarbajna/LG223.git', branch: 'develop', changelog: true, poll: true)
      }
    }
  }
  environment {
    SIT = 'sit'
  }
}