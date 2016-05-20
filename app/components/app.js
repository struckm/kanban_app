import AltContainer from 'alt-container';
import React from 'react';
import Notes from './notes';
import NoteActions from '../actions/noteActions';
import NoteStore from '../stores/noteStore';

class App extends React.Component {
    constructor() {
        super();
        
        // autobind 
        this.addNote = this.addNote.bind(this);
        this.editNote = this.editNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
    }
    
    addNote() {
        NoteActions.create({task: 'New Task'});
    }

    editNote(id, task) {
        // Don't modify if trying to set an empty value
        if(!task.trim()) {
            return;
        }
        
        NoteActions.update({id, task});
    }
    
    deleteNote(id, e) {
        e.stopPropagation();
        
        NoteActions.delete(id);
    }
    
    render() {
        return (
            <div>
                <button className="add-note" onClick={this.addNote}>+</button>
                <AltContainer
                    stores={[NoteStore]}
                    inject={{
                        notes: () => NoteStore.getState().notes
                    }}>
                    <Notes onEdit={this.editNote} onDelete={this.deleteNote} />
                </AltContainer>
            </div>
        );
    }
}

export default App;