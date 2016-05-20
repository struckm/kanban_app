import uuid from 'node-uuid';
import React from 'react';
import Notes from './notes.js';

class App extends React.Component {
    constructor() {
        super();
        
        // autobind 
        this.addNote = this.addNote.bind(this);
        
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
    
    render() {
        const notes = this.state.notes;
        return (
            <div>
                <button onClick={this.addNote}>+</button>
                <Notes notes={notes} />
            </div>
        );
    }
}

export default App;