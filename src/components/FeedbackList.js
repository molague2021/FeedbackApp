import FeedbackItem from './FeedbackItem';
// React Hook useContext
import { useContext } from 'react';
// Bringin in Feedback Context since it is the one we want to use.
import FeedbackContext from '../context/FeedbackContext';
// import PropTypes from 'prop-types';
// Components being imported to add animation to the List of Feedback
import { motion, AnimatePresence } from 'framer-motion';

// We loop through and get each feedback list item

function FeedbackList() {
  // We are defining the FeedbackContext, and bringing it into the component
  const { feedback } = useContext(FeedbackContext);

  if (!feedback || feedback.length === 0) {
    return <p>No Feedback Yet</p>;
  }
  return (
    <div className="feedback-list">
      <AnimatePresence>
        {feedback.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <FeedbackItem key={item.id} item={item} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );

  // Code rendering the same as above but without any animation.
  // return (
  //   <div className="feedback-list">
  //     {feedback.map((item) => (
  //       <FeedbackItem key={item.id} item={item} handleDelete={handleDelete} />
  //     ))}
  //   </div>
  // );
}

// We dont need this if we are passing the feedback from the useContext hook.
// FeedbackList.propTypes = {
//   feedback: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       text: PropTypes.string.isRequired,
//       rating: PropTypes.number.isRequired,
//     })
//   ),
// };

export default FeedbackList;
