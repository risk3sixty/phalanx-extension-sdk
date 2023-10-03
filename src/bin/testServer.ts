import fs from 'fs'
import path from 'path'
import bodyParser from 'body-parser'
import express, { Request, Response } from 'express'
import formidable from 'express-formidable'
import minimist from 'minimist'

const argv = minimist(process.argv.slice(2))
const port = argv.p || argv.port || 8000

const app = express()

app.use(bodyParser.json({ limit: '1mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }))
app.use(formidable())

app.post(`/extension/upload/*`, async function(
  req: Request & any,
  res: Response
) {
  const [
    { name: fileName, /* size,*/ path: filePath /*, type*/ },
  ]: any = Object.values(req.files)

  if (!path) return res.status(400).json({ error: `No file uploaded` })

  const newPath = path.join(
    __dirname,
    `${path.basename(fileName)}_${Date.now()}${path.extname(fileName)}`
  )
  await fs.promises.writeFile(newPath, await fs.promises.readFile(filePath))
  console.log(`File written to: ${newPath}`)

  res.json(true)
})

app.all('*', (_: Request, res: Response) => res.sendStatus(204))

app.listen(port, () => console.log(`listening on *:${port}`))
