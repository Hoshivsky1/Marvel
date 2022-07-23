import img from "./error.gif";

const ErrorMessage = () => {
  return (
    <img
      style={{
        display: "block",
        width: "250px",
        height: "250px",
        objectFit: "contain",
        margin: "0 auto",
      }}
      alt="Error"
      src={img}
    />
  );
};

export default ErrorMessage;
