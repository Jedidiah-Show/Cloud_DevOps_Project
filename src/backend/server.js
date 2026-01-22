const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('../frontend'));

app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'healthy',
        service: 'Ruach',
        timestamp: new Date().toISOString()
    });
});

app.get('/api/todos', (req, res) => {
    // Mock data - replace with database later
    res.json([
        { id: 1, title: 'Learn DevOps', completed: false },
        { id: 2, title: 'Build PDA Project', completed: false }
    ]);
});

app.listen(PORT, () => {
    console.log(`Ruach running on port ${PORT}`);
});
