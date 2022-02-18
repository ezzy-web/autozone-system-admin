import Select from "react-select";

import React, { Component } from "react";
import { CheckboxField, InputField, TextAreaField } from "./Fields.jsx";
import { Controller } from "react-hook-form";

import "./style.scss";

function RenderField(props) {
  const content = props?.content;
  const register = props?.register;
  const control = props?.control;
  if (content.type === "select") {
    return (
      <>
        {content?.label ? <label>{content.label}</label> : <></>}
        <div className="my-2">
          <Controller
            control={control}
            name={content.name}
            render={(ref) => {
              return (
                <Select
                  classNamePrefix="form-select-index"
                  options={content.options}
                  placeholder={content.placeholder}
                  name={content.name}
                  inputRef={register(content.name)}
                  value={content.options.find(
                    (c) => c.value === ref.field.value
                  )}
                  onChange={(val) => ref.field.onChange(val.value)}
                />
              );
            }}
          />
        </div>
      </>
    );
  } else if (content.type === "long") {
    return (
      <>
        {content?.label ? <label>{content.label}</label> : <></>}

        <TextAreaField
          name={content.name}
          placeholder={content.placeholder}
          type={content.type}
          inputRef={register}
        />
      </>
    );
  } else if (content.type === "checkbox") {
    return (
      <>
        <div className="form-check form-check-sm form-check-custom form-check-solid">
          <CheckboxField
            name={content.name}
            type={content.type}
            inputRef={register}
          />
          {content?.label ? (
            <label className="m-2">{content.label}</label>
          ) : (
            <></>
          )}
        </div>
      </>
    );
  } else {
    return (
      <>
        {content?.label ? <label>{content.label}</label> : <></>}
        <InputField
          name={content.name}
          placeholder={content.placeholder}
          type={content.type}
          inputRef={register}
        />
      </>
    );
  }
}

export function RequestForm(props) {
  const name = props?.name;
  const control = props?.control;
  const register = props?.control.register;
  const content = {
    firstname: {
      name: "firstname",
      type: "text",
      placeholder: "First Name",
    },

    lastname: {
      name: "lastname",
      type: "text",
      placeholder: "Last Name",
    },

    email: {
      name: "email",
      type: "email",
      label: "Email",
      placeholder: "yourmail@email.com",
    },

    mobile: {
      name: "mobile",
      type: "tel",
      label: "Mobile (Optional)",
      placeholder: "xxx xxx-xxxx",
    },

    request: {
      name: "request",
      type: "select",
      options: [
        { value: "Quote", label: "Get a Quote" },
        { value: "Offer", label: "Make an Offer" },
        { value: "Other", label: "Other" },
      ],
      placeholder: "Select Option",
      label: "What would you like to do?",
    },

    details: {
      name: "details",
      type: "long",
      placeholder: "Comment",
      label: "Comment",
    },
  };
  return (
    <>
      <RenderField
        control={control}
        register={register}
        content={content[name]}
      />
    </>
  );
}

export function AddtoInventoryForm(props) {
  const name = props?.name;
  const control = props?.control;
  const register = props?.control.register;
  const content = {
    make: {
      name: "make",
      label: "Make",
      placeholder: "Make",
      type: "text",
    },
    model: {
      name: "model",
      label: "Model",
      placeholder: "Model",
      type: "text",
    },
    submodel: {
      name: "submodel",
      label: "Sub-model",
      placeholder: "Sub-model",
      type: "text",
    },
    year: {
      name: "year",
      type: "select",
      options: [
        { value: 2010, label: "2010" },
        { value: 2011, label: "2011" },
        { value: 2012, label: "2012" },
        { value: 2013, label: "2013" },
        { value: 2014, label: "2014" },
        { value: 2015, label: "2015" },
        { value: 2016, label: "2016" },
        { value: 2017, label: "2017" },
        { value: 2018, label: "2018" },
        { value: 2019, label: "2019" },
        { value: 2020, label: "2020" },
        { value: 2021, label: "2021" },
        { value: 2022, label: "2022" },
      ],
      placeholder: "Select Option",
      label: "Year",
    },
    type: {
      name: "type",
      type: "select",
      options: [
        { value: "Sedan", label: "Sedan" },
        { value: "Coupe", label: "Coupe" },
        { value: "Pickup", label: "Pick-up" },
        { value: "SUV", label: "SUV" },
        { value: "Truck", label: "Truck" },
        { value: "Bus", label: "Bus" },
      ],
      placeholder: "Select Option",
      label: "Body Type",
    },
    color: {
      name: "color",
      type: "text",
      placeholder: "Colour",
      label: "Colour",
    },
    location: {
      name: "location",
      type: "select",
      options: [
        { value: "Transit", label: "In Transit" },
        { value: "On Lot", label: "On Lot" },
      ],
      placeholder: "Select Option",
      label: "Location",
    },
    arrival: {
      name: "arrival",
      type: "date",
      placeholder: "mm/dd/yyyy",
      label: "Arrival Date",
    },
    engine: {
      name: "engine",
      type: "text",
      placeholder: "Engine No.",
      label: "Engine No.",
    },
    chassis: {
      name: "chassis",
      type: "text",
      placeholder: "Chassis No.",
      label: "Chassis No.",
    },
    history: {
      name: "history",
      type: "select",
      options: [
        { value: "Imported", label: "Imported" },
        { value: "Pre-owned", label: "Pre-owned" },
      ],
      placeholder: "Select Option",
      label: "Vehicle History",
    },
    mileage: {
      name: "mileage",
      type: "number",
      placeholder: "Mileage",
      label: "Mileage",
    },
    size: {
      name: "size",
      type: "number",
      placeholder: "Engine Size",
      label: "Engine Size",
    },
    trans: {
      name: "trans",
      type: "select",
      options: [
        { value: "Automatic", label: "Automatic" },
        { value: "Manaul", label: "Manual" },
        { value: "Tiptronic", label: "Tiptronic" },
      ],
      placeholder: "Select Option",
      label: "Transmission",
    },
    price: {
      name: "price",
      type: "number",
      placeholder: "Asking Price",
      label: "Asking Price",
    },
    price_status: {
      name: "price_status",
      type: "select",
      options: [
        { value: "Negotiable", label: "Negotiable" },
        { value: "Non-Negotiable", label: "Non-Negotiable" },
      ],
      placeholder: "Select Option",
      label: "Price Condition",
    },
    price_visible: {
      name: "price_visible",
      type: "checkbox",
      label: "Make Price Visible",
    },
  };
  return (
    <>
      <RenderField
        control={control}
        register={register}
        content={content[name]}
      />
    </>
  );
}


export function NewUserForm(props) {
    const name = props?.name;
    const control = props?.control;
    const register = props?.control.register;
    const content = {
        firstname: {
            name: "firstname",
            label: "First Name",
            placeholder: "First Name",
            type: "text",
          },
        lastname: {
            name: "lastname",
            label: "Last Name",
            placeholder: "Last Name",
            type: "text",
          },
        email: {
            name: "email",
            label: "Email",
            placeholder: "Email",
            type: "email",
          },
        title: {
            name: "title",
            label: "Job Title",
            placeholder: "Title",
            type: "text",
          },
        level: {
            name: "level",
            type: "select",
            options: [
                { value: "Administrator", label: "Administrator" },
                { value: "Employee", label: "Employee" },
              ],
            placeholder: "Select Option",
            label: "Access Level",
          }
    }
    return (
      <>
        <RenderField
          control={control}
          register={register}
          content={content[name]}
        />
      </>
    );
  }
