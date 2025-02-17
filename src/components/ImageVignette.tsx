import React from "react";
import Image from "next/image";
import { Delete02Icon } from "hugeicons-react";

const ImageVignette = () => {
  return (
    // <div
    //   key={index}
    //   className="flex items-center justify-between gap-2 bg-gray-100 p-2 mb-2 h-14"
    // >
    //   <Image
    //     src={`https://ucarecdn.com/${image.uuid}/`}
    //     alt="File icon"
    //     width={200}
    //     height={200}
    //     className="h-full w-auto"
    //   />
    //   <div className="truncate">{image.name}</div>
    //   <div
    //     className="flex items-center"
    //     onClick={() => deleteImage(image.uuid, "new")}
    //   >
    //     <Delete02Icon className="h-6 w-6 text-gray-500 cursor-pointer ml-2" />
    //   </div>
    // </div>
  );
};

export default ImageVignette;
