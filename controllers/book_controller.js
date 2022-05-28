const express = require('express');
const { json } = require('express/lib/response');
const router = express.Router();
const Books = require('../models/book.js');
const bookSeed = require('../models/book-seed.js');

router.get('/seed', async (req, res) => {
    try {
        await Books.insertMany(bookSeed);
        res.status(200).json({ message: 'Seed successful!'})
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
});

router.get('/', async (req, res) => {
    try {
        let foundBooks = await Books.find();
        res.status(200).json(foundBooks)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
});

router.post('/', async (req, res) => {
    try {
        await Books.create(req.body);
        res.status(201).redirect('/books')
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
});

router.get('/:id', async (req, res) => {
    try {
        res.status(200).json(await Books.findById(req.params.id))
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
});

router.put('/:id', async (req, res) => {
    try {
        await Books.findByIdAndUpdate(req.params.id, req.body);
        res.status(204).redirect(`/books/${req.params.id}`)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Books.findByIdAndDelete(req.params.id);
        res.status(200).redirect('/books')
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
});

module.exports = router;