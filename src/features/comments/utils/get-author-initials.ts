const MAX_INITIALS = 2;

export const getAuthorInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .slice(0, MAX_INITIALS)
    .join("");
};
