export function Table(columns, rows) {
  const table = document.createElement("table");
  table.innerHTML = `
      <thead><tr>${columns.map((c) => `<th>${c}</th>`).join("")}</tr></thead>
      <tbody>
        ${rows
          .map(
            (row) =>
              `<tr>${columns
                .map((c) => `<td>${row[c.toLowerCase()] ?? ""}</td>`)
                .join("")}</tr>`
          )
          .join("")}
      </tbody>`;
  return table;
}
