// port
process.env.PORT = process.env.PORT || 3000;
// env
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'
    // db
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe'
} else {
    urlDB = 'mongodb+srv://dbUser:p@55w0rd@cluster0-n1y1j.mongodb.net/cafe'
}

process.env.URLDB = urlDB