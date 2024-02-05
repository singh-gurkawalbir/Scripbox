import React, { useState } from 'react';
import { doc, updateDoc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { green } from '@mui/material/colors';
import { Typography } from '@mui/material';
import './styles/Idea.css';
import { db } from '../firebase/config';
import { useAuthContext } from '../hooks/useAuthContext';

export default function IdeaList({ ideas }) {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const { state: authState } = useAuthContext();

  const toggleExpand = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  // const handleUpvote = async (id, upvotes) => {
  //   const ref = doc(db, 'ideas', id);
  //   await updateDoc(ref, { upvotes: upvotes + 1 });
  // };

  const handleUpvote = async (id, upvotes) => {
    if (!authState.user) {
      console.log('User is not logged in');
      return;
    }
    const voteDocRef = doc(db, 'votes', `${authState.user.uid}_${id}`);
    const voteDoc = await getDoc(voteDocRef);

    if (voteDoc.exists()) {
      await deleteDoc(voteDocRef);

      const ref = doc(db, 'ideas', id);
      await updateDoc(ref, { upvotes: upvotes - 1 });

      console.log('User removed their upvote');
    } else {
      const ref = doc(db, 'ideas', id);
      await updateDoc(ref, { upvotes: upvotes + 1 });

      await setDoc(doc(db, 'votes', `${authState.user.uid}_${id}`), {
        userId: authState.user.uid,
        ideaId: id,
      });

      console.log('User upvoted this idea');
    }
  };

  return (
    <div className='idea-list'>
      <ul className='unordered'>
        {ideas.map((idea, index) => (
          <li key={idea.id} className='idea-item'>
            <Typography variant='h5'>{idea.title}</Typography>
            <Typography
              className='cursor-pointer'
              variant='subtitle2'
              gutterBottom
              onClick={() => toggleExpand(index)}
            >
              {expandedIndex === index
                ? idea.description
                : `${idea.description.substring(0, 350)}${
                    idea.description.length > 350 ? '...' : ''
                  }`}
            </Typography>
            <div className='idea-details'>
              <Typography variant='body2' display='block' gutterBottom>
                Tags:
              </Typography>

              <Typography
                variant='body2'
                display='block'
                className='idea-upvotes'
              >
                Upvotes: {idea.upvotes}
              </Typography>
            </div>
            <ul className='flex mb-3'>
              {idea.tags.map((tag, tagIndex) => (
                <p
                  className='border-dotted rounded-xl items-center px-2 bg-slate-400 text-gray-700 text-[0.8rem]'
                  key={tagIndex}
                >
                  {tag}
                </p>
              ))}
            </ul>
            <Typography variant='caption' display='block'>
              Created At: {idea.currentDateString}
            </Typography>
            <ThumbUpIcon
              onClick={() => handleUpvote(idea.id, idea.upvotes)}
              fontSize='medium'
              sx={{ color: green[500], '&:hover': { color: 'green' } }}
            ></ThumbUpIcon>
          </li>
        ))}
      </ul>
    </div>
  );
}
