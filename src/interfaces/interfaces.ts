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
  partners: { _id: string; uuid: string; name: string }[];
}

export interface Review {
  _id?: string;
  name: string;
  content: string;
}

export interface Question {
  _id?: string;
  question: string;
  answer: string;
}

export interface EventType {
  _id?: string;
  name: string;
  summary: string;
  leading: string;
  description: string;
}

export interface ContactInfo {
  _id?: string;
  email: string;
  tel: string;
  ig: string;
  tiktok: string;
}
