const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    const filePath = path.join(__dirname,  'index.html');
    res.sendFile(filePath);
});

// Route to handle email sending
app.post('/send', (req, res) => {
    const { name, email, message } = req.body;

    // Create a transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'testwowtruecaller123', // Your Gmail address
            pass: 'vpjbpiivyzziwgkd' // Your Gmail password or App Password
        }
    });

    // Set up email data
    const mailOptions = {
        from: email,
        to: 'yashshah3698@gmail.com', // Your email address
        subject: `New message from ${name}`,
        text: message
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(`Error sending email: ${error.message}`);
            return res.status(500).send('error');
        }
        res.send('success');
    });
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
