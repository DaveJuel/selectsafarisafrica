import { useState } from "react";
import { InputField, PasswordContainer, PasswordToggle } from "../../style/default.styles";

export const PasswordInput = ({ name, placeholder, value, onChange, required }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <PasswordContainer >
      <InputField
        type={showPassword ? "text" : "password"}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
      <PasswordToggle 
        type="button" 
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? "Hide" : "Show"}
      </PasswordToggle>
    </PasswordContainer>
  );
};
