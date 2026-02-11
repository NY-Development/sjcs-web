import { useEffect, useState } from "react";

const RotatingLogo = ({
  className = "",
  text = "SJ",
  intervalMs = 4000,
  startWithImage = true,
  imgSrc = "/sjcs_logo.png",
  textClassName = "",
  imgClassName = ""
}) => {
  const [showImage, setShowImage] = useState(startWithImage);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setShowImage((prev) => !prev);
    }, intervalMs);

    return () => clearInterval(intervalId);
  }, [intervalMs]);

  return (
    <span
      className={`relative inline-flex items-center justify-center ${className}`}
      role="img"
      aria-label="SJCS logo"
    >
      <span
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
          showImage ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      >
        <img
          alt=""
          className={`h-full w-full object-contain ${imgClassName}`}
          src={imgSrc}
        />
      </span>
      <span
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
          showImage ? "opacity-0" : "opacity-100"
        } ${textClassName}`}
        aria-hidden="true"
      >
        {text}
      </span>
    </span>
  );
};

export default RotatingLogo;
