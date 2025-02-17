import axios from "axios";

export const deleteUcareImg = async (uuid: string) => {
  return await axios.delete(`https://api.uploadcare.com/files/${uuid}/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Uploadcare.Simple ${process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY}:${process.env.NEXT_PUBLIC_UPLOADCARE_SECRET_KEY}`,
    },
  });
};
