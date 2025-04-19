import React from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/providers/store/hooks";
import { setLanguage } from "../model/i18n-slice";
import { RootState } from "../../../app/providers/store/store";

export const LanguageSwitcher: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentLanguage = useAppSelector(
    (state: RootState) => state.i18n.language,
  );

  const handleLanguageChange = (language: "ru" | "en") => {
    dispatch(setLanguage(language));
  };

  const activeBg = "purple.200";
  const inactiveBg = "gray.100";

  return (
    <ButtonGroup size="sm" attached variant="outline">
      <Button
        onClick={() => handleLanguageChange("ru")}
        bg={currentLanguage === "ru" ? activeBg : inactiveBg}
        _hover={{ bg: currentLanguage === "ru" ? activeBg : "gray.200" }}
      >
        RU
      </Button>
      <Button
        onClick={() => handleLanguageChange("en")}
        bg={currentLanguage === "en" ? activeBg : inactiveBg}
        _hover={{ bg: currentLanguage === "en" ? activeBg : "gray.200" }}
      >
        EN
      </Button>
    </ButtonGroup>
  );
};
