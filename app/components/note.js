import React from 'react';

class Note extends React.Component {
    constructor() {
        super();

        // autobind this to the methods
        this.renderEdit = this.renderEdit.bind(this);
        this.renderNote = this.renderNote.bind(this);
        this.edit = this.edit.bind(this);
        this.checkEnter = this.checkEnter.bind(this);
        this.finishEdit = this.finishEdit.bind(this);
        
        // Track editing state
        this.state = {
          editing: false  
        };
    }

    renderEdit() {
        // We deal with blur and input handlers here. These map to DOM events.
        // We also set selection to input end using a callback at a ref.
        // It gets triggered after the component is mounted.
        //
        // We could also use a string reference (i.e. ref=input) and
        // then refer to the element in question later in the code. This
        // would allow us to use the underlying DOM API through
        // this.refs.input. This can be useful when combined with
        // React lifecycle books.
        return <input type="text"
            ref={
                (e) => e ? e.selectionStart = this.props.task.length : null
            }
            autofocus={true}
            defaultValue={this.props.task}
            onBlue={this.finishEdit}
            onKeyPress={this.checkEnter} />;        
    }

    renderDelete() {
        return <button onClick={this.props.onDelete}>x</button>;    
    }
    
    renderNote() {
        const onDelete = this.props.onDelete;
        
        return (
            <div onClick={this.edit}>
                <span>{this.props.task}</span>
                {onDelete ? this.renderDelete() : null}
            </div>
        );
    }

    edit() {
        this.setState({
            editing: true
        });
    }
    
    checkEnter(e) {
        if(e.key === 'Enter') {
            this.finishEdit(e);
        }        
    }
    
    finishEdit(e) {
        // Note will trigger an optional OnEdit callback once it
        // has a new value. We will use this communicate the change to
        // App.
        //
        // A smarter way to deal with default value would be to set
        // it through defaultProps.
        //
        // See the Type with React chapter for more information.
        const value = e.target.value;
        if(this.props.onEdit) {
            this.props.onEdit(value);
            
            // Exit edit mode.
            this.setState({
               editing: false 
            });
        }            
    }
    
    render() {
        // Render the component differently based on state
        if(this.state.editing) {
            return this.renderEdit();
        }
        
        return this.renderNote();
    }    
}

export default Note;


