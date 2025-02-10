"use client";

const GoogleMap = ({ address }: { address: string }) => {
  const encodedAddress = encodeURIComponent(address);
  const mapSrc = `https://www.google.com/maps/embed/v1/place?q=${encodedAddress}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`;

  return (
    <iframe
      style={{ height: "100%", width: "100%", border: 0 }}
      src={mapSrc}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  );
};

export default GoogleMap;
