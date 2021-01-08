"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const express_formidable_1 = __importDefault(require("express-formidable"));
const minimist_1 = __importDefault(require("minimist"));
const argv = minimist_1.default(process.argv.slice(2));
const port = argv.p || argv.port || 8000;
const app = express_1.default();
app.use(body_parser_1.default.json({ limit: '1mb' }));
app.use(body_parser_1.default.urlencoded({ extended: true, limit: '5mb' }));
app.use(express_formidable_1.default());
app.post(`/extension/upload/*`, async function (req, res) {
    const [{ name: fileName, /* size,*/ path: filePath /*, type*/ },] = Object.values(req.files);
    if (!path_1.default)
        return res.status(400).json({ error: `No file uploaded` });
    const newPath = path_1.default.join(__dirname, `${path_1.default.basename(fileName)}_${Date.now()}${path_1.default.extname(fileName)}`);
    await fs_1.default.promises.writeFile(newPath, await fs_1.default.promises.readFile(filePath));
    console.log(`File written to: ${newPath}`);
    res.json(true);
});
app.all('*', (_, res) => res.sendStatus(204));
app.listen(port, () => console.log(`listening on *:${port}`));
