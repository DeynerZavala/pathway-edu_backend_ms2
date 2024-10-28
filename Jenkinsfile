pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/your-org/pathway-edu-backend-ms2.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t ${GCR_REGISTRY}/microservice2 .'
            }
        }

        stage('Push Docker Image to GCR') {
            steps {
                withCredentials([file(credentialsId: 'google-cloud-jenkins', variable: 'GOOGLE_APPLICATION_CREDENTIALS')]) {
                    sh 'gcloud auth activate-service-account --key-file=$GOOGLE_APPLICATION_CREDENTIALS'
                    sh 'gcloud auth configure-docker'
                    sh 'docker push ${GCR_REGISTRY}/microservice2'
                }
            }
        }

        stage('Deploy Database and Microservice') {
            steps {
                withCredentials([file(credentialsId: 'google-cloud-jenkins', variable: 'GOOGLE_APPLICATION_CREDENTIALS')]) {
                    sh 'gcloud auth activate-service-account --key-file=$GOOGLE_APPLICATION_CREDENTIALS'
                    sh """
                        gcloud compute ssh ${GCP_INSTANCE} --project=${GCP_PROJECT} --zone=${GCP_ZONE} --command="
                            # Crear contenedor de PostgreSQL si no está en ejecución
                            if [ ! \$(docker ps -q -f name=db2) ]; then
                                docker run -d --name db2 --network=${DOCKER_NETWORK} -e POSTGRES_USER=${DB_USERNAME} -e POSTGRES_PASSWORD=${DB_PASSWORD} -e POSTGRES_DB=${DB_NAME2} -v db2_data:/var/lib/postgresql/data postgres;
                            fi

                            # Iniciar Microservicio
                            docker run -d --network=${DOCKER_NETWORK} --name ms2 -p 3002:3002 \
                                -e DB_HOST=db2 -e DB_PORT=5432 -e DB_USERNAME=${DB_USERNAME} \
                                -e DB_PASSWORD=${DB_PASSWORD} -e DB_DATABASE=${DB_NAME2} \
                                ${GCR_REGISTRY}/microservice2:latest
                        "
                    """
                }
            }
        }
    }

    post {
        success {
            echo 'Microservice 2 deployment successful!'
        }
        failure {
            echo 'Microservice 2 deployment failed.'
        }
    }
}
