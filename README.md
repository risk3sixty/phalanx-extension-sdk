# fullCircle Automation Extension SDK

A library that can be used in fullCircle automations/extensions
to provide utilities to access common information available
in any automation execution and to send data ad hoc back to fullCircle
as needed.

## Install

```sh
$ npm install --save @risk3sixty/extension-sdk
```

## Example

```
import R3sSdk from '@risk3sixty/extension-sdk'

// Pass back table of data
R3sSdk.addExecutionTabularRows(arrayData)

// Upload a file
R3sSdk.uploadFile(csvData, 'filename.csv')
```

## Development

### Test Server

```sh
$ npx phalanxSdkTestServer
```
