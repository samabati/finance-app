import { Theme } from './theme';

export interface Budget {
  id: number;
  category: string;
  spent: number;
  max: number;
  theme: Theme;
}
