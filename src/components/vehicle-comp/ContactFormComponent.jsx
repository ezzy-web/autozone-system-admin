import Select from "react-select";
import { RequestForm } from "../../Forms/Forms.jsx";
import React, { Component } from "react";
import {httpClient} from "../..httpClient";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const $ = require('jquery')


class ContactFormComponent extends Component {
  constructor(props) {
    super(props);

    this.Form = this.Form.bind(this)
  }

  Form() {
    const schema = yup.object().shape({
      firstname: yup.string().required("Your first name is required"),
      lastname: yup.string().required("Your last anme is required"),
      email: yup
        .string()
        .email("Invalid email address")
        .required("Your email is required"),
      mobile: yup.string(),
      request: yup.string().required("This field is required"),
      details: yup.string(),
    });
  
    const {
      register,
      formState: { errors },
      handleSubmit,
      control,
      reset,
    } = useForm({
      reValidateMode: "onChange",
      resolver: yupResolver(schema),
    });
  
    return (
      <form
        onSubmit={handleSubmit((data) => {
          reset();
          this.onSubmit(data);
        })}
      >
        <div className="row">
          <div className="col-6 my-2">
            <RequestForm name={"firstname"} control={control} />
            <small className="error-msg"> {errors?.firstname?.message} </small>
          </div>
          <div className="col-6 my-2">
            <RequestForm name={"lastname"} control={control}  />
            <small className="error-msg"> {errors?.lastname?.message} </small>
          </div>
        </div>
        <div className="row">
          <div className="col-6 my-2">
            <RequestForm name={"email"} control={control} />
            <small className="error-msg"> {errors?.email?.message} </small>
          </div>
          <div className="col-6 my-2">
            <RequestForm name={"mobile"} control={control} />
            <small className="error-msg"> {errors?.mobile?.message} </small>
          </div>
        </div>
  
        <RequestForm name={"request"} control={control} />
        <small className="error-msg"> {errors?.request?.message} </small>
  
        <div className="my-2">
          <RequestForm name={"details"} control={control} />
          <small className="error-msg"> {errors?.details?.message} </small>
        </div>
  
        <button type="submit" className="btn contact-btn">
          Contact Us
        </button>
      </form>
    );
  }

  onSubmit(data) {
    this.load.block();
    data["vehicle"] = this.props.vehicle_id;
    httpClient()
      .post("/@client/request/add", data)
      .then((res) => {
        this.toastr.success("Request Submited");
        this.load.release();
      })

      .catch((err) => {
        this.load.release();
        this.toastr.fail("Request Failed");
      });
  }

  componentDidMount() {
    var $content = $(".contact-card");
    var Block = require("/src/assets/vendor/js/components/blockui.js");
    this.load = new Block($content.toArray()[0], {
      message: '<span class="spinner-border text-danger"></span>',
    });

    this.toastr = toastr;
    this.toastr.options = {
      closeButton: false,
      debug: true,
      newestOnTop: false,
      progressBar: true,
      positionClass: "toast-bottom-right",
      toastClass: "toast",
      preventDuplicates: false,
      showDuration: "6000",
      hideDuration: "1000",
      timeOut: "5000",
      extendedTimeOut: "1000",
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut",
    };
  }

  render() {
    return (
      <div className="contact-card">
        <h2>Contact Us</h2>
        <this.Form />
        <p>
          By clicking here, you authorize Javvys' Autozone Ltd and its
          executives to contact you by text/calls or email which may include
          marketing content.
        </p>
      </div>
    );
  }
}

export default ContactFormComponent;
