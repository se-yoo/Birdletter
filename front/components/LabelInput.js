import React from 'react';
import { Input } from 'antd';

const LabelInput = ({ label, sx, append, ...props }) => (
  <div style={{ marginBottom: 5, ...sx }}>
    <label htmlFor={props.name}>{label}</label>
    <br />
    <Input {...props} />
    {append}
  </div>
);

export default LabelInput;
