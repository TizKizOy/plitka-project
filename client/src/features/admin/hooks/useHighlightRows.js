import { useState } from "react";

export const useHighlightRows = () => {
  const [highlightedRows, setHighlightedRows] = useState([]);
  const [highlightType, setHighlightType] = useState("edit");

  const highlightRows = (rowIds, type = "edit") => {
    setHighlightedRows(rowIds);
    setHighlightType(type);
    setTimeout(() => {
      setHighlightedRows([]);
    }, 1000);
  };

  return { highlightedRows, highlightRows, highlightType };
};
