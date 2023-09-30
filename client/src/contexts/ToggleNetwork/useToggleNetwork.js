import { useContext } from "react";
import { ToggleNetworkContext } from "./ToggleNetworkContext";

const useToggleNetwork = () => useContext(ToggleNetworkContext);

export default useToggleNetwork;
