import { createContext, useState, useEffect } from 'react';
// Package that allows us to create uuid
// import { v4 as uuidv4 } from 'uuid';

// create context variable
const FeedbackContext = createContext();

//

// creating a provider that will be used instead of props, for all components that wish to use this.
export const FeedbackProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  // creating a useState hook
  const [feedback, setFeedback] = useState([]);

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  useEffect(() => {
    fetchFeedback();
  }, []);

  // Fetch feedback
  const fetchFeedback = async () => {
    const response = await fetch('/feedback?_sort=id&_order=desc');
    const data = await response.json();

    setFeedback(data);
    setLoading(false);
  };

  // Delete Feedback
  const deleteFeedback = async (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      await fetch(`/feedback/${id}`, { method: 'DELETE' });
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  // Add Feedback
  const addFeedback = async (newFeedback) => {
    const response = await fetch('/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFeedback),
    });

    const data = await response.json();
    // Creating new id for the newly created feedback
    //newFeedback.id = uuidv4();
    // Keep everything in the state but we are just adding to it
    setFeedback([data, ...feedback]);
  };

  // Set item to edit
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };

  // update feedbackitem
  const updateFeedback = async (id, upItem) => {
    const response = await fetch(`/feedback/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(upItem),
    });

    const data = await response.json();

    setFeedback(
      feedback.map((item) =>
        item.id === id
          ? {
              ...item,
              ...data,
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
        isLoading,
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
