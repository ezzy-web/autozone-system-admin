import React from "react";

export function InputField(props) {
  const className = props?.className;
  const type = props?.type;
  const placeholder = props?.placeholder;
  const ref = props?.inputRef;
  const name = props?.name;

  return (
    <input
      type={type}
      className={className ? className : "form-control form-control-solid" }
      placeholder={placeholder}
      {...ref(name)}
    />
  );
}

export function TextAreaField(props) {
  const className = props?.className;
  const type = props?.type;
  const placeholder = props?.placeholder;
  const ref = props?.inputRef;
  const name = props?.name;

  return (
    <textarea
      type={type}
      className={className ? className : "form-control form-control-solid"}
      placeholder={placeholder}
      rows={10}
      cols={10}
      {...ref(name)}
    />
  );
}

export function CheckboxField(props) {
  const className = props?.className;
  const type = props?.type;
  const ref = props?.inputRef;
  const name = props?.name;

  return (
    <input 
     className={className ? className : "form-check-input"}
     type={type}
     {...ref(name)}
    />
  );
}
