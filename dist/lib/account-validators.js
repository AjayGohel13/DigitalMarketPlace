"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidator = exports.AuthCredentialsValidator = void 0;
var zod_1 = require("zod");
exports.AuthCredentialsValidator = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8, {
        message: 'Password Must be 8 characters long',
    }),
    Address: zod_1.z.string().min(20, {
        message: 'address must be 20 characters long',
    }),
    user_name: zod_1.z.string(),
    City_Name: zod_1.z.string(),
    State_Name: zod_1.z.string(),
    Country: zod_1.z.string(),
    Pincode: zod_1.z.string().max(8, {
        message: 'pincode must be lessthan 9 characters',
    }),
    Contect_Number: zod_1.z.string().min(8, {
        message: 'Contact number must be 8 characters long'
    }),
});
exports.AuthValidator = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8, {
        message: 'Password Must be 8 characters long',
    }),
});
