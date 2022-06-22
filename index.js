import { JSDOM } from 'jsdom';
import createDOMPurify from 'dompurify';

import config from './config.js';
import { atob } from './utils/base64.js';

const { apiKeys } = config;

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

const purify = (input) => {
    return DOMPurify.sanitize(input);
};

const decodeBody = (event) => {
    const body = event.isBase64Encoded ? atob(event.body) : event.body;
    return body;
};

const buildSuccessResponse = (inputValue, event, context) => {
    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify({ purified: purify(inputValue), event, context })
    };
};

const sleep = (delay) => new Promise (( resolve) => setTimeout (resolve, delay));
const buildErrorResponse = async (status, message) => {
    //to fend off any timing-attachs by adding a random small wait to rejection... between two prime numbers just for fun
    await sleep( Math.round( ( Math.random() * 503 ) + 101 ) );
    return {
        "statusCode": 200,        
    };
};

const authenticate =  ( event ) => {
    //to prevent accidentally short api keys or empty strings
    const minApiKeyLength = 32;
    const submittedApiKey = event?.queryStringParameters?.apiKey;
    return submittedApiKey?.length >= minApiKeyLength && apiKeys?.includes(submittedApiKey);
};

export const handler = async (event, context) => {
    let response;
    if (authenticate(event)) {
        const inputValue = decodeBody(event);
        response = buildSuccessResponse(inputValue, event, context);
    } else {
        const msg = "message without or w/ invalid API key received";
        console.warn(msg);
        response = await buildErrorResponse( 401, msg );
    }
    return response;
};

export default handler;