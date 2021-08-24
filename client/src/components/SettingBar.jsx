import { observer } from 'mobx-react-lite';
import React from 'react';
import toolState from '../store/toolState';
import '../styles/toolbar.scss';

const SettingBar = observer(() => {
    return (
        <div className={'toolbar settingbar'}>
            <label htmlFor="line-width">Line width</label>
            <input 
                type="number" 
                id="line-width" 
                style={{margin: '0 15px 0 5px'}} 
                defaultValue={1} 
                min={1} max={50}
                onChange={e => toolState.setLineWidth(e.target.value)} />
            <label htmlFor="stroke-color">Stroke color</label>
            <input 
                type="color" 
                id="stroke-color" 
                style={{margin: '0 15px 0 5px'}} 
                onChange={e => toolState.setStrokeColor(e.target.value)}
                value={toolState.strokeStyle} />
        </div>
    );
});

export default SettingBar;