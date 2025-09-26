const fs = require('fs');
const path = require('path');

const usersDbPath = path.join(__dirname, "db", 'users.json');

function authenticate(req, res) {
    return new Promise((resolve, reject) => {
        // Get authorization header
        const authHeader = req.headers.authorization;
        
        if (!authHeader) {
            return reject('Authorization header missing');
        }

        // Parse Basic Auth (format: "Basic base64(username:password)")
        if (!authHeader.startsWith('Basic ')) {
            return reject('Invalid authorization format');
        }

        const base64Credentials = authHeader.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        const [username, password] = credentials.split(':');

        // Read users from database
        fs.readFile(usersDbPath, 'utf8', (err, data) => {
            if (err) {
                return reject('Could not read users database');
            }

            try {
                const users = JSON.parse(data);
                const user = users.find(u => u.username === username && u.password === password);
                
                if (user) {
                    resolve(user); // Authentication successful
                } else {
                    reject('Invalid credentials');
                }
            } catch (parseErr) {
                reject('Invalid users database format');
            }
        });
    });
}

module.exports = authenticate;