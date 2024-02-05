import React, { useState, useEffect, useRef } from 'react';
import './styles/Tag.css';
const SearchAndSelect = ({ onArrayChange }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [availableItems, setAvailableItems] = useState([
    'tech',
    'sprint',
    'feature',
    'demo',
    'prototype',
  ]);
  const [isListVisible, setListVisibility] = useState(false);
  const containerRef = useRef(null);
  const lastChipRef = useRef(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setListVisibility(event.target.value.trim() !== '');
  };

  const handleItemClick = (item) => {
    setSelectedItems([...selectedItems, item]);
    setAvailableItems(availableItems.filter((i) => i !== item));
    setInputValue('');
  };

  const handleItemRemove = (item) => {
    setSelectedItems(selectedItems.filter((i) => i !== item));
    setAvailableItems([...availableItems, item]);
  };

  const handleInputBlur = () => {
    if (inputValue.trim() !== '') {
      setSelectedItems([...selectedItems, inputValue.trim()]);
      setInputValue('');
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setListVisibility(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [containerRef]);

  useEffect(() => {
    onArrayChange(selectedItems);
  }, [selectedItems, onArrayChange]);

  return (
    <div className='container-tag' ref={containerRef}>
      <div className='search-tag'>
        {selectedItems.map((item, index) => (
          <span
            key={item}
            className='formatted-tag'
            ref={index === selectedItems.length - 1 ? lastChipRef : null}
          >
            {item}
            <svg
              onClick={() => handleItemRemove(item)}
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              fill='currentColor'
              className='bi bi-x cross-button-tag'
              viewBox='0 0 16 16'
            >
              <path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z' />
            </svg>
          </span>
        ))}
        <input
          type='text'
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onFocus={() => setListVisibility(true)}
          className='search-input-tag'
        />
      </div>
      {isListVisible && (
        <ul className='item-list-tag'>
          {availableItems
            .filter((item) =>
              item.toLowerCase().startsWith(inputValue.toLowerCase())
            )
            .map((item) => (
              <li key={item} onClick={() => handleItemClick(item)}>
                <div className='text-[0.9rem]'>{item}</div>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default SearchAndSelect;
