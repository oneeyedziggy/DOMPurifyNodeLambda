import handler from './index';
import { btoa } from './utils/base64';

const buildRequestAndCallHandler = async ( testData ) => {
    const event = { body: btoa(testData) };
    const context = {};
    const handlerResult = await handler(event, context);
    return handlerResult;
}

describe("main function", () => {
    it( "should take valid input and return valid output", async () => {
        const validHTML = "<h1>stuff</h1><table><tr><td>cell1</td><td>cell2</td></tr></table>";
        const moreValidHTML = "<h1>stuff</h1><table><tbody><tr><td>cell1</td><td>cell2</td></tr></tbody></table>";

        const response = await buildRequestAndCallHandler(validHTML);
        const purifiedValue = JSON.parse(response.body).purified;

        expect( purifiedValue ).toEqual(moreValidHTML);
    } );
    it( "should take invalid input and return valid output", async () => {
        const invalidHTML = "<h1>stuff";
        const validHTML = "<h1>stuff</h1>";

        const response = await buildRequestAndCallHandler(invalidHTML);
        const purifiedValue = JSON.parse(response.body).purified;

        expect( purifiedValue ).toEqual(validHTML);
    } );
});