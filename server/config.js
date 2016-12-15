exports.DATABASE_URL = //'mongodb://justinmlawrence:abcd1234@ds113678.mlab.com:13678/german-x';
                        process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       (process.env.NODE_ENV =
                            'mongodb://justinmlawrence:abcd1234@ds113678.mlab.com:13678/german-x');
exports.PORT = process.env.PORT || 5000;
