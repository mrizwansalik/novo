import XLSX from "xlsx";

const delimiter = ",";
const unixNewline = "\n";

export function readXlsFile(file) {
  return new Promise((resolve) => {
    const rABS = true;
    const reader = new FileReader();
    reader.onload = function (e) {
      const data = e.target.result;

      const workbook = XLSX.read(data, {
        type: rABS ? "binary" : "array",
      });
      resolve(workbook);
    };

    if (rABS) {
      reader.readAsBinaryString(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  });
}

export function exportCsvFile(rows, fileName) {
  fileName += ".csv";

  const csvData = getCsvBlob(rows);

  //In FF link must be added to DOM to be clicked
  // following code is for download novo census template
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(csvData);
  link.setAttribute("download", fileName);
  const node = document.body.appendChild(link);
  link.click();
  if (node) {
    document.body.removeChild(node);
  }

  return true;
}

export function getCsvBlob(rows) {
  // turn rows into string
  let data = "";
  for (let i = 0; i < rows.length; ++i) {
    if (i > 0) {
      data += unixNewline;
    }
    for (let n = 0; n < rows[i].length; ++n) {
      if (n > 0) {
        data += delimiter;
      }
      let cellData = rows[i][n];
      if (!cellData) {
        cellData = "";
      }
      data += cellData;
    }
  }

  // source: https://github.com/mholt/PapaParse/issues/175
  const csvData = new Blob([data], { type: "text/csv;charset=utf-8;" });
  return csvData;
}
