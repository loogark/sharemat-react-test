import { useSearchParams } from "react-router-dom";
import "./Dropdown.css";

type DropdownOption = {
  label: string;
  value: string;
};

interface Props {
  options: DropdownOption[];
  queryKey: string;
}

export const Dropdown = ({ options, queryKey }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get(queryKey) || "";

  const handleOptionClick = (option: DropdownOption) => {
    setSearchParams((prev) => {
      prev.set(queryKey, option.value);
      return prev;
    });
  };

  return (
    <div className='dropdown-wrapper'>
      <select
        onChange={(e) =>
          handleOptionClick({ label: e.target.value, value: e.target.value })
        }
        value={initialQuery}
      >
        <option value='' disabled>
          {initialQuery === "" ? `Filter by ${queryKey}` : "Select an option"}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
