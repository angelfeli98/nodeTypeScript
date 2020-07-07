
require('./config/config');

const app = require('./app');

app.listen(process.env.PORT, (err) => {
    if(!!!err) console.log(`Server ready at http://localhost:7070`);
})