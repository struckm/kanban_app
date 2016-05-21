import React from 'react';
import Lane from './lane';

export default ({lanes}) => {
    return (
        <div className="lanes">{lanes.map(lane =>
            <Lane className="lane" key={lane.id} lane={lane} />
        )}</div>
    );
}