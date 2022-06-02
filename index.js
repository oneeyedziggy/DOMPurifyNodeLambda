import { JSDOM } from 'jsdom';
import createDOMPurify from 'dompurify';

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

const main = ( input ) => {
    const result = DOMPurify.sanitize(input);
    console.log('>', result, '< logged');
    return result;
};

main("<html>hello<p></html>");

export default main;