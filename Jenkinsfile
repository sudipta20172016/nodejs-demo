pipeline {
    agent any

     tools {
        nodejs 'NodeJS 26'
    }
    
    stages {

       

        stage('Build Image') {
            steps {
                sh 'docker build -t nodejs-demo:latest .'
            }
        }

        stage('Run Locally') {
            steps {
                sh '''
                docker stop nodejs-demo || true
                docker rm nodejs-demo || true

                docker run -d --name nodejs-demo -p 3000:3000 nodejs-demo:latest
                '''
            }
        }

        

        stage('Push to ACR') {
            steps {
                withCredentials([
                    string(credentialsId: 'AZ_CLIENT_ID', variable: 'AZ_CLIENT_ID'),
                    string(credentialsId: 'AZ_CLIENT_SECRET', variable: 'AZ_CLIENT_SECRET'),
                    string(credentialsId: 'AZ_TENANT_ID', variable: 'AZ_TENANT_ID')
                ]) {
                    sh '''
                    az login --service-principal \
                    -u $AZ_CLIENT_ID \
                    -p $AZ-PASSWORD \
                    --tenant $AZ-TENANT-ID

                    az login --name sudiptaacr001

                    docker tag nodejs-demo:latest sudiptaacr001.azurecr.io/nodejs-demo:latest
                    docker push sudiptaacr001.azurecr.io/nodejs-demo:latest
                    '''
                }
            }
                
            
        }

        stage('Deploy to Azure Container Apps') {
            steps {
                sh '''
                az containerapp update \
                --name nodejs-app \
                --resource-group aca-demo-rg \
                --image sudiptaacr001.azurecr.io/nodejs-demo:latest
                '''
            }
        }
    
    }
}
