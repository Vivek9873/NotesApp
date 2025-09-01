import Notes from "../models/notes.js";
import User from "../models/user.js";


export const createNotes = async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.userId;
        const note = await Notes.create({ title, content, creator: userId });
        const user = await User.findById(userId)
        user.notes.push(note._id);
        await user.save();
        res.status(200).json({ message: "Note Created Successfully", data: note });
    }
    catch (e) {
        res.status(500).json({ message: "Create Notes error is " + e.message });
    }

}

export const deleteNote = async (req, res) => {
    try {
        const userId = req.userId;
        const { noteId } = req.body || req.params;
        console.log(noteId)
        console.log(req.body)

        const note = await Notes.findById(noteId);
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }


        if (note.creator.toString() !== userId) {
            return res.status(403).json({ message: "Not authorized to delete this note" });
        }

        await Notes.findByIdAndDelete(noteId);

        await User.findByIdAndUpdate(userId, { $pull: { notes: noteId } });

        res.status(200).json({ message: "Note deleted successfully" });
    }
    catch (e) {
        res.status(500).json({ message: "Delete note error: " + e.message });
    }
};

export const editNotes = async (req, res) => {
    try {

        const { title, content } = req.body;
        const { noteId } = req.params;
        const userId = req.userId;
        const note = await Notes.findById(noteId);
        if (!note) {
            return res.status(404).json({ message: "Note not found" });

        }
        if (note.creator.toString() !== userId) {
            return res.status(403).json({ message: "Not authorized to update this note" });
        }
        if (title) note.title = title;
        if (content) note.content = content;
        await note.save();
        res.status(200).json({ message: "Note updated successfully" });

    }
    catch (e) {
        res.status(500).json({ message: "Update note error: " + e.message });

    }
}