function PesquisarProduto({consulta, setConsulta}) {
  return (
    <>
      <input
        className="form-control"
        type="text"
        placeholder="Nome ou código do produto"
        value={consulta}
        onChange={(e) => setConsulta(e.target.value)}
      />
    </>
  );
}

export default PesquisarProduto;
