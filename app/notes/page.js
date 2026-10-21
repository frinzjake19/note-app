"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NotesPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // Guard: send visitors who haven't logged in back to the login screen
  useEffect(() => {
    const saved = sessionStorage.getItem("note-app-user");
    if (!saved) {
      router.replace("/");
      return;
    }
    setUser(saved);
  }, [router]);

  function addNote(e) {
    e.preventDefault();
    if (!title.trim() && !body.trim()) return;
    setNotes([{ id: Date.now(), title: title.trim() || "Untitled", body }, ...notes]);
    setTitle("");
    setBody("");
  }

  function deleteNote(id) {
    setNotes(notes.filter((n) => n.id !== id));
  }

  // Bonus 2: logout returns to the login screen
  function handleLogout() {
    sessionStorage.removeItem("note-app-user");
    router.push("/");
  }

  if (!user) return null;

  return (
    <>
      <header className="topbar">
        <div className="brand">
          <div className="logo">📝</div> Notely
        </div>
        <div className="topbar-right">
          <span>{user}</span>
          <button className="logout-btn" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </header>

      <main className="container">
        <form className="add-note" onSubmit={addNote}>
          <input
            placeholder="Note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            rows={3}
            placeholder="Write your note..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <button type="submit" className="btn">
            Add note
          </button>
        </form>

        {notes.length === 0 ? (
          <p className="empty">No notes yet. Add your first one above!</p>
        ) : (
          <section className="notes-grid">
            {notes.map((n) => (
              <article key={n.id} className="note">
                <button
                  className="del"
                  onClick={() => deleteNote(n.id)}
                  aria-label="Delete note"
                >
                  ×
                </button>
                <h3>{n.title}</h3>
                <p>{n.body}</p>
              </article>
            ))}
          </section>
        )}
      </main>
    </>
  );
}
