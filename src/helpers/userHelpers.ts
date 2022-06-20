export const getUserAmpluaById = (id: number) => {
  switch (id) {
    case 0:
      return "Нападающий";
    case 1:
      return "Защитник";
    case 2:
      return "Центровой";
    default:
      return "";
  }
};

export const getUserGenderById = (id: number) => {
  switch (id) {
    case 0:
      return "Мужчина";
    case 1:
      return "Женщина";
    default:
      return "";
  }
};
