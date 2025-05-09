function Formulario({ onSubmit, onClick, onChange, values }) {
  return (
    <div className="container mt-5">
      <div className="mb-5">
        <h1 className="text-white fw-bold">Cadastrar/Editar produto</h1>
        <p className="text-white mt-4">
          Preencha os campos abaixo para cadastrar um novo produto ou editar um
          existente.
          <br />
          Os campos com * são obrigatórios.
          <br />
          O código deve ser único e não pode ser alterado após o cadastro.
          <br />
          O preço deve ser informado em reais (R$).
          <br />
          A categoria deve ser selecionada entre as opções disponíveis.
          <br />
          A quantidade deve ser informada em unidades inteiras.
          <br />
        </p>
      </div>
      <form className="row g-1 mt-5" onSubmit={onSubmit} onClick={onClick}>
        {/* Código do produto */}

        <div className="mb-3 form-floating col-md-2">
          <input
            type="number"
            className="form-control"
            id="codigo"
            name="codigo"
            placeholder="Código"
            onChange={onChange}
            value={values.codigo}
          />
          <label htmlFor="codigo" className="form-label">
            Código
          </label>
        </div>

        {/* Nome do produto */}

        <div className="mb-3 form-floating col-md-4">
          <input
            type="text"
            className="form-control"
            id="nome"
            name="nome"
            placeholder="Nome"
            onChange={onChange}
            value={values.nome}
          />
          <label htmlFor="nome" className="form-label">
            Nome
          </label>
        </div>

        {/* Categoria do produto */}

        <div className="mb-3 form-floating col-6">
          <select
            className="form-select"
            name="categoria"
            id="categoria"
            onChange={onChange}
            value={values.categoria}
          >
            <option value="">Selecione uma categoria</option>
            <option value="Frutas">Frutas</option>
            <option value="Legumes">Legumes</option>
            <option value="Verduras">Verduras</option>
            <option value="Outros">Outros</option>
          </select>
          <label htmlFor="categoria" className="form-label">
            Categoria
          </label>
        </div>

        {/* Quantidade do produto */}

        <div className="mb-3 form-floating col-md-4">
          <input
            type="number"
            className="form-control"
            id="quantidade"
            name="quantidade"
            placeholder="Quantidade"
            onChange={onChange}
            value={values.quantidade}
          />
          <label htmlFor="quantidade" className="form-label">
            Quantidade
          </label>
        </div>

        {/* Preço do produto */}

        <div className="mb-3 form-floating col-md-4">
          <input
            type="number"
            step="0.01"
            className="form-control"
            id="preco"
            name="preco"
            placeholder="Preço"
            onChange={onChange}
            value={values.preco}
          />
          <label htmlFor="preco" className="form-label">
            Preço
          </label>
        </div>

        {/* Botões de ação */}

        <div className="col d-flex align-items-center mb-3">
          <button
            type="submit"
            className="btn btn-primary ms-2 me-4 fw-semibold"
          >
            Cadastrar
          </button>
          <button
            data-tooltip-id="#1"
            data-tooltip-content="Use para limpar os campos!"
            type="reset"
            className="btn btn-danger fw-semibold"
            onClick={() => {
              onChange({ target: { name: "id", value: undefined } });
              onChange({ target: { name: "codigo", value: "" } });
              onChange({ target: { name: "nome", value: "" } });
              onChange({ target: { name: "categoria", value: "" } });
              onChange({ target: { name: "quantidade", value: "" } });
              onChange({ target: { name: "preco", value: "" } });
            }}
          >
            Limpar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Formulario;
