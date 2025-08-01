import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { InputWrapper, StyledInput, ToggleIcon } from '../../style/view.styles';

export const PasswordInput = ({ value, onChange, name, placeholder, required }) => {
  const [showPassword, setShowPassword] = useState(false);
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <InputWrapper>
      <StyledInput
        type={showPassword ? "text" : "password"}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
      <ToggleIcon onClick={togglePasswordVisibility}>
        {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
      </ToggleIcon>
    </InputWrapper>
  );
};