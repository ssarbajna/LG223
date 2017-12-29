pipeline {
  agent any
  stages {
    stage('build') {
      steps {
        git(poll: true, url: 'https://github.com/ssarbajna/LG223.git', branch: 'develop', changelog: true)
      }
    }
  }
}