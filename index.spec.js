//import { describe, it, expect } from 'jest';

import main from './index';

describe("main function", () => {
    it( "should take valid input and return valid output", () => {
        //const validHTML = "<html><head><title>things</title></head><body>stuff</body></html>";
        //stuff
        const validHTML = "<h1>stuff</h1><table><tr><td>cell1</td><td>cell2</td></tr></table>";
        const moreValidHTML = "<h1>stuff</h1><table><tbody><tr><td>cell1</td><td>cell2</td></tr></tbody></table>";
        
        expect( main(validHTML) ).toEqual(moreValidHTML);
    } );
    it( "should take invalid input and return valid output", () => {
        const invalidHTML = "<h1>stuff";
        const validHTML = "<h1>stuff</h1>";
        expect( main(invalidHTML) ).toEqual(validHTML);
    } );
});