import React from 'react';
import { Button, ButtonGroup } from '@chakra-ui/react';

interface LanguageSwitcherProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  currentLanguage,
  onLanguageChange,
}) => {
  const activeBg = 'purple.200';
  const inactiveBg = 'gray.100';
  
  return (
    <ButtonGroup size="sm" attached variant="outline">
      <Button
        onClick={() => onLanguageChange('ru')}
        bg={currentLanguage === 'ru' ? activeBg : inactiveBg}
        _hover={{ bg: currentLanguage === 'ru' ? activeBg : 'gray.200' }}
      >
        RU
      </Button>
      <Button
        onClick={() => onLanguageChange('en')}
        bg={currentLanguage === 'en' ? activeBg : inactiveBg}
        _hover={{ bg: currentLanguage === 'en' ? activeBg : 'gray.200' }}
      >
        EN
      </Button>
    </ButtonGroup>
  );
};
