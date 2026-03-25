export function exportCSV(headers: string[], rows: string[][], filename: string) {
  const csvContent = [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    .join("\n");

  const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportPDF(title: string, headers: string[], rows: string[][]) {
  const win = window.open("", "_blank");
  if (!win) return;

  const tableRows = rows
    .map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`)
    .join("");

  win.document.write(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8"/>
  <title>${title}</title>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:Arial,sans-serif;padding:32px;color:#1e293b}
    .header{margin-bottom:24px;border-bottom:2px solid #2563EB;padding-bottom:16px}
    .header h1{font-size:20px;font-weight:800;color:#1e293b}
    .header p{font-size:12px;color:#64748b;margin-top:4px}
    table{width:100%;border-collapse:collapse;font-size:13px}
    thead tr{background:#f1f5f9}
    th{padding:10px 12px;text-align:left;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#475569}
    td{padding:10px 12px;border-bottom:1px solid #e2e8f0;color:#334155}
    tr:last-child td{border-bottom:none}
    tr:nth-child(even){background:#f8fafc}
    .footer{margin-top:24px;font-size:11px;color:#94a3b8;text-align:right}
    @media print{body{padding:16px}}
  </style>
</head>
<body>
  <div class="header">
    <h1>${title}</h1>
    <p>Gerado em ${new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })} • MoneyFlow</p>
  </div>
  <table>
    <thead><tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr></thead>
    <tbody>${tableRows}</tbody>
  </table>
  <div class="footer">MoneyFlow — Relatório gerado automaticamente</div>
  <script>setTimeout(()=>{window.print();},300);</script>
</body>
</html>`);
  win.document.close();
}
