docker build -t marekmika/inserter-client:latest -t marekmika/inserter-client:$SHA -f ./client/Dockerfile ./client
docker build -t marekmika/inserter-server:latest -t marekmika/inserter-server:$SHA  -f ./server/Dockerfile ./server

docker push marekmika/inserter-client:latest
docker push marekmika/inserter-server:latest

docker push marekmika/inserter-client:$SHA
docker push marekmika/inserter-server:$SHA

kubectl apply -f k8s
kubectl set image deployments/client-deployment client=marekmika/inserter-client:$SHA
kubectl set image deployments/server-deployment server=marekmika/inserter-server:$SHA
