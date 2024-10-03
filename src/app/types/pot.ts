import { Theme } from './theme';

export interface Pot {
  id: number;
  name: string;
  saved: number;
  target: number;
  theme: Theme;
}
