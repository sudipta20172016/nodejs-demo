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
                docker build --build-arg APP_VERSION=$APP_VERSION -t nodejs-demo:$APP_VERSION -t nodejs-demo:latest .
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
    }
}
