import React, { useState } from 'react';

function Dropdown({ label,options, onSelect }) {
    // console.log("L4", options);
    const [inputValue, setInputValue] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);
    const [showOptions, setShowOptions] = useState(false);

    const handleChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
        setShowOptions(true);
    };

    const handleOptionClick = (option) => {
        setInputValue(option.name);
        setSelectedOption(option);
        // setShowOptions(false);
        onSelect(option); // Pass selected option to parent component
        setInputValue("")
    };

    const filteredOptions = options.filter(option =>
        option.name?.toLowerCase().includes(inputValue?.toLowerCase())
    );

    return (
        <div class="form-floating">
            <input
                type="text"
                className="form-control"
                value={inputValue}
                onChange={handleChange}
                onFocus={() => setShowOptions(true)}
                onBlur={() => setTimeout(() => setShowOptions(false), 200)} // Delay hiding options to allow click on option
                placeholder="Type to search..."
            />
            <label for="dropdown">{label}</label>
            {showOptions && (
                <ul className="list-group">
                    {filteredOptions.map((option, index) => (
                        <li className="list-group-item" key={option.id} onClick={() => handleOptionClick(option)}
                            style={{
                                cursor: "pointer",
                            }}
                        >
                            {option.name}
                        </li>
                    ))}
                </ul>
            )}
            {/* <p>Selected option: {selectedOption ? selectedOption.id : ''}</p> */}
        </div>
    );
}

export default Dropdown;
