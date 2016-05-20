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
        this.storeChanged = this.storeChanged.bind(this);
        this.state = NoteStore.getState();
    }
    
    // React Lifecycle event methods
    componentDidMount() {
        NoteStore.listen(this.storeChanged);
    }

    componentWillUnmount() {
        NoteStore.unlisten(this.storeChanged);
    }

    storeChanged(state) {
        this.setState(state);
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
        const notes = this.state.notes;
        return (
            <div>
                <button className="add-note" onClick={this.addNote}>+</button>
                <Notes notes={notes} onEdit={this.editNote} onDelete={this.deleteNote} />
            </div>
        );
    }
}

export default App;