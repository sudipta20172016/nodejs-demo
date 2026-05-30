const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello from Jenkins + Docker!');
});

// Listn thius test tool new build one more
app.listen(3000, () => {
    console.log('Server running on port 3000');
});