import Papa from "papaparse";
import { toast } from "react-toastify";
import { BsFiletypeCsv } from "react-icons/bs";

function ExportaCsv({ produtos }) {
  const exportaParaCsv = () => {
    if (produtos.length === 0) {
      toast.warning("Não há produtos para exportar!");
      return;
    }

    const csv = Papa.unparse(produtos);
    const link = document.createElement("a");
    link.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
    link.target = "_blank";
    link.download = "produtos.csv";
    link.click();
  };

  return (
    <button className="bg-transparent border-0 dropdown-item"
    style={{cursor: "pointer"}}
      onClick={exportaParaCsv}
    >
      Exportar para <BsFiletypeCsv className="fs-2" />
    </button>
  );
}

export default ExportaCsv;
