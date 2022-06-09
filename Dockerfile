# Define custom function directory
ARG FUNCTION_DIR="/function"

FROM node:16.15-alpine as build-image

# Include global arg in this stage of the build
ARG FUNCTION_DIR

# Install aws-lambda-cpp build dependencies
RUN apk update && \
    apk add -y \
    g++ \
    make \
    cmake \
    unzip \
    curl-devel \  
    autoconf \
    automake

# Copy function code
RUN mkdir -p ${FUNCTION_DIR}
COPY ./* ${FUNCTION_DIR}

WORKDIR ${FUNCTION_DIR}

# If the dependency is not in package.json uncomment the following line
# might want to do this b/c all the deps needed inside docker are a lot more than needed by the actual node project
# RUN npm install aws-lambda-ric

RUN npm ci --production

# Grab a fresh slim copy of the image to reduce the final size
FROM node:16.15-alpine

# Include global arg in this stage of the build
ARG FUNCTION_DIR

# Set working directory to function root directory
WORKDIR ${FUNCTION_DIR}

# Copy in the built dependencies
COPY --from=build-image ${FUNCTION_DIR} ${FUNCTION_DIR}

ENTRYPOINT ["/usr/local/bin/npx", "aws-lambda-ric"]
CMD ["app.handler"]