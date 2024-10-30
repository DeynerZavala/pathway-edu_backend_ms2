pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'master', url: 'https://github.com/DeynerZavala/pathway-edu_backend_ms2.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t ms2 .'
            }
        }

        stage('Copy Docker Image to VM') {
            steps {
                withCredentials([file(credentialsId: 'google-cloud-jenkins', variable: 'GOOGLE_APPLICATION_CREDENTIALS')]) {
                    sh 'gcloud auth activate-service-account --key-file=$GOOGLE_APPLICATION_CREDENTIALS'
                    sh 'docker save ms2 -o ms2.tar'
                    sh "gcloud compute scp ms2.tar ${GCP_INSTANCE}:/home/jenkins/ --zone=${GCP_ZONE} --project=${GCP_PROJECT}"
                }
            }
        }

        stage('Setup PostgreSQL Database and Run Microservice') {
            steps {
                withCredentials([file(credentialsId: 'google-cloud-jenkins', variable: 'GOOGLE_APPLICATION_CREDENTIALS')]) {
                    sh 'gcloud auth activate-service-account --key-file=$GOOGLE_APPLICATION_CREDENTIALS'
                    sh """
                        gcloud compute ssh ${GCP_INSTANCE} --project=${GCP_PROJECT} --zone=${GCP_ZONE} --command="
                            if ! docker network inspect ${DOCKER_NETWORK} &> /dev/null; then
                                docker network create ${DOCKER_NETWORK};
                            fi;
                            if [ \$(docker ps -q -f name=${DB_NAME2}) ]; then
                                docker start ${DB_NAME2};
                            elif [ ! \$(docker ps -aq -f name=${DB_NAME2}) ]; then
                                docker run -d --name ${DB_NAME2} --network=${DOCKER_NETWORK} -e POSTGRES_USER=${DB_USERNAME} -e POSTGRES_PASSWORD=${DB_PASSWORD} -e POSTGRES_DB=${DB_NAME2} -v pgdata_ms2:/var/lib/postgresql/data -p ${DB_PORT2}:5432 postgres;
                            fi;
                            until docker exec ${DB_NAME2} pg_isready -U ${DB_USERNAME}; do
                                sleep 5;
                            done;
                            docker exec -i ${DB_NAME2} psql -U ${DB_USERNAME} -tc \\"SELECT 1 FROM pg_database WHERE datname = '${DB_NAME2}'\\" | grep -q 1 || docker exec -i ${DB_NAME2} psql -U ${DB_USERNAME} -c \\"CREATE DATABASE \\"${DB_NAME2}\\";";
                            if [ \$(docker ps -q -f name=ms2) ]; then
                                docker stop ms2 && docker rm ms2;
                            fi;
                            docker load -i /home/jenkins/ms2.tar;
                            docker run -d --name ms2 --network=${DOCKER_NETWORK} -p ${MS_PORT2}:3002 -e DB_HOST=${DB_NAME2} -e DB_PORT=5432 -e DB_USERNAME=${DB_USERNAME} -e DB_PASSWORD=${DB_PASSWORD} -e DB_DATABASE=${DB_NAME2} ms2;
                            rm /home/jenkins/ms2.tar;
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
