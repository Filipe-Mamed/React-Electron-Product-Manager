import { Tooltip } from "react-tooltip";

function Tooltipp({ id = "tooltip-default", place = "top", style }) {
  return (
    <Tooltip
      id={id} // ID do tooltip, necessário para referenciar pelo atributo data-tooltip-id
      place={place} // Posição do tooltip (top, bottom, left, right)
      style={style} // Estilo customizado opcional
    />
  );
}

export default Tooltipp;
