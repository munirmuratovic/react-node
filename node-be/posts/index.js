const express = require('express');
const router = express.Router();

let posts = [];
let nextId = 1;

router.get('/', (req, res) => {
    res.json(posts);
});

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const post = posts.find(p => p.id === id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
});

router.post('/', (req, res) => {
    const { title, content } = req.body || {};
    if (!title || !content) return res.status(400).json({ error: 'title and content are required' });
    const post = { id: nextId++, title, content, createdAt: new Date().toISOString() };
    posts.push(post);
    res.status(201).json(post);
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const post = posts.find(p => p.id === id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    const { title, content } = req.body || {};
    if (title !== undefined) post.title = title;
    if (content !== undefined) post.content = content;
    post.updatedAt = new Date().toISOString();
    res.json(post);
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const idx = posts.findIndex(p => p.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Post not found' });
    const removed = posts.splice(idx, 1)[0];
    res.json(removed);
});

module.exports = router;
