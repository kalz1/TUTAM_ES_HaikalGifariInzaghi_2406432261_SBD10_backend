const noteRepo = require('../repositories/noteRepo');

exports.getNotes = async (req, res) => {
    try {
        const notes = await noteRepo.getAllNotes();
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: 'Gagal mengambil catatan' });
    }
};

exports.createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const newNote = await noteRepo.createNote(title, content);
        res.status(201).json(newNote);
    } catch (error) {
        res.status(500).json({ message: 'Gagal membuat catatan' });
    }
};

exports.deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        await noteRepo.deleteNote(id);
        res.json({ message: 'Catatan berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ message: 'Gagal menghapus catatan' });
    }
};