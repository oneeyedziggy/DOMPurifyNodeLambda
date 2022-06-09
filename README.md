# DOMPurifyNodeLambda
does what it says on the tin... a node project to expose basic domPurify functionality for use in an aws lambda

TODO: figure out how to get credentials into dockerfile

sudo yum update && \
sudo yum install -y \
g++ \
make \
cmake \
unzip \
curl-devel \ 
autoconf \ 
automake

upon deploy, update config.json w/ at least one 32+char long string in the apiKeys prop...
