import React from 'react';
import PropTypes, { func } from 'prop-types';

function RatingSelect({minRating, maxRating, selectedRating, onSelected}) {

    function clickHandler(e){
        const value = +e.currentTarget.querySelector('input').value;
        onSelected(value);
    } // function clickHandler(e)

    return (
            <div>
                <ul  className='rating'>
                    {Array.from({length: (maxRating - minRating + 1)}, (_, i) =>
                    (<label key={i} onClick={clickHandler}>
                        <li>
                            <input type='radio' 
                                id={`num${i + 1}`}
                                name='rating'
                                value={`${i + 1}`}
                                checked={i + 1 === selectedRating} 
                                onChange={e=> console.log(e)}/>
                            <label htmlFor='rating'>{i + 1}</label>
                        </li>
                    </label>))}
                </ul>
            </div>
    );
} // function RatingSelect({minRating, maxRating, defaultRating, onSelected, resetSelection})

RatingSelect.propTypes = {
    minRating: PropTypes.number,
    maxRating: PropTypes.number,
    defaultRating: PropTypes.number,
    onSelected: func.isRequired
};

RatingSelect.defaultProps = {
    minRating: 1,
    maxRating: 10,
    defaultRating: 10
};

export default RatingSelect;