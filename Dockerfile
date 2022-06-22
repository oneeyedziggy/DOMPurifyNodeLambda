# Define custom function directory
ARG FUNCTION_DIR="/function"

FROM node:16.15-alpine as build-image

# Include global arg in this stage of the build
ARG FUNCTION_DIR

# Install aws-lambda-cpp build dependencies
RUN apk update && \
    apk add \
#    gyp \
    python3 \
    nghttp2-dev \
    libexecinfo-dev \
#    libexecinfo
    gcompat \
    g++ \
    make \
    cmake \
    unzip \
    curl-dev \
    libtool \  
    autoconf \
    automake

# Copy function code
RUN mkdir -p ${FUNCTION_DIR}
COPY ./* ${FUNCTION_DIR}

WORKDIR ${FUNCTION_DIR}

# If the dependency is not in package.json uncomment the following line
RUN npm install aws-lambda-ric 

RUN npm ci --omit=dev 

# Grab a fresh slim copy of the image to reduce the final size
FROM node:16.15-alpine

# Include global arg in this stage of the build
ARG FUNCTION_DIR

# Set working directory to function root directory
WORKDIR ${FUNCTION_DIR}

# Copy in the built dependencies
COPY --from=build-image ${FUNCTION_DIR} ${FUNCTION_DIR}

# Downloads the Lambda Runtime Interface Emulator (RIE)
ADD https://github.com/aws/aws-lambda-runtime-interface-emulator/releases/latest/download/aws-lambda-rie /usr/bin/aws-lambda-rie

RUN chmod +x /usr/bin/aws-lambda-rie
#RUN chmod +x /function/entry.sh

EXPOSE 8080

#ENTRYPOINT ["/usr/local/bin/npx", "aws-lambda-ric"]
ENTRYPOINT ["/function/entry.sh"]

CMD ["index.handler"]