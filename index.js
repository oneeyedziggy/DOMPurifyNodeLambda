import { JSDOM } from 'jsdom';
import createDOMPurify from 'dompurify';

//import {apiKeys} from './config.json';
import { atob } from './utils/base64';

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

const purify = ( input ) => {
    return DOMPurify.sanitize(input);
};

const decodeBody = ( event ) => {
  return atob(event.body);
};

const buildResponse = ( inputValue, event, context ) => {
  return {
    "statusCode": 200,
    "headers": {
      "Content-Type": "application/json"
    }, 
    //"isBase64Encoded": false,
    "body": JSON.stringify( { purified: purify(inputValue), event, context } )
  };
};

export const handler = async ( event, context ) => {
  const inputValue = decodeBody( event );
  const response = buildResponse(inputValue, event, context);
  return response;
};

export default handler;