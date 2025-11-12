import { useState } from "react";

export const useHighlightRows = () => {
  const [highlightedRows, setHighlightedRows] = useState([]);

  const highlightRows = (rows) => {
    setHighlightedRows(rows);
    setTimeout(() => {
      setHighlightedRows([]);
    }, 1000);
  };

  return { highlightedRows, highlightRows };
};
