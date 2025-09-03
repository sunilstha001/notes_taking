import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getNotes, createNote, updateNote, deleteNote } from '../api/notes';
import { logoutUser } from '../api/users';
import useUserStore from '../store/userStore';
import { Plus, Edit2, Trash2, Notebook } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg p-6 bg-white rounded-lg shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default function DashboardPage() {
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const { userInfo, logout } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const notesData = await getNotes();
        setNotes(notesData.reverse());
      } catch (error) {
        toast.error('Could not fetch notes.');
      }
    };
    fetchNotes();
  }, []);

  const openAddModal = () => {
    setCurrentNote({ title: '', content: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (note) => {
    setCurrentNote(note);
    setIsModalOpen(true);
  };

  const handleSaveNote = async (e) => {
    e.preventDefault();
    const isEditing = currentNote && currentNote._id;

    try {
      if (isEditing) {
        const updated = await updateNote(currentNote._id, {
          title: currentNote.title,
          content: currentNote.content,
        });
        setNotes(notes.map((n) => (n._id === updated._id ? updated : n)));
        toast.success('Note updated successfully!');
      } else {
        const newNote = await createNote(currentNote);
        setNotes([newNote, ...notes]);
        toast.success('Note created successfully!');
      }
      setIsModalOpen(false);
      setCurrentNote(null);
    } catch (error) {
      toast.error('Failed to save note.');
    }
  };

  const handleDeleteNote = async (noteId) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await deleteNote(noteId);
        setNotes(notes.filter((n) => n._id !== noteId));
        toast.success('Note deleted.');
      } catch (error) {
        toast.error('Failed to delete note.');
      }
    }
  };

  const handleLogout = async () => {
  // NEW: Added a confirmation dialog before logging out
  if (window.confirm('Are you sure you want to log out?')) {
    try {
      await logoutUser();
      logout();
      toast.info('You have been logged out.');
      navigate('/login');
    } catch (error) {
      toast.error('Logout failed.');
    }
  }
};

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* ===== UPDATED HEADER SECTION ===== */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          
          {/* Left side with Branding and Welcome Message */}
          <div>
            <div className="flex items-center gap-3 mt-1">
              <Notebook className="h-7 w-7 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900 ">
                Note Taking
              </h1>
            </div>
            <p className="mt-1 text-md text-gray-900">
              Welcome back, {userInfo?.name}
            </p>
          </div>

          {/* Right side for Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={openAddModal}
              className="flex items-center gap-2 px-4 py-2 font-semibold text-white bg-black rounded-md hover:bg-gray-800"
            >
              <Plus size={16} />
              <span className="hidden md:inline">New Note</span>
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      {/* ===== END OF UPDATED HEADER SECTION ===== */}


      {/* Notes Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {notes.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {notes.map((note) => (
              <div key={note._id} className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{note.title}</h3>
                  <p className="text-gray-600 whitespace-pre-wrap">{note.content}</p>
                </div>
                <div className="flex justify-between items-center mt-4 pt-4 border-t">
                  <p className="text-xs text-gray-500">
                    {new Date(note.createdAt).toLocaleDateString()}
                  </p>
                  <div className="flex gap-2">
                    <button onClick={() => openEditModal(note)} className="p-2 text-gray-500 hover:text-blue-600">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDeleteNote(note._id)} className="p-2 text-gray-500 hover:text-red-600">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold">No notes yet</h3>
            <p className="text-gray-500 mt-2">Click "New Note" to get started.</p>
          </div>
        )}
      </main>

      {/* Modal for Adding/Editing Notes */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={currentNote?._id ? 'Edit Note' : 'Create Note'}
      >
        {currentNote && (
          <form onSubmit={handleSaveNote} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={currentNote.title}
                onChange={(e) => setCurrentNote({ ...currentNote, title: e.target.value })}
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Content</label>
              <textarea
                value={currentNote.content}
                onChange={(e) => setCurrentNote({ ...currentNote, content: e.target.value })}
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={6}
                required
              />
            </div>
            <div className="flex justify-end gap-4 pt-4">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 font-semibold text-white bg-black rounded-md hover:bg-gray-800">
                Save
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}