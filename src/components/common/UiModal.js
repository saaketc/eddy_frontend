import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';



export default function UiModal(props) {
    const { style, heading, content, button1, button2, inputLabel, inputName, onSubmit, onChange, value } = props;

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Open form dialog
      </Button> */}
            <Fab color="primary"
                style={style}
                aria-label="add"
                onClick={handleClickOpen}>
                <AddIcon />
            </Fab> 
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
              
                <DialogTitle id="form-dialog-title">{heading}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {content}
                    </DialogContentText>
                    <form onSubmit={onSubmit}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id={inputName}
                        label={inputLabel}
                        type="text"
                        name={inputName}
                        value={value}
                        onChange={onChange}
                        fullWidth
                        />
                        {button2 && (
                            <Button type = "submit" style={style}>
                                {button2}

                            </Button>
                        )
                        }
                    </form>
                </DialogContent>
                <DialogActions>
                    {button1 && (
                        <Button onClick={handleClose} style={style}>
                            {button1}
                    
                        </Button>
                    )
                        }
                  
                   

                </DialogActions>
               
            </Dialog>
        </div>
    );
}