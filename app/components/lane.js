import AltContainer from 'alt-container';
import React from 'react';
import Notes from './notes';
import NoteActions from '../actions/noteActions';
import NoteStore from '../stores/noteStore';
import LaneActions from '../actions/laneActions';
import Editable from './editable';

export default class Lane extends React.Component {
    constructor() {
        super();
        this.addNote = this.addNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
        this.deleteLane = this.deleteLane.bind(this);
        this.editName = this.editName.bind(this);
        this.activateLaneEdit = this.activateLaneEdit.bind(this);
        this.activateNoteEdit = this.activateNoteEdit.bind(this);
    }
    
    editNote(id, task) {
    // Don't modify if trying set an empty value
        if(!task.trim()) {
            return;
        }
        NoteActions.update({id, task});
    }

    addNote(e) {
        // If note is added, avoid opening lane name edit by stopping
        // event bubbling in this case.
        e.stopPropagation();
        
        const laneId = this.props.lane.id;
        const note = NoteActions.create({task: 'New Task'});
        
        LaneActions.attachToLane({
           noteId: note.id,
           laneId 
        });
    };

    deleteNote(noteId, e) {
        e.stopPropagation();

        const laneId = this.props.lane.id;
        LaneActions.detachFromLane({laneId, noteId});
        NoteActions.delete(noteId);
    }

    editName(name) {
        const laneId = this.props.lane.id;
        
        console.log(`edit lane ${laneId} name using ${name}`);    
    }
    
    deleteLane() {
        const laneId = this.props.lane.id;
        
        console.log(`delete lane ${laneId}`);        
    }
    
    activateLaneEdit() {
        const laneId = this.props.lane.id;
        
        console.log(`activate lane ${laneId} edit`);        
    }
    
    activateNoteEdit(id) {
        console.log(`activate note ${id} edit`);
    }
    
    render() {
        const {lane, ...props} = this.props;
        return (
            <div {...props}>
                <div className="lane-header" onClick={this.activateLaneEdit}>
                    <div className="lane-add-note">
                        <button onClick={this.addNote}>+</button>
                    </div>
                    <Editable className="lane-name" editing={lane.editing} value={lane.name} onEdit={this.editName} />
                    <div className="lane-delete">
                        <button onClick={this.deleteLane}>x</button>
                    </div>
                </div>
                <AltContainer
                    stores={[NoteStore]}
                    inject={{
                        notes: () => NoteStore.getNotesByIds(lane.notes)
                    }}>
                    <Notes 
                        onValueClick={this.activateNoteEdit}
                        onEdit={this.editNote} 
                        onDelete={this.deleteNote} />
                </AltContainer>
            </div>
        );
    }
}
