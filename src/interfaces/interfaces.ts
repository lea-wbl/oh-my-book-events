export interface Event {
  _id?: string;
  images: { uuid: string; name: string }[];
  name: string;
  type: string;
  typeId: string;
  date: string;
  timeStart: string;
  timeEnd: string;
  location: string;
  address: string;
  ticketLink: string;
  partners: { uuid: string; name: string }[];
}

export interface Review {
  _id?: string;
  name: string;
  content: string;
}
