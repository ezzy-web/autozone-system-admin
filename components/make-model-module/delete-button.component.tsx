import { IconButton } from "@chakra-ui/react";
import { Delete } from "@icon-park/react";
import React from "react";
import Swal from "sweetalert2";

interface DeleteButtonProps {
  aria_label: string;
  remove: () => void;
  [key: string]: any;
}

export default function DeleteButton(props: DeleteButtonProps) {
  const { remove, aria_label, ...properties } = props;

  const alert = Swal.mixin({
    confirmButtonText: "Yes, delete it",
    cancelButtonText: "No, cancel",
    buttonsStyling: true,
  });

  const removeHandler = () => {
    alert
      .fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        reverseButtons: true,
      })
      .then((res) => {
        if (!res.isConfirmed) return;
        remove();
        Swal.fire("Deleted!", "", "success");
      });
  };

  return (
    <IconButton
    {...properties}
      onClick={removeHandler}
      icon={<Delete />}
      aria-label={aria_label}
    />
  );
}
