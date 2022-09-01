import AWS from "aws-sdk";

const credentials = {
  accessKeyId: process.env.REACT_APP_AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_S3_ACCESS_KEY,
  signatureVersion: "v4",
};
AWS.config.update({ credentials, region: "us-west-2" });

const s3 = new AWS.S3();

export async function getGetPresignedUrl(filePath: string) {
  const params = {
    Bucket: process.env.REACT_APP_AWS_STORAGE_BUCKET_NAME,
    Key: filePath,
    Expires: 300,
  };

  const url = (await new Promise((resolve, reject) => {
    s3.getSignedUrl("getObject", params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  })) as string;
  return url;
}

export async function getPutPresignedUrl(path: string, type: string) {
  const params = {
    Bucket: process.env.REACT_APP_AWS_STORAGE_BUCKET_NAME,
    Key: path,
    Expires: 300,
    ContentType: type,
  };

  const url = await new Promise((resolve, reject) => {
    s3.getSignedUrl("putObject", params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
  return url;
}
