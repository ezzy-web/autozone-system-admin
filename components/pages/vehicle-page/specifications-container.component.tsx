import { Box, Divider, FormLabel, SimpleGrid, Text } from "@chakra-ui/react";
import InputUpdate from "../../input-update/input-update.component";
import numeral from "numeral";
import * as options from "../../options";
import CustomSelect from '../../select-component/select.component';
import VehicleMakeModel from "./vehicle-make-model.component";
import { useVehicleContext } from '../../../context/vehicle.context';


interface SpecificationsProps {}

interface SpecsProps {
  label: string;
  handleUpdate: (val: string) => void;
  value: string;
  hasOptions?: boolean;
  options?: any[];
  type?: string;
}


function Specification(props: SpecsProps) {
  const { label, value, handleUpdate, hasOptions, options, type } = props;
  


  return (
    <Box>
      <FormLabel fontSize={"sm"}>{label}</FormLabel>
      {hasOptions ? (
        <CustomSelect
          value={value}
          onChange={(e: any) => {
            console.log(e);
            handleUpdate(e.value);
          }}
          placeholder={value}
          options={options ? options : []}
        />
      ) : (
        <InputUpdate value={value}  updateHandler={handleUpdate} type={type} />
      )}
    </Box>
  );
}

function SpecificationsContainer(props: SpecificationsProps) {
  const { vehicle, change } = useVehicleContext()
  
  return (
    <Box py={10}>
      <Text fontWeight={"medium"} textTransform={"uppercase"}>
        Vehicle Description
      </Text>

      <VehicleMakeModel/>
      <Divider mb={10} />
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={5}>
        <Specification
          label={"Submodel"}
          handleUpdate={(value) => change({ submodel: value })}
          value={vehicle?.submodel}
        />

        <Specification
          label={"Year"}
          handleUpdate={(value) => change({ year: value })}
          value={vehicle?.year}
          hasOptions={true}
          options={options.year_options}
        />
      </SimpleGrid>

      <Divider my={3} />

      <SimpleGrid columns={{ base: 1, md: 2 }} gap={5}>
        <Specification
          label={"Colour"}
          handleUpdate={(value) => change({ color: value })}
          value={vehicle?.color}
        />

        <Specification
          label={"Body Type"}
          handleUpdate={(value) => change({ body: value })}
          value={vehicle?.body}
          hasOptions={true}
          options={options.body_type_options}
        />
      </SimpleGrid>
      <Divider my={3} />

      <SimpleGrid columns={{ base: 1, md: 2 }} gap={5}>
        <Specification
          label={"Chassis"}
          handleUpdate={(value) => change({ chassis: value })}
          value={vehicle?.chassis}
        />

        <Specification
          label={"Engine Number"}
          handleUpdate={(value) => change({ engine_number: value })}
          value={vehicle?.engine_number}
        />
      </SimpleGrid>
      <Divider my={3} />

      <SimpleGrid columns={{ base: 1, md: 2 }} gap={5}>
        <Specification
          type="number"
          label={`Engine Size ${numeral(vehicle?.engine_size).format('0,0')} CC`}
          handleUpdate={(value) => change({ engine_size: value })}
          value={vehicle?.engine_size}
        />

        <Specification
          type="number"
          label={`Mileage ${numeral(vehicle?.mileage).format('0,0')} MI`}
          handleUpdate={(value) => change({ mileage: value })}
          value={vehicle?.mileage}
        />
      </SimpleGrid>
      <Divider my={3} />

      <SimpleGrid columns={{ base: 1, md: 2 }} gap={5}>
        <Specification
          label={"Transmission"}
          handleUpdate={(value) => change({ trans: value })}
          value={vehicle?.trans}
          hasOptions={true}
          options={options.trans_options}
        />
      </SimpleGrid>
      <Divider my={10} />

      <Text fontWeight={"medium"} textTransform={"uppercase"}>
        Vehicle Information
      </Text>
      <Divider mb={10} />

      <SimpleGrid columns={{ base: 1, md: 2 }} gap={5}>
        <Specification
          label={"Location"}
          handleUpdate={(value) => change({ location: value })}
          value={vehicle?.location}
          hasOptions={true}
          options={options.location_options}
        />

        <Specification
          label={"History"}
          handleUpdate={(value) => change({ history: value })}
          value={vehicle?.history}
          hasOptions={true}
          options={options.history_options}
        />
      </SimpleGrid>
      <Divider my={3} />

      <SimpleGrid columns={{ base: 1, md: 2 }} gap={5}>
        <Specification
          type="date"
          label={"Arrival Date"}
          handleUpdate={(value) => change({ arrival: value })}
          value={vehicle?.arrival}
        />
      </SimpleGrid>
      <Divider my={10} />

      <Text fontWeight={"medium"} textTransform={"uppercase"}>
        Pricing Information
      </Text>
      <Divider mb={10} />

      <SimpleGrid columns={{ base: 1, md: 2 }} gap={5}>
        <Specification
          type="number"
          label={`Asking Price ${numeral(
            vehicle?.price ? vehicle?.price : "0"
          ).format("$0,0.00")}`}
          handleUpdate={(value) => change({ price: value })}
          value={vehicle?.price}
        />

        <Specification
          label={"Price Condition"}
          handleUpdate={(value) => change({ price_condition: value })}
          value={vehicle?.price_condition}
          hasOptions={true}
          options={options.price_cond_options}
        />
      </SimpleGrid>
      <Divider my={3} />
    </Box>
  );
}

export default SpecificationsContainer;
