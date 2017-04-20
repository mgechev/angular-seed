#/bin/bash
set -x
echo cd tt-bot-deploy en home
cd /home/ubuntu/omicflows-frontend-deploy
docker-compose --file=docker-compose.production.yml ps -q | xargs docker inspect -f '{{ .State.ExitCode }}' | while read code; do  
    if [ "$code" == "1" ]; then    
       exit -1
    fi
done
