import React from "react";
import { Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import "./input.css";

export default function CustomInput(props) {
  const { editable, value, name, type, onBlur, onChange, prepend } = props;
  return editable ? (
    <InputGroup>
      {prepend && (
        <InputGroupAddon addonType="prepend">
          <InputGroupText>{prepend}</InputGroupText>
        </InputGroupAddon>
      )}
      <Input
        value={value}
        name={name}
        type={type || "text"}
        onBlur={onBlur}
        onChange={onChange}
        autoFocus
      />
    </InputGroup>
  ) : (
    value
  );
}
