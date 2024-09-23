export interface Budget {
  category: string;
  spent: number;
  max: number;
  theme: {
    name: string;
    class: string;
  };
}
