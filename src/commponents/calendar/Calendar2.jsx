import React, { useState } from 'react';
import DatePicker from 'react-multi-date-picker';

const Calendar2 = () => {
  const [values, setValues] = useState([]);
  return (
    <div>
      <DatePicker value={values} onChange={setValues} range />
    </div>
  );
};

export default Calendar2;
