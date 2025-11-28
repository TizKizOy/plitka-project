import { CiLock, CiUnlock, CiTrash } from "react-icons/ci";
import { FiX } from "react-icons/fi";

export const actions = (
  onSetStatusClosed,
  onSetStatusActive,
  onDeleteOrder,
  onClose
) => [
  {
    icon: <CiUnlock size={22} />,
    name: "Сделать активной",
    onClick: onSetStatusActive,
  },
  {
    icon: <CiLock size={22} />,
    name: "Закрыть заявку",
    onClick: onSetStatusClosed,
  },
  {
    icon: <CiTrash size={22} />,
    name: "Удалить",
    onClick: onDeleteOrder,
  },
  {
    icon: <FiX size={22} color="grey" />,
    name: "Закрыть панель",
    onClick: onClose,
  },
];
