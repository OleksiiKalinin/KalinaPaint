const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const cloudinary = require('cloudinary').v2;
const {Server} = require("ws");

cloudinary.config({ 
    cloud_name: 'secret:)', 
    api_key: 'secret:)', 
    api_secret: 'secret:)',
    secure: true
  });

app.use(cors());
app.use(express.json({limit: '50mb'}));

let savedUrls = {};

app.post('/image', (req, res) => {
    try {
        cloudinary.uploader.upload(req.body.image, {
            public_id: `paint/${req.query.id}`,
            overwrite: true
        }, (_, res) => {
            savedUrls[req.query.id] = res.secure_url;
        });
        return res.json('ok');
    } catch (e) {
        console.log(e);
        return res.status(500).json('error');
    }
});

app.get('/image', (req, res) => {
    try {
        if (!savedUrls[req.query.id]) throw new Error('not exist')
        res.json(savedUrls[req.query.id]);
    } catch (e) {
        return res.status(500).json(e.message);
    }
});

const wss = new Server({ server: app.listen(PORT, () => console.log('Server started')) });

wss.on('connection', function connection(ws) {
	ws.on('message', (ws => msg => {
        msg = JSON.parse(msg);
        switch(msg.method) {
            case 'connection':
                ws.id = msg.id;
                broadcastConnection(msg);
                break;
            default:
                broadcastConnection(msg);
                break;
        }
	})(ws));
});

const broadcastConnection = (msg) => {
    wss.clients.forEach(client => {
        if (client.id === msg.id) {
            client.send(JSON.stringify(msg));
        }
    });
}
