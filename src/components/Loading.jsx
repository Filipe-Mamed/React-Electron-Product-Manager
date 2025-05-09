import { Spinner } from "react-bootstrap";

function Loading() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 gap-2">
      <div>
        <h1 className="text-white">Carregando...</h1>
      </div>
      <div>
        <Spinner
          className="fs-2"
          style={{ width: "5rem", height: "5rem" }}
          animation="border"
          variant="primary"
        />
      </div>
    </div>
  );
}

export default Loading;
