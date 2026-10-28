// Собирает src/json_data_base/js_*.json в один db.json для json-server.
// Запуск: node build-db.js   (или автоматически перед сервером: npm run mock)
import fs from 'node:fs'
import path from 'node:path'

const dir = 'src/json_data_base'
const prefix = 'js_' // только файлы вида js_<сущность>.json попадают в базу
const db = {}

for (const file of fs.readdirSync(dir)) {
  if (!file.startsWith(prefix) || !file.endsWith('.json')) continue
  const name = path.basename(file, '.json').slice(prefix.length) // js_users.json -> users
  db[name] = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'))
}

fs.writeFileSync('db.json', JSON.stringify(db, null, 2) + '\n')
console.log('db.json собран из', dir + ':', Object.keys(db).join(', '))
