import style from "./ApplicationForm.module.css";
import Input from "./Input/Input";
import services from "../../../../shared/data/servicesForm.json";
import Icon from "../../../../shared/components/Icon";

const ApplicationForm = ({
  onClick,
  handleSubmit,
  handleInputChange,
  data,
  errors,
  isLoading = false,
}) => {
  return (
    <>
      <div className={style.overlay} onClick={() => onClick(false)} />
      <div className={style.formContainer}>
        <div style={{ position: "relative" }}>
          <button
            className={style.closeButton}
            onClick={() => onClick(false)}
            disabled={isLoading}
          >
            <Icon className={style.icon} name="close" />
          </button>
          <div className={style.formCard}>
            <h2>Оставить заявку</h2>
            <p>Обработаем Вашу заявку в самое ближайшее время</p>
            <form className={style.form} onSubmit={handleSubmit}>
              <Input
                name="firstName"
                placeholder="Имя"
                value={data.firstName}
                onChange={(e) => handleInputChange(e, "firstName")}
                error={errors.firstName}
              />
              <Input
                name="fkIdService"
                placeholder="Выберите услугу"
                type="select"
                options={services}
                value={data.fkIdService}
                onChange={(e) => handleInputChange(e, "fkIdService")}
                error={errors.fkIdService}
              />
              <Input
                name="location"
                placeholder="Месторасположение"
                value={data.location}
                onChange={(e) => handleInputChange(e, "location")}
                error={errors.location}
              />
              <Input
                name="phone"
                placeholder="Номер телефона"
                value={data.phone}
                onChange={(e) => handleInputChange(e, "phone")}
                error={errors.phone}
              />
              <button
                className={style.submitButton}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Отправка..." : "Отправить"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplicationForm;
