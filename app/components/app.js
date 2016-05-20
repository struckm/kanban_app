import uuid from 'node-uuid';
import React from 'react';
import Notes from './notes.js';

class App extends React.Component {
    constructor() {
        super();
        
        // autobind 
        this.addNote = this.addNote.bind(this);
        this.editNote = this.editNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
        
        this.state = {
            notes: [
                {
                    id: uuid.v4(),
                    task: 'Learn Webpack'
                },
                {
                    id: uuid.v4(),
                    task: 'Learn React'
                },
                {
                    id: uuid.v4(),
                    task: 'Do Laundry'
                }
            ]
        };
    }
    
    addNote() {
        this.setState({
           notes: this.state.notes.concat([{
              id: uuid.v4(),
              task: 'New Task'
           }])
        });
    }

    editNote(id, task) {
        // Don't modify if trying to set an empty value
        if(!task.trim()) {
            return;
        }
        
        const notes = this.state.notes.map(note => {
            if(note.id === id && task) {
                note.task = task;
            }
            
            return note;
        });
        
        this.setState({notes});
    }
    
    deleteNote(id, e) {
        // Avoid bubbling to edit
        e.stopPropagation();
        
        this.setState({
           notes: this.state.notes.filter(note => note.id != id) 
        });
    }
    
    render() {
        const notes = this.state.notes;
        return (
            <div>
                <button onClick={this.addNote}>+</button>
                <Notes notes={notes} onEdit={this.editNote} onDelete={this.deleteNote} />
            </div>
        );
    }
}

export default App;