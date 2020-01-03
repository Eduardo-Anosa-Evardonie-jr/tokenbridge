const fs = require('fs')
const path = require('path')

async function readFile(filePath) {
  try {
    const content = await fs.readFileSync(filePath)
    const json = JSON.parse(content)
    const timeDiff = Math.floor(Date.now() / 1000) - json.lastChecked
    return Object.assign({}, json, { timeDiff })
  } catch (e) {
    console.error(e)
    return {
      error: 'please check your worker'
    }
  }
}

function writeFile(filePath, object) {
  fs.writeFileSync(path.join(process.cwd(), filePath), JSON.stringify(object, null, 4))
}

function createDir(dirPath) {
  fs.mkdirSync(path.join(process.cwd(), dirPath), { recursive: true })
}

module.exports = {
  readFile,
  writeFile,
  createDir
}
