import { createContext, useState } from 'react';
// Package that allows us to create uuid
import { v4 as uuidv4 } from 'uuid';

// create context variable
const FeedbackContext = createContext();

// creating a provider that will be used instead of props, for all components that wish to use this.
export const FeedbackProvider = ({ children }) => {
  // creating a useState hook
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      text: 'This item is FeedbackItem 1',
      rating: 10,
    },
    {
      id: 2,
      text: 'This item is FeedbackItem 2',
      rating: 8,
    },
    {
      id: 3,
      text: 'This item is FeedbackItem 3',
      rating: 9,
    },
  ]);

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  // Delete Feedback
  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  // Add Feedback
  const addFeedback = (newFeedback) => {
    // Creating new id for the newly created feedback
    newFeedback.id = uuidv4();
    // Keep everything in the state but we are just adding to it
    setFeedback([newFeedback, ...feedback]);
  };

  // Set item to edit
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };

  // update feedbackitem
  const updateFeedback = (id, upItem) => {
    setFeedback(
      feedback.map((item) =>
        item.id === id
          ? {
              ...item,
              ...upItem,
            }
          : item
      )
    );
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
