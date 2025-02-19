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
  tagline: string;
  description: string;
  programCards: {
    image: { uuid: string; name: string };
    title: string;
    content: string;
  }[];
}

export interface ProgramCard {
  image: { uuid: string; name: string };
  title: string;
  content: string;
}
