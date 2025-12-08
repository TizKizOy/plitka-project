import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { actions } from "../../../data/actionsData";
import Icon from "../../../../../shared/components/Icon";
import style from "./FloatingActionButton.module.css";

const FloatingActionButton = ({
  onSetStatusClosed,
  onSetStatusActive,
  onDeleteOrder,
  onClose,
  isVisible,
}) => {
  const actionsList = actions(
    onSetStatusClosed,
    onSetStatusActive,
    onDeleteOrder,
    onClose
  );

  return (
    <SpeedDial
      ariaLabel="Действия с заявками"
      sx={{
        position: "fixed",
        bottom: 24,
        right: 24,
        display: isVisible ? "flex" : "none",
        "& .MuiFab-primary": {
          backgroundColor: "#88A2B3",
          "&:hover": {
            backgroundColor: "#748997ff",
          },
          "@media (max-width: 640px)": {
            width: 50,
            height: 50,
          },
        },
        "& .MuiSpeedDialIcon-icon": {
          width: 25,
          height: 25,
        },
        "& .MuiSpeedDialAction-fab": {
          width: 48,
          height: 48,
          boxShadow: "0px 0px 10px 1px rgba(36, 56, 71, 0.15);",
        },
        "& .MuiSpeedDial-actions": {
          gap: "2px",
        },
      }}
      icon={<SpeedDialIcon />}
    >
      {actionsList.map((action) => (
        <SpeedDialAction
          key={action.id}
          icon={<Icon name={action.icon} className={style[action.sizeClass]} />}
          tooltipTitle={action.name}
          onClick={action.onClick}
        />
      ))}
    </SpeedDial>
  );
};

export default FloatingActionButton;
