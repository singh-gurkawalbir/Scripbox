import { useState } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import Tag from './Tag';
import './styles/IdeaForm.css';
import { Typography } from '@mui/material';

export default function IdeaForm() {
  const [newIdea, setNewIdea] = useState({
    title: '',
    description: '',
    tags: [],
    upvotes: 0,
  });
  const [tagArray, setTagArray] = useState([]);

  const receiveTag = (arrayFromChild) => {
    setTagArray(arrayFromChild);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentDateString = new Date().toLocaleString();

    await addDoc(collection(db, 'ideas'), {
      ...newIdea,
      tags: tagArray,
      currentDateString,
    });

    setNewIdea({
      title: '',
      description: '',
      tags: [],
      upvotes: 0,
    });
    setTagArray([]);
  };

  return (
    <form className='idea-form' onSubmit={handleSubmit}>
      <label>
        <Typography variant='body2' display='block' gutterBottom>
          Title:
        </Typography>
        <input
          className='input-field'
          required
          type='text'
          onChange={(e) => setNewIdea({ ...newIdea, title: e.target.value })}
          value={newIdea.title}
        />
      </label>
      <label>
        <Typography variant='body2' display='block' gutterBottom>
          Description
        </Typography>
        <textarea
          className='textarea-field'
          onChange={(e) =>
            setNewIdea({ ...newIdea, description: e.target.value })
          }
          value={newIdea.description}
        />
      </label>
      <label>
        <Typography variant='body2' display='block' gutterBottom>
          Tags:
        </Typography>

        <Tag onArrayChange={receiveTag}></Tag>
      </label>
      <button className='submit-button'>Add</button>
    </form>
  );
}
