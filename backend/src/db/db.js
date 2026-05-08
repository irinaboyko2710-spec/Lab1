const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs'); 
const dataDirPath = path.resolve(__dirname, '../../data');
if (!fs.existsSync(dataDirPath)) {
    fs.mkdirSync(dataDirPath, { recursive: true });
}
const dbPath = path.join(dataDirPath, 'app.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Помилка підключення до БД:', err.message);
    } else {
        console.log('Зв’язок із файлом бази встановлено.');
        db.run(`CREATE TABLE IF NOT EXISTS incidents (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT,
            tag TEXT,
            severity TEXT,
            comments TEXT,
            user_id INTEGER,
            user_name TEXT -- ЦЕ ТЕ, ЧОГО НЕ ВИСТАЧАЛО
        )`, (err) => {
            if (err) {
                console.error('Помилка створення таблиці:', err.message);
            } else {
                console.log('Таблиця incidents готова до роботи.');
            }
        });
    }
});
db.run('PRAGMA foreign_keys = ON;');
module.exports = db;