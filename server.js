const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// Simple HTTP server to serve the MediFlow website
const server = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Route handling
  const routes = {
    '/': '<h1>MediFlow - Healthcare Navigation Platform</h1><p><a href="/dashboard">Go to Dashboard</a></p>',
    '/dashboard': '<h1>MediFlow Dashboard</h1><p>Patient: John Doe</p><p><a href="/">Back Home</a></p>',
    '/appointments': '<h1>Appointments</h1><p>No appointments scheduled</p><p><a href="/">Back Home</a></p>',
    '/records': '<h1>Medical Records</h1><p>No records available</p><p><a href="/">Back Home</a></p>',
    '/health': JSON.stringify({ status: 'ok', service: 'MediFlow Frontend' }),
  };

  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', service: 'MediFlow Frontend', port: PORT }));
    return;
  }

  const route = routes[req.url] || routes['/'];
  const contentType = req.url === '/health' ? 'application/json' : 'text/html';

  res.writeHead(200, { 'Content-Type': contentType });
  res.end(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>MediFlow</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
        h1 { color: #333; }
        a { color: #1456f0; text-decoration: none; margin: 10px; }
        a:hover { text-decoration: underline; }
        .container { background: white; padding: 20px; border-radius: 8px; max-width: 800px; }
        .nav { margin: 20px 0; }
        .status { background: #e8f5e9; padding: 10px; border-radius: 4px; margin: 10px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        ${route}
        <div class="nav">
          <p>Navigation:</p>
          <a href="/">Home</a> |
          <a href="/dashboard">Dashboard</a> |
          <a href="/appointments">Appointments</a> |
          <a href="/records">Records</a>
        </div>
        <div class="status">
          <p><strong>Status:</strong> ✅ Server Running on port ${PORT}</p>
          <p><strong>Service:</strong> MediFlow Frontend (Simple Server)</p>
          <p><strong>API:</strong> http://localhost:3001</p>
        </div>
      </div>
    </body>
    </html>
  `);
});

server.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║  ✅ MediFlow Frontend Server Running                      ║
║  🌐 http://localhost:${PORT}                              ║
║  📡 API: http://localhost:3001                            ║
║                                                            ║
║  This is a temporary server while Next.js configures    ║
║  Full website with 19 pages ready at /pages              ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
  `);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Port ${PORT} is already in use. Trying ${PORT + 1}...`);
    server.listen(PORT + 1);
  } else {
    console.error(err);
  }
});
