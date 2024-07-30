const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkVHeWtZb3BzY1ZsK0JFdU9wQS9tb1hKT3ZBVXl1RjIxMHlrV1o1d25uUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUVdCODlmeGJPaklLa2czdkhiMG5zWlRLOWxZK3QrSTJZRlF4RDBhNG5oND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1RCtCZ1NoYXNkbCtKR2U5T3lURVpyRjltZkhDbDhRcWtvTDd6WEpCU2xrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ0cWZycXJDUVFCcEo2c0hYTS9rYm9KTGtyTGVqaUZ5bHFHenpVQ1ZoNHcwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNNTFRGMEZEL3pjQzdWRUlaeWdNZVdNakRNRTl3eXlFdVRKVXo5V250VUE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNxem9STDAreHozTVk2QkhZQ2VGclo1a3NKR2YzaXY0SDJIN29XMDVEMlU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUpuTTk0aEhCcFEvZm1CRDNuT3FGc1A0YWVGemV0ckNaZXVsdGdIdEYyYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOEJUcmVPSVFyVXB5UEdSR25UbUxKaGpEdTJuUUVTYm1HazRUOEhqamEwcz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImRuQ1RXdnlkQkJYbVJhMXBibGF0aFNvaW5XRDhVV0dPNWFnYjZmYkhmbEd1OGM3cWZWNm95dEI4anhUSDhudGx4ZFhYT0dqU2pBeGZ0OW43bmNKYWp3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OTAsImFkdlNlY3JldEtleSI6ImZHNVB0ZzNRb0tOMEFlWEZ4b0RDbmpZWm9xRmVJKzErWGNVUUFHSFJ1L3M9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0OTEyMzcyMTAyNkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIyQzkxQUM2MzM1NjVBMkJBQjc1NjQxMUEwM0M3NENENCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzIyMzQ4Mzg5fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyMzQ5MTIzNzIxMDI2QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjVCRjBEQ0Q3Q0U0NTJEOTBCNDFGMkYxQ0I0RDVGRUUwIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjIzNDgzOTB9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Ik44dGt3NzRXU2dpRkI3d0NoQ09OOUEiLCJwaG9uZUlkIjoiMWU1YjlmMWEtMjRhNS00Yjk4LTljZmQtZTJmMTMzYjhjNTU4IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImRQOGpYY3RXa3ZxMGZCbytJSUl4UGRWOVhMaz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHeDc4VjV4Uitnd0ZWNjY1c3RCaFdyQTdYYmM9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiRVNXTENOVkMiLCJtZSI6eyJpZCI6IjIzNDkxMjM3MjEwMjY6NDRAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiS2luZyDwn5GRIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNNZUgvNlVFRU5UbW83VUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJWTnBuZ2F0QjVDNUxUeUZBWVBXU3dPMURFeE5vVEVpbGhveU1rRTk0akVBPSIsImFjY291bnRTaWduYXR1cmUiOiJPWkVGbHZmOG5JZ290eEExUGZWMHZvRjlsN2JJMldWL2ZoYm5jeUhMUEw3NzBCSHZIRm5XZFNlNi8wWkZWcGV3QmJxbW1xR1BQc3RjSGJTckFXR1lDUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiZ1BRQjBPWmtTUzVvenBnaVh6VkNNUHlXRDdtWnNiTkdqaGgzWmo5bVVvMHNwS0tlaW14S08yZ0RmbTlpMlo5dW5iR0tDNGVFK1dBREN5NlZSWVpMaFE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ5MTIzNzIxMDI2OjQ0QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlZUYVo0R3JRZVF1UzA4aFFHRDFrc0R0UXhNVGFFeElwWWFNakpCUGVJeEEifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjIzNDgzODUsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBUDVrIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "ALYA",
    NUMERO_OWNER : process.env.OWNER_NUM || "2349123721026",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'ALYA-V2',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
