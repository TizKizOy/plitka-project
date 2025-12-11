import style from "./EditForm.module.css";
import services from "../../../../shared/data/servicesForm";
import { useEditForm } from "../../hooks/useEditForm";
import LoaderOverlay from "../../../../shared/components/LoaderOverlay/LoaderOverlay"; // 👈 глобальный оверлей

const EditForm = ({
  order,
  onClose,
  setOrders,
  isVisible,
  initialServiceName,
  fetchOrders,
  highlightRows,
}) => {
  const {
    formData,
    handleChange,
    handleSubmit,
    changedFields,
    isLoading,
    apiError,
  } = useEditForm({
    order,
    initialServiceName,
    onClose,
    setOrders,
    fetchOrders,
    highlightRows,
  });

  return (
    <>
      <LoaderOverlay isLoading={isLoading} />

      <div
        className={`${style.editForm} ${
          isVisible ? style.editForm_visible : ""
        }`}
      >
        <div className={style.editForm__header}>
          <h3>Редактирование</h3>
        </div>

        {apiError && <p className={style.error}>{apiError}</p>}

        <div className={style.editForm__row}>
          <div className={style.editForm__rowItem}>
            <label>Заказчик</label>
            <input
              minLength={2}
              maxLength={100}
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={changedFields.firstName ? style.changedField : ""}
            />
          </div>
          <div className={style.editForm__rowItem}>
            <label>Номер телефона</label>
            <input
              minLength={9}
              maxLength={28}
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={changedFields.phone ? style.changedField : ""}
            />
          </div>
        </div>

        <div className={style.editForm__row}>
          <div className={style.editForm__rowItem}>
            <label>Услуга</label>
            <select
              className={`${style.editForm__rowItemSelect} ${
                changedFields.serviceName ? style.changedField : ""
              }`}
              name="serviceName"
              value={formData.serviceName || ""}
              onChange={handleChange}
            >
              {services.map((e) => (
                <option key={e.value} value={e.label}>
                  {e.label}
                </option>
              ))}
            </select>
          </div>
          <div className={style.editForm__rowItem}>
            <label>Локация, км</label>
            <input
              minLength={2}
              maxLength={240}
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={changedFields.location ? style.changedField : ""}
            />
          </div>
        </div>

        <div className={style.editForm__comment}>
          <label className={style.editForm__commentLabel}>
            Комментарий админа
          </label>
          <textarea
            name="comment"
            value={formData.comment || ""}
            onChange={handleChange}
            className={changedFields.comment ? style.changedField : ""}
          />
        </div>

        <div className={style.editForm__status}>
          <label className={style.editForm__statusLabel}>Статус</label>
          <div className={style.editForm__statusOptions}>
            <label className={style.editForm__statusOptionsLabel}>
              <input
                type="radio"
                name="statusName"
                value="Активно"
                checked={formData.statusName === "Активно"}
                onChange={handleChange}
              />
              Активно
            </label>
            <label>
              <input
                type="radio"
                name="statusName"
                value="Закрыто"
                checked={formData.statusName === "Закрыто"}
                onChange={handleChange}
              />
              Закрыто
            </label>
          </div>
        </div>

        <div className={style.editForm__buttons}>
          <button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Сохраняем..." : "Сохранить"}
          </button>
          <button onClick={onClose}>Отмена</button>
        </div>
      </div>
    </>
  );
};

export default EditForm;
