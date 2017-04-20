#/bin/bash
set -x

echo cd tt-bot-deploy en home
cd /home/ubuntu/omicflows-frontend-deploy
echo docker-compose kill
docker-compose -f docker-compose.production.yml kill
