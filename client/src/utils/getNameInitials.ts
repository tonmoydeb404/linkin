const getNameInitials = (
  firstName: string | null | undefined,
  lastName: string | null | undefined
) => {
  if (!firstName || !lastName) return "U";

  let initial = "";
  if (firstName) initial += firstName.slice(0, 1);
  if (lastName) initial += lastName.slice(0, 1);

  return initial;
};

export default getNameInitials;
