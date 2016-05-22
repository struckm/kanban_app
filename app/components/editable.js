import React from 'react';

class Editable extends React.Component {
    constructor() {
        super();

        // autobind this
        this.renderEdit = this.renderEdit.bind(this);
        this.renderDelete = this.renderDelete.bind(this);
        this.renderValue = this.renderValue.bind(this);
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
                (e) => e ? e.selectionStart = this.props.value.length : null
            }
            autofocus={true}
            defaultValue={this.props.value}
            onBlur={this.finishEdit}
            onKeyPress={this.checkEnter} />;
    }

    renderDelete() {
        return <button onClick={this.props.onDelete} className="delete">x</button>;    
    }
    
    renderValue() {
        const onDelete = this.props.onDelete;
        
        return (
            <div onClick={this.props.onValueClick}>
                <span className="value">{this.props.value}</span>
                {onDelete ? this.renderDelete() : null}
            </div>
        );
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
        }            
    }
    
    render() {
        const {value, onEdit, onValueClick, editing, ...props} = this.props;

        return (
            <div {...props}>
                {editing ? this.renderEdit() : this.renderValue()}
            </div>
        )
    }    
}

export default Editable;


