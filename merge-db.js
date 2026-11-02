// Собирает db/*.json обратно в один db.json для json-server.
// Запуск: node merge-db.js   (или автоматически перед сервером: см. скрипт mock в package.json)
import fs from 'node:fs'
import path from 'node:path'

const dir = 'db'
const db = {}

for (const file of fs.readdirSync(dir)) {
  if (!file.endsWith('.json')) continue
  const name = path.basename(file, '.json')
  db[name] = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'))
}

fs.writeFileSync('db.json', JSON.stringify(db, null, 2) + '\n')
console.log('db.json собран:', Object.keys(db).join(', '))
