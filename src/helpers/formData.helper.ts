export const generateFormData = (values: { [key: string]: string | Blob }, data?: string[]) => {
  const form = new FormData();
  if (!data) data = Object.keys(values);

  Object.entries(values).forEach((value) => {
    if (data.some((key) => key == value[0])) form.append(value[0], value[1]);
  });

  return form;
};
