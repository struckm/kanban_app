import AltContainer from 'alt-container';
import React from 'react';
import Lanes from './lanes';
import LaneActions from '../actions/laneActions';
import LaneStore from '../stores/laneStore';

class App extends React.Component {
    constructor() {
        super();
        
        // autobind
        this.addLane = this.addLane.bind(this);
    }
    
    addLane() {
        LaneActions.create({name: 'New Lane'});
    }

    render() {
        return (
            <div>
                <button className="add-lane" onClick={this.addLane}>+</button>
                <AltContainer
                    stores={[LaneStore]}
                    inject={{
                        lanes: () => LaneStore.getState().lanes || []
                    }}>
                    <Lanes />
                </AltContainer>
            </div>
        );
    }
}

export default App;