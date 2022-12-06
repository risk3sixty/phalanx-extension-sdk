"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const axios_1 = __importDefault(require("axios"));
const form_data_1 = __importDefault(require("form-data"));
exports.default = {
    organizationId: process.env.R3S_ORGANIZATION_ID,
    userId: process.env.R3S_USER_ID,
    phalanxApiKey: process.env.R3S_API_KEY,
    executionId: process.env.R3S_EXECUTION_ID,
    tabularEndpoint: process.env.R3S_EXECUTION_TABULAR_ENDPOINT,
    uploadEndpoint: process.env.R3S_EXECUTION_UPLOAD_ENDPOINT,
    processScanEndpoint: process.env.R3S_EXECUTION_PROCESS_SCAN_ENDPOINT,
    /**
     * uploadFile
     * @param binaryData data to pass as a file
     * @param name optional name of file (with extension relevant to type of file being sent)
     */
    async uploadFile(binaryData, name) {
        assert_1.default(this.uploadEndpoint, 'upload endpoint is not available');
        assert_1.default(this.phalanxApiKey, 'Phalanx API key is not available');
        const form = new form_data_1.default();
        form.append(`file`, binaryData, name);
        const { data } = await axios_1.default.post(this.uploadEndpoint, form, {
            headers: {
                ...form.getHeaders(),
                ['x-r3s-key']: this.phalanxApiKey,
            },
        });
        return data;
    },
    async addExecutionTabularRows(rowsCols) {
        assert_1.default(this.tabularEndpoint, 'tabular endpoint is not available');
        assert_1.default(this.phalanxApiKey, 'Phalanx API key is not available');
        const { data } = await axios_1.default.post(this.tabularEndpoint, { data: rowsCols }, {
            headers: {
                ['x-r3s-key']: this.phalanxApiKey,
            },
        });
        return data;
    },
    /**
     * processScan
     * @param type type of scan performed
     * @param uploadId upload id from file_uploads table of scan results
     */
    async processScan(type, uploadId) {
        assert_1.default(this.processScanEndpoint, 'process scan endpoint is not available');
        assert_1.default(this.phalanxApiKey, 'Phalanx API key is not available');
        const { data } = await axios_1.default.post(this.processScanEndpoint, {
            type: type,
            uploadId: uploadId,
            teamId: this.organizationId
        }, {
            headers: {
                ['x-r3s-key']: this.phalanxApiKey,
            },
        });
        return data;
    }
};
