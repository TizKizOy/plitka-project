import { useState } from "react";
import EditForm from "../../forms/EditForm/EditForm";
import style from "./AdminMain.module.css";
import FilterSection from "./FilterSection/FilterSection";
import OrdersSection from "./OrdersSection/OrdersSection";
import SelectedOrdersToolbar from "./SelectedOrdersToolbar/SelectedOrdersToolbar";
import { useOrdersFilters } from "../../hooks/useOrdersFilters";
import { useOrdersSelection } from "../../hooks/useOrdersSelection";
import { useEditFormOverlay } from "../../hooks/useEditFormOverlay";
import { useHighlightRows } from "../../hooks/useHighlightRows";

const AdminMain = ({ orders: initialOrders, setOrders }) => {
  const {
    selectedOrder,
    isOverlayVisible,
    isEditFormVisible,
    handleRowClick,
    handleCloseEditForm,
  } = useEditFormOverlay();

  const { highlightedRows, highlightRows, highlightType } = useHighlightRows();

  const {
    filters,
    fetchOrders,
    handleStatusChange,
    handleDateRangeChange,
    handleSearchChange,
  } = useOrdersFilters(setOrders);

  const {
    selectedOrders,
    isSelectedOrderVisible,
    handleCheckboxChange,
    onSetStatusClosed,
    onSetStatusActive,
    onDeleteOrder,
    handleCloseToolbar,
    deletingRowIds,
  } = useOrdersSelection(setOrders, highlightRows);

  return (
    <>
      <div className={style.content}>
        <FilterSection
          filters={filters}
          onStatusChange={handleStatusChange}
          onDateRangeChange={handleDateRangeChange}
          onSearchChange={handleSearchChange}
        />
        <SelectedOrdersToolbar
          selectedOrdersCount={selectedOrders.length}
          onSetStatusClosed={onSetStatusClosed}
          onSetStatusActive={onSetStatusActive}
          onDeleteOrder={onDeleteOrder}
          onClose={handleCloseToolbar}
          isVisible={isSelectedOrderVisible}
        />
        <OrdersSection
          orders={initialOrders}
          onRowClick={handleRowClick}
          selectedOrders={selectedOrders}
          onCheckboxChange={handleCheckboxChange}
          isVisibleToolBar={isSelectedOrderVisible}
          highlightedRows={highlightedRows}
          deletingRowIds={deletingRowIds}
          highlightType={highlightType}
        />
      </div>
      <div
        className={`${style.overlay} ${
          isOverlayVisible ? style.overlay_visible : ""
        }`}
        onClick={handleCloseEditForm}
      />
      <EditForm
        key={selectedOrder?.pkIdOrder}
        order={selectedOrder}
        setOrders={setOrders}
        onClose={handleCloseEditForm}
        isVisible={isEditFormVisible}
        fetchOrders={fetchOrders}
        highlightRows={highlightRows}
      />
    </>
  );
};

export default AdminMain;
