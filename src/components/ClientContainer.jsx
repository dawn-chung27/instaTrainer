import React, { Fragment, useState, useEffect } from 'react';
import ExercisesCard from './ExercisesCard.jsx';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring/web.cjs';
import ModalForm from './ModalForm';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

function ClientContainer(props) {
  //tentative have loop to show cards - will wait on backend endpoint connection later
  const [authorizedView, setAuthorizedView] = useState(true);
  const [existingExercises, setExistingExercises] = useState();
  const [exercisesDropdown, setExercisesDropdown] = useState();
  const [appendNewExcercise, setappendNewExercise] = useState();
  const [clienInfo, setClientInfo] = useState({
    client_name: 'Dennis',
    age: '25',
    gender: 'male',
    height: '5.5',
    weight: '140',
  });
  const changeView = () => {
    setAuthorizedView(true);
  };
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    //this will pull all info from exercise table so we can filter on modal
    fetch('/api/trainers/exercises')
      .then((res) => res.json())
      .then((response) => setExistingExercises(response))
      .catch((err) => console.log(err));
  };
  const getClientInfo = () => {
    fetch('/api/clients/dashboard')
      .then((res) => res.json())
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };

  const getAsssignedWorkouts = () => {
    fetch('/api/clients/dashboard')
      .then((res) => res.json())
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };
  getAsssignedWorkouts();
  const handleClose = () => {
    setOpen(false);
  };
  const exerciseCards = [];
  for (let i = 0; i < 5; i += 1) {
    exerciseCards.push(
      <ExercisesCard
        authorizedView={authorizedView}
        existingExercises={existingExercises}
        exercisesDropdown={exercisesDropdown}
        setExercisesDropdown={setExercisesDropdown}
        appendNewExcercise={appendNewExcercise}
        append={append}
      />
    );
  }
  const newCard = [];
  const append = () => {
    newCard.unshift(
      <ExercisesCard
        authorizedView={authorizedView}
        existingExercises={existingExercises}
        exercisesDropdown={exercisesDropdown}
        setExercisesDropdown={setExercisesDropdown}
        appendNewExcercise={appendNewExcercise}
        append={append}
      />
    );
    console.log('newcard in append');
    setappendNewExercise(newCard);
  };

  return (
    <div className='client-home-page-container'>
      <div className='user-profile-container'>
        <h2>Edit {`${clienInfo.client_name}`}'s Workout Plan</h2>
        <div className='image-container'>
          <img
            className='image-class'
            src='https://ca.slack-edge.com/T01C0PF26GK-U01DSA9KMFV-5446a9a02b96-512'
            alt='profile-pic'
          />
        </div>
        <div>
          <h3 className='client-detail'>Matt Jiang</h3>
        </div>
        <div className='client-details-container'>
          <p className='client-detail'>age: {` ${clienInfo.age}`}</p>
          <p className='client-detail'>gender:{` ${clienInfo.gender}`}</p>
          <p className='client-detail'>height:{` ${clienInfo.height}`}</p>
          <p className='client-detail'>weight:{` ${clienInfo.weight}`}</p>
        </div>
      </div>
      <div className='edit-card-container'>
        <button className='edit-button' onClick={handleOpen}>
          Add WorkOut
        </button>
        <Modal
          aria-labelledby='spring-modal-title'
          aria-describedby='spring-modal-description'
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            {existingExercises ? (
              <div className={classes.paper}>
                <h2 id='spring-modal-title'>Add WorkOut</h2>
                <ModalForm
                  key='modal-submit'
                  existingExercises={existingExercises}
                  exercisesDropdown={exercisesDropdown}
                  setExercisesDropdown={setExercisesDropdown}
                  appendNewExcercise={appendNewExcercise}
                  append={append}
                />
              </div>
            ) : null}
          </Fade>
        </Modal>
      </div>
      <div id='cards-feed-id' className='cards-feed-container'>
        {appendNewExcercise ? appendNewExcercise : null}
        {exerciseCards}
      </div>
    </div>
  );
}

export default ClientContainer;
