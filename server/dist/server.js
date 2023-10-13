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
const express_1 = __importDefault(require("express"));
const UserController_1 = require("./controllers/UserController");
let currentTimeout = null;
const app = (0, express_1.default)();
const PORT = 5050;
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET');
    next();
});
app.get('/', (req, res) => {
    res.send('Hello from the TypeScript Express server!');
});
app.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, number } = req.query;
    if (!email && !number) {
        return res
            .status(400)
            .json({ error: 'Please provide an email, a number, or both.' });
    }
    //   if (!validateEmail(email) || !validatePhoneNumber(number)) {
    //     return res.status(400).json({ error: 'Phone Number or Email not valid' });
    //   }
    if (currentTimeout) {
        clearTimeout(currentTimeout);
        currentTimeout = null;
    }
    currentTimeout = setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
        const results = yield (0, UserController_1.getUser)(email, number);
        if (!results || results.length === 0) {
            return res
                .status(204)
                .json({ error: 'No users found with the provided criteria.' });
        }
        res.json(results);
        currentTimeout = null;
    }), 3000);
}));
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
