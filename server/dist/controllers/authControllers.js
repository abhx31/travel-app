"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.resetPassword = exports.profile = exports.forgotPassword = exports.signin = exports.signup = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const schema_1 = require("../schema");
const email_1 = require("../utils/email");
const prisma = new client_1.PrismaClient();
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, cPassword } = schema_1.signupSchema.parse(req.body);
        if (password !== cPassword) {
            return res.json({ msg: "Passwords do not match" });
        }
        const user = yield prisma.user.findFirst({
            where: {
                email
            }
        });
        if (user) {
            return res.json({ msg: "User already exists" });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const saveUser = yield prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        });
        const token = jsonwebtoken_1.default.sign({ userId: saveUser.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.cookie('token', token, { httpOnly: true });
        return res.json({ msg: "User created Successfully" });
    }
    catch (error) {
        if (error.errors && error.errors[0].message) {
            const message = error.errors[0].message;
            return res.json({ msg: message });
        }
        console.error(error);
        return res.json({ msg: "Internal Server Error" });
    }
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = schema_1.signinSchema.parse(req.body);
        const user = yield prisma.user.findFirst({
            where: {
                email
            }
        });
        if (!user) {
            return res.json({ msg: "Email doesn't exist" });
        }
        const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            return res.json({ msg: "Invalid Credentials" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET);
        res.cookie('token', token, { httpOnly: true });
        return res.json({ msg: "Signin successful" });
    }
    catch (error) {
        if (error.errors && error.errors[0].message) {
            const message = error.errors[0].message;
            return res.json({ msg: message });
        }
        console.error(error);
        return res.json({ msg: "Internal Server Error" });
    }
});
exports.signin = signin;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = schema_1.forgotPasswordSchema.parse(req.body);
        const existingUser = yield prisma.user.findFirst({
            where: {
                email
            }
        });
        if (!existingUser) {
            return res.json({ msg: "User not found" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: existingUser.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.cookie('token', token, { httpOnly: true });
        const text = `${process.env.CLIENT_URL}/resetPassword/${token}`;
        const emailResult = yield (0, email_1.sendEmail)(email, "Reset password", text);
        if (emailResult.success) {
            return res.json({ msg: "Email sent successfully" });
        }
        else {
            return res.json({ msg: emailResult.error });
        }
    }
    catch (error) {
        if (error.errors && error.errors[0].message) {
            const message = error.errors[0].message;
            return res.json({ msg: message });
        }
        console.error(error);
        return res.json({ msg: "Internal Server Error" });
    }
});
exports.forgotPassword = forgotPassword;
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ msg: 'Unauthorized' });
        }
        return res.json({ username: user.username, email: user.email });
    }
    catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ msg: 'Server error' });
    }
});
exports.profile = profile;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password, cPassword } = schema_1.resetPasswordSchema.parse(req.body);
        const user = req.user;
        if (!user) {
            return res.status(401).json({ msg: 'Unauthorized' });
        }
        if (password !== cPassword) {
            return res.json({ msg: "Passwords do not match" });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        yield prisma.user.update({ where: { id: user.id }, data: { password: hashedPassword } });
        const updatedUser = yield prisma.user.findUnique({ where: { id: user.id } });
        return res.json({ msg: 'Password updated successfully', user: updatedUser });
    }
    catch (error) {
        if (error.errors && error.errors[0].message) {
            const message = error.errors[0].message;
            return res.json({ msg: message });
        }
        console.error(error);
        return res.json({ msg: "Internal Server Error" });
    }
});
exports.resetPassword = resetPassword;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie('token');
    return res.json({ msg: "Logged out successfully" });
});
exports.logout = logout;
