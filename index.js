import { JSDOM } from 'jsdom';
import createDOMPurify from 'dompurify';

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

const main = ( input ) => {
    return DOMPurify.sanitize(input);
};

export default main;