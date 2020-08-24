"use strict";
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
process.env.PORT = process.env.PORT || '7070';
if (process.env.NODE_ENV == 'dev')
    process.env.URL_DB = 'mongodb+srv://felipe:felipe@hospital.szdjv.mongodb.net/app?retryWrites=true&w=majority';
