import { useState } from "react";

export const useEditFormOverlay = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);

  const handleRowClick = (order) => {
    setSelectedOrder(order);
    setTimeout(() => setIsEditFormVisible(true), 0.1);
    setIsOverlayVisible(true);
  };

  const handleCloseEditForm = () => {
    setIsEditFormVisible(false);
    setIsOverlayVisible(false);
  };

  return {
    selectedOrder,
    isOverlayVisible,
    isEditFormVisible,
    handleRowClick,
    handleCloseEditForm,
  };
};
