export function downloadFile(url: string, fileName: string) {
  const link = document.createElement("a");
  link.download = fileName;
  link.href = url;
  link.click();
}
