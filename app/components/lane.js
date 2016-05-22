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

    activateLaneEdit() {
        const laneId = this.props.lane.id;
        
        LaneActions.update({id: laneId, editing: true});
    }
    
    activateNoteEdit(id) {
        NoteActions.update({id, editing: true});
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
        
    editName(name) {
        const laneId = this.props.lane.id;
        if(!name.trim()) {
            LaneActions.update({id: laneId, editing: false});
            return;
        }
        
        LaneActions.update({id: laneId, name, editing: false});
    }

    editNote(id, task) {
    // Don't modify if trying set an empty value
        if(!task.trim()) {
            NoteActions.update({id, editing: false});
            return;
        }
        NoteActions.update({id, task, editing: false});
    }

    deleteLane() {
        const laneId = this.props.lane.id;
        
        LaneActions.delete(laneId);
    }

    deleteNote(noteId, e) {
        e.stopPropagation();

        const laneId = this.props.lane.id;
        LaneActions.detachFromLane({laneId, noteId});
        NoteActions.delete(noteId);
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
