# DOMPurifyNodeLambda
does what it says on the tin... a node project to expose basic domPurify functionality for use in an aws lambda

# Some Local Install Nonsense
//ESL fedoraremix version of the installs required by aws-lambda-ric
sudo yum update && \
sudo yum install -y \
g++ \
make \
cmake \
unzip \
libcurl-devel \
libtool \ 
autoconf \ 
automake

## Deployment
 
upon deploy, rename a copy of config.sample.js to config.js and update w/ an at least 32+char long string in the apiKeys array...

## Docker 

to build (to a 'latest' tag):
`docker build -t dompurifynodelambda:latest .`

to run:
`docker run -p 9000:8080 dompurifynodelambda:latest` 

when running in docker, aws-lambda-ric starts an internal server on localhost:9000 and the above plumbs 9000 through to 8080, and the api requires a key, so, you can copy the below key into config.json w/ the one in so test w/

`curl -XPOST "http://localhost:8080/2015-03-31/functions/function/invocations?apiKeys=TestOnly012345678910111213141516" -d '{}'`

### Upkeep

list built docker images w/ 
`docker images`

to clean out untagged built images
`docker rmi $(docker images -f "dangling=true" -q)`

## TODO: 

 - figure out how to get credentials into dockerfile
 - add a lint profile and such
