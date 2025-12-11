import style from "./SelectedOrdersToolbar.module.css";
import { actions } from "../../../data/actionsData";
import Icon from "../../../../../shared/components/Icon";

const SelectedOrdersToolbar = ({
  selectedOrdersCount,
  onSetStatusClosed,
  onSetStatusActive,
  onDeleteOrder,
  onClose,
  isVisible,
}) => {
  const toolbarActions = actions(
    onSetStatusClosed,
    onSetStatusActive,
    onDeleteOrder,
    onClose
  );

  const closeAction = toolbarActions.find(
    (action) => action.name === "Закрыть панель"
  );

  const mainActions = toolbarActions.filter(
    (action) => action.name !== "Закрыть панель"
  );

  return (
    <div
      className={`${style.toolbar} ${isVisible ? style.toolbar_visible : ""}`}
    >
      <div className={style.selectedCount}>
        <button className={style.closeIcon} onClick={closeAction.onClick}>
          <Icon
            name={closeAction.icon}
            className={style[closeAction.sizeClass]}
          />
        </button>
        <span>
          {selectedOrdersCount} заявк{selectedOrdersCount === 1 ? "а" : "и"}
        </span>
      </div>
      <div className={style.buttons}>
        {mainActions.map((action, index) => (
          <button key={index} className={style.button} onClick={action.onClick}>
            <Icon name={action.icon} className={style[action.sizeClass]} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectedOrdersToolbar;
