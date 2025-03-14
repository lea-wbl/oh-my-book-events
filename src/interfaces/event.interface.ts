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
}
