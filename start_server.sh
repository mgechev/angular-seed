#/bin/bash
set -x
echo Logging in to Amazon ECR...
$(aws ecr get-login --region $AWS_DEFAULT_REGION)
echo cd omicflows-frontend-deploy en home
cd /home/ubuntu/omicflows-frontend-deploy
echo docker-compose up
docker-compose -f docker-compose.production.yml build && docker-compose -f docker-compose.production.yml up angular-seed && docker-compose -f docker-compose.production.yml up -d angular-seed-nginx
