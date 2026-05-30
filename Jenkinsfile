pipeline {
    agent any

     tools {
        nodejs 'NodeJS 26'
    }
    
    stages {

       

        stage('Build Docker Image') {
            steps {
                sh '''
                APP_VERSION=$(node -p "require('./package.json').version")
                BUILD_VERSION=$APP_VERSION-$BUILD_NUMBER
                docker build --build-arg APP_VERSION=$BUILD_VERSION -t nodejs-demo:$BUILD_VERSION -t nodejs-demo:latest .
                '''
            }
        }

        stage('Deploy Container') {
            steps {
                sh '''
                docker stop nodejs-demo || true
                docker rm nodejs-demo || true

                docker run -d \
                --name nodejs-demo \
                -p 3000:3000 \
                nodejs-demo:latest
                '''
            }
        }

        stage('Save Last Working Version') {
            steps {
                script {
                def lastWorkingCommit = sh(
                    script: 'git rev-parse HEAD',
                    returnStdout: true
                ).trim()

                writeFile file: 'last-working-git-ref.txt', text: lastWorkingCommit
                archiveArtifacts artifacts: 'last-working-git-ref.txt', fingerprint: true

                echo "Last working Git ref saved: ${lastWorkingCommit}"
                }
            }
        }
    
    }
}
