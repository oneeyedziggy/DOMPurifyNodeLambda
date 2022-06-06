import {atob, btoa} from './base64';

const plaintext = "The Quick Brown Fox Jumps Over The Lazy Dog";
const encoded = "VGhlIFF1aWNrIEJyb3duIEZveCBKdW1wcyBPdmVyIFRoZSBMYXp5IERvZw==";

describe("atob", () => {
    it( "should decode valid  to expected text", () => {
        expect( atob(encoded) ).toEqual(plaintext);
    } );
});

describe("btoa", () => {
    it( "should encode text to valid base64", () => {
        expect( btoa(plaintext) ).toEqual(encoded);
    } );
})
;