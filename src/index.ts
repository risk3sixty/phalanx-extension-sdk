import assert from 'assert'
import axios from 'axios'
import FormData from 'form-data'
import { Readable } from 'stream'

export default {
  organizationId: process.env.R3S_ORGANIZATION_ID,
  userId: process.env.R3S_USER_ID,
  phalanxApiKey: process.env.R3S_API_KEY,
  executionId: process.env.R3S_EXECUTION_ID,
  tabularEndpoint: process.env.R3S_EXECUTION_TABULAR_ENDPOINT,
  uploadEndpoint: process.env.R3S_EXECUTION_UPLOAD_ENDPOINT,
  processScanEndpoint: process.env.R3S_PROCESS_SCAN_ENDPOINT,

  /**
   * uploadFile
   * @param binaryData data to pass as a file
   * @param name optional name of file (with extension relevant to type of file being sent)
   */
  async uploadFile(
    binaryData: Buffer | Readable | string,
    name?: string
  ): Promise<StringMap> {
    assert(this.uploadEndpoint, 'upload endpoint is not available')
    assert(this.phalanxApiKey, 'Phalanx API key is not available')

    const form = new FormData()
    form.append(`file`, binaryData, name)

    const { data } = await axios.post(this.uploadEndpoint, form, {
      headers: {
        ...form.getHeaders(),
        ['x-r3s-key']: this.phalanxApiKey,
      },
    })
    return data
  },

  async addExecutionTabularRows(rowsCols: IRowCol[]) {
    assert(this.tabularEndpoint, 'tabular endpoint is not available')
    assert(this.phalanxApiKey, 'Phalanx API key is not available')

    const { data } = await axios.post(
      this.tabularEndpoint,
      { data: rowsCols },
      {
        headers: {
          ['x-r3s-key']: this.phalanxApiKey,
        },
      }
    )
    return data
  },

  /**
   * processScan
   * @param type type of scan performed
   * @param filename filename of scan results
   */
  async processScan(type: String, filename: String) {
    assert(this.processScanEndpoint, 'process scan endpoint is not available')
    assert(this.phalanxApiKey, 'Phalanx API key is not available')

    const { data } = await axios.post(
      this.processScanEndpoint,
      { 
        type: type, 
        filename: filename, 
        teamId: this.organizationId 
      },
      {
        headers: {
          ['x-r3s-key']: this.phalanxApiKey,
        },
      }
    )
    return data
  }
}
