import Default from "./Default";
import { NavStyle } from "shared/constants/AppEnums";
import HorHeaderFixed from "./HorHeaderFixed";

const Layouts = {
  [NavStyle.DEFAULT]: Default,
  [NavStyle.HOR_HEADER_FIXED]: HorHeaderFixed,
};
export default Layouts;
