exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       (process.env.NODE_ENV === 'production' ?
                            'mongodb://localhost/germanx' :
                            'mongodb://localhost/germanx-dev');
exports.PORT = process.env.PORT || 3000;
