export interface Item {
  key: number;
  item: string;
  description: string;
  unit: string;
  quantity: number;
  price: number;
  margin: number;
  category: string;
}

export interface Section {
  id: number;
  name: string;
  items: Item[];
}

export interface Estimate {
  id: number | string;
  version: string;
  project: string;
  client: string;
  createdDate: string;
  lastModifiedDate: string;
  status: string;
  details: Item[];
}
