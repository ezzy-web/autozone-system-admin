import Select from "react-select";

import React from "react";

interface SelectComponentProps {
  onChange: (event: any) => void;
  options: any[];
  [key: string]: any
}

function CustomSelect(props: SelectComponentProps) {
  const { options, onChange, ...attr } = props;
  return <Select classNamePrefix={"custom-select"} {...attr} options={options} onChange={(event) => onChange(event)} />;
}

export default CustomSelect;
