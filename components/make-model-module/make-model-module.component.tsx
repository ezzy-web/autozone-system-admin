import SearchBox from "../search-box/search-box.component";
import Listing from "../listing/listing.component";
import Make from "./make.component";
import { Box } from "@chakra-ui/react";
import Create from "./create.component";
import { MakeContext } from "../../context/make.context";
import { useContext } from "react";
import ModelContextProvider, {
  ModelContext,
} from "../../context/model.context";

export default function MakeModelModule() {
 
  const makeCtx = useContext(MakeContext);
  if (!makeCtx) return <></>;

  console.log("Module")

  const { onSearchStringChange, filteredMakes, createMake } = makeCtx;

  return (
    <Box p={10}>
      <SearchBox
        onChangeHandler={onSearchStringChange}
        placeholder={"Search Make"}
      />

      <Listing
        dataset={filteredMakes()}
        RenderComponent={(props: any) => (
          <ModelContextProvider>
            <Make {...props} />
          </ModelContextProvider>
        )}
      />

      <Create
        createHandler={createMake}
        label={"Add Make"}
        aria_label={"Add Make"}
      />
    </Box>
  );
}
