import React from 'react';
import Note from './note.js';

export default ({notes}) => {
    return (
        <ul>{notes.map(note => <li key={note.id}><Note task={note.task} /></li>)}</ul>
    );
}