import style from "./AdminPanel.module.css";
import AdminNav from "../../components/AdminNav/AdminNav";
import AdminMain from "../../components/AdminMain/AdminMain";
import { useOrders } from "../../hooks/useOrders";

export const AdminPanel = () => {
  const { orders, setOrders, isLoading, error } = useOrders();

  if (isLoading) {
    return <div className={style.loading}>Загрузка данных...</div>;
  }

  if (error) {
    return (
      <div className={style.error}>Ошибка при загрузке данных: {error}</div>
    );
  }

  return (
    <>
      <AdminNav />
      <div className={style.content}>
        <AdminMain orders={orders} setOrders={setOrders} />
      </div>
    </>
  );
};

export default AdminPanel;
