import { Button, useBoolean } from '@chakra-ui/react';
import React from 'react'
import { useVehicleContext } from '../../../context/vehicle.context'


interface ChangesButtonProps {
  
}

function SaveChangesButton(props: ChangesButtonProps) {
  const { update, isChanged } = useVehicleContext()


  const [ isLoading, { toggle }] = useBoolean(false)

  const handleUpdate = () => {
    toggle()
    update(() => toggle(), (error) => { toggle(); console.error(error) })
  }


  
  return (
    <Button isLoading={isLoading} disabled={!isChanged} onClick={handleUpdate} w={"full"}>Save Changes</Button>
  )
}

export default SaveChangesButton