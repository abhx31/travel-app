"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.signinSchema = exports.signupSchema = void 0;
const zod_1 = require("zod");
exports.signupSchema = zod_1.z.object({
    username: zod_1.z.string().min(1, { message: "Username is required." }),
    email: zod_1.z.string().email({ message: "Invalid email address." }),
    password: zod_1.z.string().min(8, { message: "Password must be at least 8 characters long." }),
    cPassword: zod_1.z.string().min(8, { message: "Confirmation password must be at least 8 characters long." })
});
exports.signinSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Invalid email address." }),
    password: zod_1.z.string().min(8, { message: "Password must be at least 8 characters long." })
});
exports.forgotPasswordSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Invalid email address." })
});
exports.resetPasswordSchema = zod_1.z.object({
    password: zod_1.z.string().min(8, { message: "Password must be at least 8 characters long." }),
    cPassword: zod_1.z.string().min(8, { message: "Confirmation password must be at least 8 characters long." })
});
