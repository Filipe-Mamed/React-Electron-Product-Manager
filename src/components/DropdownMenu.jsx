import { BsThreeDotsVertical } from "react-icons/bs";
import ExportaCsv from "./ExportaCsv";
import Dropdown from "react-bootstrap/Dropdown";

function DropdownMenu({ produtos }) {
  return (
    <Dropdown align="end">
      <Dropdown.Toggle
        variant="light"
        className="bg-transparent border-0 rounded-5 text-white"
        id="dropdown-custom"
      >
        <BsThreeDotsVertical className="fs-5 rounded-4 custom-dropdown-icon text-white" />
      </Dropdown.Toggle>

      <Dropdown.Menu className="dropdown-menu">
        <Dropdown.Item>
          <ExportaCsv produtos={produtos} />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownMenu;
