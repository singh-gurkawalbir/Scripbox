import IdeaList from '../components/IdeaList';
import IdeaForm from '../components/IdeaForm';
import { useCollection } from '../hooks/useCollection';
import { useState, useEffect } from 'react';

export default function Home() {
  const { docs: ideas } = useCollection('ideas');
  const [diffIdea, setDiffIdea] = useState(null);
  const [sortedByVotes, setSortedByVotes] = useState([]);
  const [sortedByCurrentDate, setSortedByCurrentDate] = useState([]);
  const [isSortedByVotes, setIsSortedByVotes] = useState(false);
  const [isSortedByCurrentDate, setIsSortedByCurrentDate] = useState(false);

  useEffect(() => {
    setDiffIdea(ideas);
  }, [ideas]);

  useEffect(() => {
    setSortedByVotes(
      isSortedByVotes ? [...ideas].sort((a, b) => b.upvotes - a.upvotes) : ideas
    );
  }, [ideas, isSortedByVotes]);

  useEffect(() => {
    setSortedByCurrentDate(
      isSortedByCurrentDate
        ? [...ideas].sort(
            (a, b) =>
              new Date(b.currentDateString) - new Date(a.currentDateString)
          )
        : ideas
    );
  }, [ideas, isSortedByCurrentDate]);

  return (
    <div className='App'>
      <IdeaForm />
      <div className='text-center relative '>
        <button
          className='submit-button mx-10'
          onClick={() => setIsSortedByVotes(!isSortedByVotes)}
        >
          {`${isSortedByVotes ? 'Un' : ''}Sort by Votes`}
        </button>
        <button
          className='submit-button mx-5'
          onClick={() => setIsSortedByCurrentDate(!isSortedByCurrentDate)}
        >
          {`${isSortedByCurrentDate ? 'Un' : ''}Sort by Current Date`}
        </button>
      </div>
      {diffIdea === null ? (
        'Loading'
      ) : (
        <IdeaList
          ideas={isSortedByCurrentDate ? sortedByCurrentDate : sortedByVotes}
        ></IdeaList>
      )}
    </div>
  );
}
