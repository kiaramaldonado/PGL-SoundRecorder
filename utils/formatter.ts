export const formatRelativeDate = (
  dateInput: Date | string | number
): string => {
  const date = new Date(dateInput);
  const now = new Date();

  if (isNaN(date.getTime())) {
    return "Fecha no válida";
  }

  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const targetDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  const isYesterday = targetDay.getTime() === yesterday.getTime();

  const day = date.getDate();
  const months = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];
  const month = months[date.getMonth()];
  const hours = date.getHours().toString();

  const minutes = date.getMinutes().toString().padStart(2, "0");

  if (diffSeconds < 60) {
    return "Creado hace unos instantes";
  }

  if (diffMinutes < 60) {
    return diffMinutes === 1
      ? "Creado hace 1 minuto"
      : `Creado hace ${diffMinutes} minutos`;
  }

  if (diffHours < 24 && targetDay.getTime() === today.getTime()) {
    return diffHours === 1
      ? "Creado hace 1 hora"
      : `Creado hace ${diffHours} horas`;
  }

  if (isYesterday) {
    return `Creado ayer a las ${hours}:${minutes}`;
  }

  // Para fechas más antiguas
  return `Creado el ${day} de ${month} a las ${hours}:${minutes}`;
};
