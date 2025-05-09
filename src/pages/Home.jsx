import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container text-white">
      <div className="text-center mt-5">
        <h1 className="fw-bold">
          Seja bem-vindo a página de cadastramento de produtos
        </h1>
        <p className="fs-3">Gerencie seus produtos de forma fácil e rápido!</p>
      </div>
      <div className="row mt-5">
        <div className="col text-center mt-3">
          <img
            className="rounded-5 border border-5 border-success"
            src="Hortfruti.jpg"
            alt="Logo-Hortifruti"
            style={{ width: "40rem", height: "24rem" }}
          />
        </div>
        <div className="col mt-5 ms-5 pe-5">
          <div className="card bg-success text-white">
            <div className="card-body">
              <h5 className="card-title">Frutas</h5>
              <p className="card-text">
                Gerencie bananas, maçãs, laranjas e mais.
              </p>
            </div>
          </div>

          <div className="card bg-warning text-dark mt-4">
            <div className="card-body">
              <h5 className="card-title">Verduras</h5>
              <p className="card-text">Alface, couve, espinafre e similares.</p>
            </div>
          </div>
          <div className="card bg-info text-white mt-4">
            <div className="card-body">
              <h5 className="card-title">Legumes</h5>
              <p className="card-text">Batata, cenoura, beterraba etc.</p>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center mt-5">
          <Link
            className="btn bg-primary btn-lg text-white link-dark icon-link icon-link-hover mt-4 botao-produtos"
            to={"/produtos"}
          >
            Produtos
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="bi"
              viewBox="0 0 16 16"
              width="16"
              height="16"
              aria-hidden="true"
              fill="currentColor"
            >
              <path d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
