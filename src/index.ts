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
  processResultsEndpoint: process.env.R3S_EXECUTION_PROCESS_RESULTS_ENDPOINT,

  /**
   * uploadFile
   * @param binaryData data to pass as a file
   * @param name optional name of file (with extension relevant to type of file being sent)
   */
  async uploadFile(
    binaryData: Buffer | Readable | string,
    name?: string
  ): Promise<StringMap> {
    assert(this.uploadEndpoint, 'Upload endpoint is not available')
    assert(this.phalanxApiKey, 'Phalanx API key is not available')
    assert(this.organizationId, 'Organiztion ID is not available')

    const form = new FormData()
    form.append(`file`, binaryData, name)
    form.append(`teamId`, this.organizationId)

    const { data } = await axios.post(this.uploadEndpoint, form, {
      headers: {
        ...form.getHeaders(),
        ['x-r3s-key']: this.phalanxApiKey,
      },
    })
    return data
  },

  async addExecutionTabularRows(rowsCols: IRowCol[]) {
    assert(this.tabularEndpoint, 'Tabular endpoint is not available')
    assert(this.phalanxApiKey, 'Phalanx API key is not available')
    assert(this.organizationId, 'Organiztion ID is not available')

    const { data } = await axios.post(
      this.tabularEndpoint,
      { 
        teamId: this.organizationId, 
        data: rowsCols
      },
      {
        headers: {
          ['x-r3s-key']: this.phalanxApiKey,
        },
      }
    )
    return data
  },

  /**
   * processExecutionResults
   * @param type type of execution results
   * @param uploadId upload id from file_uploads table of execution results
   */
  async processExecutionResults(type: String, uploadId: String) {
    assert(this.processResultsEndpoint, 'Process results endpoint is not available')
    assert(this.phalanxApiKey, 'Phalanx API key is not available')
    assert(this.organizationId, 'Organiztion ID is not available')

    const { data } = await axios.post(
      this.processResultsEndpoint,
      { 
        teamId: this.organizationId,
        executionId: this.executionId,
        uploadId: uploadId,
        type: type, 
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
