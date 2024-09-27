import { Theme } from './theme';

export interface Budget {
  category: string;
  spent: number;
  max: number;
  theme: Theme;
}
