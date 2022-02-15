import React from "react";
import { Button, MenuItem } from "@material-ui/core";
import { TextField } from "@mui/material";


function button(props) {
  const color = props.color ? props.color : "default";
  const variant = props.variant ? props.variant : "contained";
  const link = props.link ? props.link : null;
  const disabled = props.disabled ? props.disabled : false;
  const event = props.onClick ? props.onClick : false;
  const content = props.content ? props.content : "Button";
  const size = props.size ? props.size : "medium";
  const type = props.type ? props.type : "button";

  return (
    <>
      {event ? (
        <>
          {link ? (
            <Button
              size={size}
              onClick={event}
              href={link}
              color={color}
              variant={variant}
              disabled={disabled}
              type={type}
            >
              {content}
            </Button>
          ) : (
            <Button
              size={size}
              onClick={event}
              color={color}
              variant={variant}
              disabled={disabled}
              type={type}
            >
              {content}
            </Button>
          )}
        </>
      ) : (
        <>
          {link ? (
            <Button
              size={size}
              href={link}
              color={color}
              variant={variant}
              disabled={disabled}
              type={type}
            >
              {content}
            </Button>
          ) : (
            <Button
              size={size}
              color={color}
              variant={variant}
              disabled={disabled}
              type={type}
            >
              {content}
            </Button>
          )}
        </>
      )}
    </>
  );
}

function input(props) {
  const label = props.label ? props.label : "";
  const inputId = props.id ? props.id : "";
  const color = props.color ? props.color : "secondary";
  const disabled = props.disabled ? props.disabled : false;
  const variant = props.variant ? props.variant : "filled";
  const size = props.size ? props.size : "small";
  const type = props.type ? props.type : "text";
  const error = props.error ? props.error : false;
  const name = props.name ? props.name : "";
  const multiline = props.multi ? props.multi : false;
  const placeholder = props.placeholder ? props.placeholder : "";
  const defaultHelper = props.helper ? props.helper : "";
  const helperText = props.message ? props.message : defaultHelper;
  const required = props.required ? props.requires : false;
  const setValue = (e) => {
    props.value = e.target.value;
  };

  const onChange = props.onChange ? props.onChange : setValue;

  return (
    <>
      <TextField
        label={label}
        variant={variant}
        value={props.value ? props.value : ""}
        onChange={onChange}
        size={size}
        multiline={multiline}
        type={type}
        placeholder={placeholder}
        name={name}
        error={error}
        color={color}
        disabled={disabled}
        id={inputId}
        helperText={helperText}
        required={required}
      />
    </>
  );
}

function select(props) {
  const label = props.label ? props.label : "";
  const inputId = props.id ? props.id : "";
  const color = props.color ? props.color : "secondary";
  const disabled = props.disabled ? props.disabled : false;
  const variant = props.variant ? props.variant : "filled";
  const size = props.size ? props.size : "small";
  const error = props.error ? props.error : false;
  const name = props.name ? props.name : "";
  const placeholder = props.placeholder ? props.placeholder : "";
  const defaultHelper = props.helper ? props.helper : "";
  const defaultValue = props.defaultValue ? props.defaultValue : "";
  const helperText = props.message ? props.message : defaultHelper;
  const required = props.required ? props.requires : false;
  const options = props.options ? props.options : [];
  const setValue = (e) => {
    props.value = e.target.value;
  };

  const onChange = props.onChange ? props.onChange : setValue;

  return (
    <>
      <TextField
        select
        className="default-select"
        label={label}
        variant={variant}
        defaultValue={defaultValue}
        value={props.value ? props.value : ""}
        onChange={onChange}
        size={size}
        placeholder={placeholder}
        name={name}
        error={error}
        color={color}
        disabled={disabled}
        id={inputId}
        helperText={helperText}
        required={required}
      >
        {options.map((option, index) => {
          return (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          );
        })}
      </TextField>
    </>
  );
}

export function FormComponents() {
  return {
    button,
    input,
    select,
  };
}
