import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';


const color = '#ff6987';
const GreenCheckbox = withStyles({
    root: {
        color:color ,
        '&$checked': {
            color: color,
        },
    },
    checked: {},
})(props => <Checkbox color="default" {...props} />);

export default function CheckBox({label, checked, onChange}) {
    
    return (
        <FormGroup row>
            
            <FormControlLabel
                control={
                    <GreenCheckbox
                        checked={checked}
                        onChange={onChange}
                        value="checkedbox"
                    />
                }
                label={label}
                
            />
           
        </FormGroup>
    );
}
