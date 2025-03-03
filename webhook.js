const express = require('express');
const { exec } = require('child_process');
const app = express();
const PORT = 3000; // You can change this if needed

app.use(express.json());

app.post('/webhook', (req, res) => {
    const payload = req.body;

    // Verify the event is a push to the main branch
    if (payload.ref === 'refs/heads/main') {
        console.log('Received push event. Pulling latest code...');
        
        exec('git pull origin main && docker-compose down && docker-compose up -d --build', (err, stdout, stderr) => {
            if (err) {
                console.error(`Error pulling code: ${err.message}`);
                return res.status(500).send('Error pulling code');
            }

            console.log(`Git Pull Output: ${stdout}`);
            console.error(`Git Pull Errors: ${stderr}`);

            res.status(200).send('Update triggered successfully');
        });
    } else {
        res.status(400).send('Not a push to main');
    }
});

app.listen(PORT, () => {
    console.log(`Webhook listener running on port ${PORT}`);
});
