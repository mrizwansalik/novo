export async function httpLoadFileBlob(fileUrl): Promise<any> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", fileUrl, true);
    xhr.responseType = "blob";

    xhr.onload = function () {
      if (xhr.status === 200) {
        const blob = new Blob([xhr.response], { type: xhr.response.type });
        if (blob) {
          const rval = {
            file_url: fileUrl,
            mime_type: xhr.response.type,
            blob: blob,
          };
          resolve(rval);
        }
      } else {
        reject(xhr.statusText);
      }
    };

    xhr.send();
  });
}
