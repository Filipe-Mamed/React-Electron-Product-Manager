import { useState, useEffect } from "react"; // Importa hooks do React
import { toast } from "react-toastify"; // Importa a função de notificação
import Formulario from "../components/Formulario"; // Importa o componente de formulário
import PesquisarProduto from "../components/PesquisarProduto"; // Importa componente de pesquisa
import ModalAlert from "../layouts/ModalAlert"; // Importa componente de modal de alerta
import { MdDelete } from "react-icons/md"; // Ícone de deletar
import { FaQuestionCircle } from "react-icons/fa"; // Ícone de ajuda
import DropdownMenu from "../components/DropdownMenu";

function Produtos() {
  // Estados para controlar os dados dos produtos e da interface
  const [produto, setProduto] = useState({
    codigo: "",
    nome: "",
    categoria: "",
    quantidade: "",
    preco: "",
  });

  const [produtos, setProdutos] = useState([]); // Lista de produtos
  const [consulta, setConsulta] = useState(""); // Termo de pesquisa
  const [produtoSelecionadoId, setProdutoSelecionadoId] = useState([]); // IDs dos produtos selecionados
  const [mostrarModal, setMostrarModal] = useState(false); // Controle de visibilidade do modal de exclusão

  // Função para atualizar os campos do formulário conforme o usuário digita
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto((prevProduto) => ({
      ...prevProduto,
      [name]: value,
    }));
  };

  // Função para adicionar ou atualizar um produto
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação simples dos campos obrigatórios
    if (
      !produto.codigo ||
      !produto.nome ||
      !produto.categoria ||
      !produto.quantidade ||
      !produto.preco
    ) {
      toast.error("Todos os campos são obrigatórios!");
      return;
    }

    // Busca os produtos já cadastrados para verificar se o código já existe
    const resProdutos = await window.api.listarProdutos();
    const listaAtual = resProdutos.produtos || [];

    if (produto.id) {
      // Atualiza um produto existente
      const res = await window.api.atualizarProduto(produto);
      if (res.success) {
        buscarProdutos(); // Atualiza a lista de produtos
        resetarFormulario(); // Limpa o formulário
        toast.success("Produto atualizado com sucesso!");
      } else {
        console.error(res.error);
        toast.error("Erro ao atualizar produto: " + res.error);
      }
      return;
    } else {
      // Verifica se o código do produto já está cadastrado
      const codigoJaExistente = listaAtual.some(
        (prod) => prod.codigo === Number(produto.codigo)
      );
      if (codigoJaExistente) {
        toast.error("Código já cadastrado em um produto existente!");
        return;
      }
    }

    // Cria um novo produto
    const res = await window.api.criarProduto(produto);
    if (res.success) {
      buscarProdutos();
      resetarFormulario();
      toast.success("Produto cadastrado com sucesso!");
    } else {
      toast.error("Erro ao criar produto: " + res.error);
    }
  };

  // Função para listar todos os produtos cadastrados
  const buscarProdutos = async () => {
    const res = await window.api.listarProdutos();
    if (res.success) {
      setProdutos(res.produtos || []);
    } else {
      alert("Erro ao listar produtos: " + res.error);
    }
  };

  // Função de efeito colateral para buscar produtos assim que o componente for montado
  useEffect(() => {
    buscarProdutos();
  }, []);

  // Função para excluir produtos selecionados
  const excluirProduto = async () => {
    if (produtoSelecionadoId.length === 0) {
      toast.warning("Selecione um produto para excluir!");
      return;
    }

    for (const id of produtoSelecionadoId) {
      const res = await window.api.deletarProduto(id);
      if (!res.success) {
        toast.error(`Erro ao excluir produto com ID ${id}: ${res.error}`);
      } else {
        toast.success("Produto(s) excluído(s) com sucesso!");
        buscarProdutos();
        resetarFormulario();
      }
    }
  };

  // Função para abrir o modal de confirmação de exclusão
  const abrirModal = () => {
    setMostrarModal(true);
  };

  // Função para fechar o modal e limpar os dados do produto
  const fecharModal = () => {
    resetarFormulario();
    setMostrarModal(false);
  };

  // Função para selecionar um produto para exclusão ou edição
  const selecionarParaExcluir = (id) => {
    setProdutoSelecionadoId((prevSelecionados) => {
      if (prevSelecionados.includes(id)) {
        return prevSelecionados.filter((prodId) => prodId !== id);
      } else {
        return [...prevSelecionados, id];
      }
    });
  };

  // Função para preencher o formulário com os dados de um produto selecionado
  const selecionarProduto = (produtoSelecionado) => {
    setProduto({
      id: produtoSelecionado.id,
      codigo: produtoSelecionado.codigo,
      nome: produtoSelecionado.nome,
      categoria: produtoSelecionado.categoria,
      quantidade: produtoSelecionado.quantidade,
      preco: produtoSelecionado.preco,
    });
  };

  // Função para resetar o formulário de produtos
  const resetarFormulario = () => {
    setProduto({
      id: undefined,
      codigo: "",
      nome: "",
      categoria: "",
      quantidade: "",
      preco: "",
    });
    setProdutoSelecionadoId([]);
  };

  return (
    <div className="container">
      {/* Componente de formulário de produto */}
      <Formulario
        onSubmit={handleSubmit}
        onChange={handleChange}
        values={produto}
      />

      {/* Modal de confirmação de exclusão */}
      <ModalAlert
        show={mostrarModal}
        titulo="Confirmar exclusão"
        mensagem={`Você tem certeza que deseja excluir ${produtoSelecionadoId.length} produto(s)?`}
        onConfirm={() => {
          excluirProduto(); // Exclui os produtos
          fecharModal(); // Fecha o modal
        }}
        onCancel={fecharModal} // Cancela a exclusão
      />

      {/* Seção de busca e ações */}
      <div className="row g-1 mt-5 mb-5 align-items-center">
        <div className="col d-flex align-items-center">
          <p className="text-white fs-2 fw-semibold mt-3">Buscar um produto:</p>
          <div className="mt-1 ms-2" style={{ width: "15rem" }}>
            <PesquisarProduto consulta={consulta} setConsulta={setConsulta} />
          </div>
        </div>
        <div className="col justify-content-end d-flex mb-1">
          {/* Botão de exclusão */}
          <button
            className="btn btn-danger fw-semibold d-flex align-items-center"
            onClick={abrirModal}
            disabled={produtoSelecionadoId.length === 0}
          >
            <MdDelete className="me-1 fs-4" /> Excluir{" "}
            {produtoSelecionadoId.length > 0
              ? `${produtoSelecionadoId.length} Produto(s)`
              : "Produto"}
          </button>{" "}
          <div>
            {/* Tooltip explicativo sobre a funcionalidade */}
            <FaQuestionCircle
              className="questao mt-1 ms-2 rounded-5"
              data-tooltip-id="#1"
              data-tooltip-content="Selecione um ou mais produtos para a exclusão, você pode também selecionar para editar, mas para editar é somente um por vez."
            />
          </div>
        </div>
      </div>

      {/* Lista de produtos */}
      <div className="">
        <div className="d-flex align-items-center justify-content-between mt-5 mb-2">
          <h2 className="text-white">Lista de Produtos</h2>
          <DropdownMenu produtos={produtos} />
        </div>
        <table className="table table-striped table-bordered text-white mb-3">
          <thead>
            <tr>
              <th scope="col">Código</th>
              <th scope="col">Nome</th>
              <th scope="col">Categoria</th>
              <th scope="col">Quantidade</th>
              <th scope="col">Preço</th>
            </tr>
          </thead>
          <tbody>
            {produtos.length > 0 ? (
              produtos
                .filter(
                  (prod) =>
                    prod.nome.toLowerCase().includes(consulta.toLowerCase()) ||
                    prod.codigo.toString().includes(consulta.toLowerCase())
                )
                .map((prod) => (
                  <tr
                    key={prod.id}
                    onClick={() => {
                      selecionarParaExcluir(prod.id); // Seleciona para exclusão
                      selecionarProduto(prod); // Seleciona para edição
                    }}
                    className={`produto-row ${
                      produtoSelecionadoId.includes(prod.id)
                        ? "produto-marcado"
                        : ""
                    }`}
                  >
                    <td>{prod.codigo}</td>
                    <td>{prod.nome}</td>
                    <td>{prod.categoria}</td>
                    <td>{prod.quantidade}</td>
                    <td>{`R$ ${(Number(prod.preco) || 0).toFixed(2)}`}</td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  Nenhum produto encontrado/cadastrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Produtos;
