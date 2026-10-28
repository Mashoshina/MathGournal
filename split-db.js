// Разделяет единый db.json на отдельные файлы по сущностям: db/<сущность>.json
// Запуск: node split-db.js   (после этого правьте уже файлы в db/ и запускайте npm run mock)
import fs from 'node:fs'
import path from 'node:path'

const source = 'db.json'
const targetDir = 'db'

const db = JSON.parse(fs.readFileSync(source, 'utf8'))
fs.mkdirSync(targetDir, { recursive: true })

for (const [name, data] of Object.entries(db)) {
  fs.writeFileSync(path.join(targetDir, `${name}.json`), JSON.stringify(data, null, 2) + '\n')
  console.log(`db/${name}.json`)
}
