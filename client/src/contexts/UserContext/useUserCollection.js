import { useContext } from "react";
import UserContext from "./UserContext";

const useUserCollection = () => useContext(UserContext);

export default useUserCollection;
