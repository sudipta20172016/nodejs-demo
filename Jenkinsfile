pipeline {
    agent anys

    stages {

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t nodejs-demo .'
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
                nodejs-demo
                '''
            }
        }
    }
}