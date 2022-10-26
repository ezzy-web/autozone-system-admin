import { Button, Input } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import useVehicle from "../../hooks/vehicle.hook";
import Swal from "sweetalert2";
import useModels from "../../hooks/models.hook";
import Router from "next/router";
import MakeModelInput from "../make-model-input";


const { year_options, body_type_options } = require("../options");

export default function VehicleForm() {
  const { createVehicle } = useVehicle();
  const { get: getModel } = useModels();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm();

  const onSuccess = async (vehicle: any) => {
    const model = await getModel(vehicle.model).catch(error => {})
    Swal.fire(
      "Vehicle Added to Inventory",
      model ? `${vehicle.year} ${model.make_name} ${model.name} was added to the Inventory` : "",
      "success"
    )
    .then((res) => {
      if (res.isConfirmed)
        Router.replace(`/context/inventory/vehicle/${vehicle.id}`);
    });
  };

  const onError = (error: any) => {
    Swal.fire("Something went wrong", error.message, "error");
  };

  const onSubmit = async (data: any) => {
    const { data: vehicle, error } = await createVehicle(data);
    if (vehicle) onSuccess(vehicle[0]);
    if (error) onError(error);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        type={"text"}
        placeholder={"Chassis Number"}
        {...register("chassis", {
          required: "Chassis Number is required",
        })}
      />

      <Input
        type={"text"}
        placeholder={"Engine Number"}
        {...register("engine_number", {
          required: "Engine Number is required",
        })}
      />
      <MakeModelInput setValue={(val: string) => setValue('model', val)} />
      <Select
        options={year_options}
        placeholder={"Select year"}
        onChange={(event: any) => setValue("year", event ? event.value : 2016)}
      />

      <Input type={"text"} placeholder={"Submodel"} {...register("submodel")} />

      <Select
        options={body_type_options}
        placeholder={"Select body type"}
        onChange={(event: any) => setValue("body", event ? event.value : "")}
      />

      <Button disabled={isSubmitting} type="submit">
        Submit
      </Button>
    </form>
  );
}
