import PropTypes from "prop-types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function LanguageSelector({ selectedLanguage, onLanguageChange }) {
  return (
    <Select
      value={selectedLanguage}
      onValueChange={onLanguageChange}
      className=""
    >
      <SelectTrigger className="w-[180px] rounded-full">
        <SelectValue placeholder="Select language" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="es">Spanish</SelectItem>
          <SelectItem value="fr">French</SelectItem>
          <SelectItem value="pt">Portuguese</SelectItem>
          <SelectItem value="zh">Mandarin Chinese</SelectItem>
          <SelectItem value="ja">Japanese</SelectItem>
          <SelectItem value="tr">Turkish</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

LanguageSelector.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onLanguageChange: PropTypes.func.isRequired,
};
