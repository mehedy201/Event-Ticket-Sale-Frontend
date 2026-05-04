import { useEffect, useMemo, useState } from "react";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";

countries.registerLocale(enLocale);

export const useCountryList = () => {
  return useMemo(() => {
    const countryObj = countries.getNames("en", { select: "official" });
    const sortedCountries = Object.values(countryObj).sort();
    return sortedCountries;
  }, []);
};