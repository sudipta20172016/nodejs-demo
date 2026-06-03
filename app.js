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

app.get("/call-user-test", async (req, res) => {
  try {
    const response = await fetch(`${process.env.USER_SERVICE_URL}/users/test`);

    if (!response.ok) {
      throw new Error(`User service returned ${response.status}`);
    }

    const data = await response.text();
    res.send(data);
  } catch (error) {
    console.error("Error calling user-service:", error);
    res.status(500).send("Failed to call user-service");
  }
});

// Listn thius test tool new build one more
app.listen(port, () => {
    console.log(`Server running on port ${port}, version Test ${appVersion}`);
});
