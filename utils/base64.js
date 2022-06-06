export const btoa = (input) => Buffer.from(input).toString('base64');
export const atob = (input) =>  Buffer.from(input, 'base64').toString('ascii');