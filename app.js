const express = require('express');
const { version } = require('./package.json');

const app = express();
const appVersion = process.env.APP_VERSION || version;
const port = process.env.PORT || 3000;

// test ok
app.get('/', (req, res) => {
    res.send(`Hello from Jenkins + Docker! Version: ${appVersion}`);
});

app.get('/version', (req, res) => {
    res.json({
        name: 'nodejs-demo',
        version: appVersion
    });
});

// Listn thius test tool new build one more
app.listen(port, () => {
    console.log(`Server running on port ${port}, version Test ${appVersion}`);
});
