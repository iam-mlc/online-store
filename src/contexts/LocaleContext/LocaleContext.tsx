import { createContext } from "react";
import { LocaleContextValues } from "./LocaleProvider";


const LocaleContext = createContext<LocaleContextValues>({} as LocaleContextValues);

export default LocaleContext