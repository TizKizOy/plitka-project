import EditForm from "../../forms/EditForm/EditForm";
import style from "./AdminMain.module.css";
import FilterSection from "./FilterSection/FilterSection";
import OrdersSection from "./OrdersSection/OrdersSection";
import SelectedOrdersToolbar from "./SelectedOrdersToolbar/SelectedOrdersToolbar";
import FloatingActionButton from "./FloatingActionButton/FloatingActionButton";
import { useOrdersFilters } from "../../hooks/useOrdersFilters";
import { useOrdersSelection } from "../../hooks/useOrdersSelection";
import { useEditFormOverlay } from "../../hooks/useEditFormOverlay";
import { useHighlightRows } from "../../hooks/useHighlightRows";
import LoaderOverlay from "../../../../shared/components/LoaderOverlay/LoaderOverlay";

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
    isLoading: filtersLoading,
    apiError: filtersError,
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
    isLoading: selectionLoading,
    apiError: selectionError,
  } = useOrdersSelection(setOrders, highlightRows);

  const globalLoading = filtersLoading || selectionLoading;

  return (
    <>
      <LoaderOverlay isLoading={globalLoading} />

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
        <FloatingActionButton
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
