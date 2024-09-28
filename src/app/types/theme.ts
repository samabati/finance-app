export interface Theme {
  name: string;
  class: string;
  color: string;
}

export const THEMES: Theme[] = [
  { name: 'Green', class: 'bg-g', color: '#277C78' },
  { name: 'Yellow', class: 'bg-yellow', color: '#F2CDAC' },
  { name: 'Cyan', class: 'bg-cyan', color: '#82C9D7' },
  { name: 'Navy', class: 'bg-navy', color: '#626070' },
  { name: 'Red', class: 'bg-red', color: '#C94736' },
  { name: 'Purple', class: 'bg-purple', color: '#826CB0' },
  { name: 'Turquoise', class: 'bg-turq', color: '#597C7C' },
  { name: 'Brown', class: 'bg-brown', color: '#93674F' },
  { name: 'Magenta', class: 'bg-magenta', color: '#934F6F' },
  { name: 'Blue', class: 'bg-blue', color: '#3F82B2' },
  { name: 'Navy Grey', class: 'bg-navy-grey', color: '#97A0AC' },
  { name: 'Army Green', class: 'bg-army-green', color: '#7F9161' },
  { name: 'Pink', class: 'bg-pink', color: '#826CB0' },
  { name: 'Gold', class: 'bg-gold', color: '#CAB361' },
  { name: 'Orange', class: 'bg-orange', color: '#BE6C49' },
];
