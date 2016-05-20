import React from 'react';
import Note from './note.js';

export default ({notes, onEdit, onDelete}) => {
    return (
        <ul className="notes">{notes.map(note => 
            <li key={note.id} className="note">
            <Note 
                task={note.task} 
                onEdit={onEdit.bind(null, note.id)}
                onDelete={onDelete.bind(null, note.id)} />
            </li>)}
        </ul>
    );
}