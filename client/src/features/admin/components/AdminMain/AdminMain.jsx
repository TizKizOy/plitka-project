import EditForm from "../../forms/EditForm/EditForm";
import style from "./AdminMain.module.css";
import FilterSection from "./FilterSection/FilterSection";
import OrdersSection from "./OrdersSection/OrdersSection";
import SelectedOrdersToolbar from "./SelectedOrdersToolbar/SelectedOrdersToolbar";
import { useOrdersFilters } from "../../hooks/useOrdersFilters";
import { useOrdersSelection } from "../../hooks/useOrdersSelection";
import { useEditFormOverlay } from "../../hooks/useEditFormOverlay";

const AdminMain = ({ orders: initialOrders, setOrders }) => {
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
  } = useOrdersSelection(setOrders);

  const {
    selectedOrder,
    isOverlayVisible,
    isEditFormVisible,
    handleRowClick,
    handleCloseEditForm,
  } = useEditFormOverlay();

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
      />
    </>
  );
};

export default AdminMain;
