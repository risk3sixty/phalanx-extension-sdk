/// <reference types="node" />
import { Readable } from 'stream';
declare const _default: {
    organizationId: string | undefined;
    userId: string | undefined;
    phalanxApiKey: string | undefined;
    executionId: string | undefined;
    uploadEndpoint: string | undefined;
    /**
     * uploadFile
     * @param binaryData data to pass as a file
     * @param name optional name of file (with extension relevant to type of file being sent)
     */
    uploadFile(binaryData: Buffer | Readable | string, name?: string | undefined): Promise<StringMap>;
};
export default _default;
