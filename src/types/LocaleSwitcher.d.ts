export interface LocaleSwitcherProps {
  onLocaleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  currentLocale: string;
}
