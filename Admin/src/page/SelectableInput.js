import React, { useState } from 'react';

function SelectableInput({
  type = 'text',
  title = 'title',
  subTitle = '',
  value = [],
  onChange,
  className = 'form-line',
  min,
  max,
  disabled = false,
  toolTip = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
  placeholder = 'placeholder',
}) {
  const [inputText, setInputText] = useState('');

  console.log('EDFUUFDIJDGfdfdfdfdf', value);

  const removeValue = i => {
    let updated = [...value];
    updated.splice(i, 1);
    onChange(updated);
  };
  return (
    <div className={className}>
      <label id="label_15" htmlFor="first_35" display="flex">
        {title}
        <span
          style={{
            fontSize: '80%',
            fontWeight: 'normal',
          }}
        >
          ({subTitle})
        </span>
        <span style={{ color: 'red' }}> {title === 'Education ' ? '' : '*'} </span>
        <> :</>
      </label>
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          width: 'auto',
          border: '1px solid #ced4da',
          borderRadius: '0.25rem',
          padding: '6px',
          height: '38px',
        }}
      >
        {value.map((item, i) => {
          return (
            <div key={i}>
              {item}
              <i
                // className="fa fa-close"
                style={{ cursor: 'pointer', fontWeight: 'bold', color: '#696868', marginLeft: '3px' }}
                onClick={() => {
                  removeValue(i);
                }}
              >
                X
              </i>
            </div>
          );
        })}

        <input
          value={inputText}
          type={type}
          min={min}
          max={max}
          style={{
            width: '50%',
            background: 'transparent',
            border: 'none',
            color: 'black',
            height: '20px',
          }}
          placeholder={placeholder}
          className="SlectableInput"
          //   size={10}
          onChange={val => {setInputText(val.target.value)}}
          disabled={disabled}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              if (inputText.trim() != '') {
                onChange([...value, inputText]);
                setInputText('');
              }
            }
          }}
        />
      </div>
    </div>
  );
}

export default SelectableInput;
