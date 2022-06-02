//import { describe, it, expect } from 'jest';

import main from 'index';

describe("main function", () => {
    it( "should take valid input and return valid output", () => {
        const validHTML = "<html><head><title>things</title></head><body>stuff</body></html>";
        expect( main(validHTML) ).toEqual(validHTML);
    } );
    it( "should take invalid input and return valid output", () => {
        const invalidHTML = "<html><head><title>things</head><body>stuff</body></html>";
        const validHTML = "<html><head></head><body>stuff</body></html>";
        expect( main(invalidHTML) ).toEqual(validHTML);
    } );
});