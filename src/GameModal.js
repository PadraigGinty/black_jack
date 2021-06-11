import React from 'react';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #03440c',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      borderRadius: '5px',
      backgroundImage: '-webkit-radial-gradient(gold, #03440c)',
    },
  }));

function GameModal (props) {
    const classes = useStyles();
    return <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open}
        onClose={() => props.HandleModalClose(props.win, props.gameOver)}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
      <Fade in={props.open}>
        <div className={classes.paper}>
          <h2 className="" id="transition-modal-title">{props.winMessage}</h2>
        </div>
      </Fade>
    </Modal>
}

export default GameModal;