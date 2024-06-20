// import style from './MessageReviews.module.css';
import { FaRegAddressCard } from 'react-icons/fa';
import { CiStar } from 'react-icons/ci';
import { useEffect, useRef } from 'react';

const MessageReviews = () => {
  const feedbackRef = useRef(null);
  useEffect(() => {
    if (feedbackRef.current) {
      const { height } = feedbackRef.current.getBoundingClientRect();
      window.scrollBy({ top: height, behavior: 'smooth' });
    }
  }, []);
  return (
    <div ref={feedbackRef}>
      <p>There are no reviews yet...</p>
      <div>
        <h4>Rating and review</h4>
        <p>Leave a review to help other users</p>
        <div>
          <FaRegAddressCard size={30} />
          <div>
            <CiStar color="orange" size={30} />
            <CiStar color="orange" size={30} />
            <CiStar color="orange" size={30} />
            <CiStar color="orange" size={30} />
            <CiStar color="orange" size={30} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default MessageReviews;
