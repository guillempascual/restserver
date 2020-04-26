// port
process.env.PORT = process.env.PORT || 3000;
// env
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

// token expire
// 60min * 60s * 24 * 30 dias 
process.env.TOKEN_EXPIRE = 60 * 60 * 24 * 30;

// seed token
process.env.TOKEN_SEED =  process.env.TOKEN_SEED || 'my-seed'

// db
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe'
} else {
    urlDB = process.env.MONGO_URI
}

process.env.URLDB = urlDB