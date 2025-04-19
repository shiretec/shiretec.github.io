import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Input,
  useDisclosure,
  Text,
  Spinner,
} from "@chakra-ui/react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/providers/store/hooks";
import { env } from "../../../app/config/env";
import {
  selectIsConfigured,
  selectIsSaving,
  selectIsLoading,
  selectError,
  setConfigured,
} from "../model/google-sheets-slice";
import {
  saveToGoogle,
  loadFromGoogle,
  setSpreadsheetId,
} from "../../../app/middleware/google-sheets-middleware";
import { useI18n } from "../../i18n/model/use-i18n-redux";

export const GoogleSheetsIntegration: React.FC = () => {
  const { t } = useI18n();
  const dispatch = useAppDispatch();
  const { open: isOpen, onOpen, onClose } = useDisclosure();

  // API key is now from environment config
  const [spreadsheetId, setSpreadsheetIdLocal] = useState("");

  // Get state from Redux
  const isConfigured = useAppSelector(selectIsConfigured);
  const isSaving = useAppSelector(selectIsSaving);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);

  // Load spreadsheet ID from localStorage on component mount
  useEffect(() => {
    const savedSpreadsheetId = localStorage.getItem(
      "real_estate_spreadsheet_id",
    );
    if (savedSpreadsheetId) {
      setSpreadsheetIdLocal(savedSpreadsheetId);
      // Check if API key is configured in environment
      if (env.isGoogleSheetsConfigured()) {
        dispatch(setConfigured(true));
      }
    }
  }, [dispatch]);

  // Handle configuration save
  const handleSaveConfig = () => {
    if (spreadsheetId) {
      // Only need to set spreadsheet ID now
      dispatch(setSpreadsheetId(spreadsheetId));
      dispatch(setConfigured(true));
      onClose();

      // Load properties from Google Sheets after configuration
      dispatch(loadFromGoogle());
    }
  };

  // Handle save to Google Sheets
  const handleSaveToGoogle = () => {
    // Check if API key is configured in environment
    if (!env.isGoogleSheetsConfigured()) {
      dispatch({
        type: "googleSheets/setError",
        payload:
          "Google Sheets API key not configured. Please contact the administrator.",
      });
      return;
    }

    if (isConfigured) {
      dispatch(saveToGoogle());
    } else {
      onOpen();
    }
  };

  return (
    <>
      <Box>
        <Box
          title={
            isConfigured
              ? t("saveToGoogleTooltip")
              : t("configureGoogleSheetsFirst")
          }
        >
          <Button
            colorScheme="green"
            onClick={handleSaveToGoogle}
            disabled={isSaving}
            aria-label={t("savingToGoogle")}
            ml={2}
          >
            {isSaving && <Spinner size="sm" mr={2} />}
            {t("saveToGoogle")}
          </Button>
        </Box>

        {isLoading && (
          <Text fontSize="sm" color="gray.500" mt={1}>
            {t("loadingFromGoogle")}...
          </Text>
        )}

        {error && (
          <Box
            role="alert"
            mt={2}
            p={2}
            bg="red.100"
            color="red.800"
            borderRadius="md"
          >
            {error}
          </Box>
        )}
      </Box>

      {/* Configuration Modal */}
      {isOpen && (
        <Box
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="rgba(0,0,0,0.5)"
          zIndex="1000"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            bg="white"
            borderRadius="md"
            maxW="500px"
            w="90%"
            p={4}
            position="relative"
          >
            <Box borderBottomWidth="1px" pb={2} mb={4}>
              <Text fontSize="xl" fontWeight="bold">
                {t("configureGoogleSheets")}
              </Text>
              <Button
                position="absolute"
                top={2}
                right={2}
                size="sm"
                onClick={onClose}
                aria-label="Close"
              >
                ✕
              </Button>
            </Box>
            <Box mb={4}>
              <Text mb={4}>{t("googleSheetsConfigInstructions")}</Text>

              <Box>
                <Text fontWeight="bold" mb={1}>
                  {t("spreadsheetId")}
                </Text>
                <Input
                  value={spreadsheetId}
                  onChange={(e) => setSpreadsheetIdLocal(e.target.value)}
                  placeholder={t("enterSpreadsheetId")}
                />
                <Text fontSize="xs" color="gray.500" mt={1}>
                  {t("spreadsheetIdHelp")}
                </Text>
              </Box>
            </Box>

            <Box
              display="flex"
              justifyContent="flex-end"
              mt={4}
              pt={2}
              borderTopWidth="1px"
            >
              <Button variant="ghost" mr={3} onClick={onClose}>
                {t("cancel")}
              </Button>
              <Button
                colorScheme="blue"
                onClick={handleSaveConfig}
                disabled={!spreadsheetId}
              >
                {t("saveConfig")}
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};
