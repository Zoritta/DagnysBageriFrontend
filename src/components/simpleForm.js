// Builds a generic form based on an array of field definitions
export function SimpleForm(title, fields, onSubmit) {
  const form = document.createElement("form");
  form.innerHTML =
    `<h2>${title}</h2>` +
    fields
      .map(
        (f) => `
      <label>${f.label} <input name="${f.name}" ${
          f.type ? `type=\"${f.type}\"` : ""
        } ${f.step ? `step=\"${f.step}\"` : ""} required></label>`
      )
      .join("") +
    "<button>Save</button>";
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    onSubmit(data).then(() => form.reset());
  });
  return form;
}
