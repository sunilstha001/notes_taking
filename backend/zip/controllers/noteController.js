const asyncHandler = require('express-async-handler');
const Note = require('../models/noteModel');

// @desc    Get logged in user's notes
const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user._id });
  res.json(notes);
});

// @desc    Create a new note
const createNote = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    res.status(400);
    throw new Error('Please fill in all fields');
  }

  const note = new Note({
    user: req.user._id, // Associate note with the logged-in user
    title,
    content,
  });

  const createdNote = await note.save();
  res.status(201).json(createdNote);
});

// @desc    Update a note
const updateNote = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  const note = await Note.findById(req.params.id);

  // Check if note belongs to the user
  if (note.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (note) {
    note.title = title || note.title;
    note.content = content || note.content;

    const updatedNote = await note.save();
    res.json(updatedNote);
  } else {
    res.status(404);
    throw new Error('Note not found');
  }
});

// @desc    Delete a note
const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  // Check if note belongs to the user
  if (note.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (note) {
    await note.deleteOne();
    res.json({ message: 'Note Removed' });
  } else {
    res.status(404);
    throw new Error('Note not found');
  }
});

module.exports = { getNotes, createNote, updateNote, deleteNote };