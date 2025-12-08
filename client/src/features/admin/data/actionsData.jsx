export const actions = (
  onSetStatusClosed,
  onSetStatusActive,
  onDeleteOrder,
  onClose
) => [
  {
    icon: "unlock",
    sizeClass: "iconLarge",
    name: "Сделать активной",
    onClick: onSetStatusActive,
  },
  {
    icon: "lock",
    sizeClass: "iconLarge",
    name: "Закрыть заявку",
    onClick: onSetStatusClosed,
  },
  {
    icon: "trash",
    sizeClass: "iconLarge",
    name: "Удалить",
    onClick: onDeleteOrder,
  },
  {
    icon: "close",
    sizeClass: "iconSmall",
    name: "Закрыть панель",
    onClick: onClose,
  },
];
