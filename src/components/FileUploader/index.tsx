import React, { useEffect } from "react";
import AwsS3 from "@uppy/aws-s3";
import Uppy from "@uppy/core";
import Dropbox from "@uppy/dropbox";
import GoogleDrive from "@uppy/google-drive";
import OneDrive from "@uppy/onedrive";
import { DashboardModal, useUppy } from "@uppy/react";
import { get } from "lodash";
import { IUploadedFile } from "src/interfaces/file";
import { getPutPresignedUrl } from "src/utils/awsHelper";
import { getS3FilePath } from "src/utils/fileUploadHelper";

import { allowedFileTypes, MAX_FILE_UPLOAD_SIZE } from "./constants";

export interface IFileUploaderProps {
  filePath?: string;
  isOpen?: boolean;
  filePolicy?: any;
  autoProceed?: boolean;
  customAllowFileTypes?: string[];
  allowMultipleUploads?: boolean;
  onRequestClose?: () => void;
  onUploadSuccess?: (fileInfo?: IUploadedFile, fileData?, formatId?) => void;
  onMultipleUploadSuccess?: (
    fileInfo?: IUploadedFile[],
    fileData?,
    formatId?
  ) => void;
}

const FileUploader = React.memo((props: IFileUploaderProps) => {
  const {
    filePath,
    isOpen = false,
    autoProceed,
    customAllowFileTypes = [],
    allowMultipleUploads = false,
    onRequestClose,
    onUploadSuccess,
    onMultipleUploadSuccess,
  } = props;

  const childUppyOption = {
    companionUrl: "",
  };

  const uppy = useUppy(() => {
    return Uppy({
      restrictions: {
        allowedFileTypes: customAllowFileTypes.length
          ? customAllowFileTypes
          : allowedFileTypes,
        maxFileSize: MAX_FILE_UPLOAD_SIZE,
        maxNumberOfFiles: allowMultipleUploads ? null : 1,
      },
      autoProceed: autoProceed,
      debug: true,
      allowMultipleUploads,
      onBeforeFileAdded: (currentFile) => onBeforeFileAdded(currentFile),
    })
      .use(Dropbox, childUppyOption)
      .use(GoogleDrive, childUppyOption)
      .use(OneDrive, childUppyOption)
      .use(AwsS3, {
        getUploadParameters(file) {
          const fullFilePath = `${filePath}/${file.name}`;
          const fileType = file.type;
          return getPutPresignedUrl(fullFilePath, fileType).then((url) => {
            return {
              method: "put",
              url: url,
              fields: {},
              headers: {
                "Content-Type": fileType,
              },
            };
          });
        },
      });
  });

  function onBeforeFileAdded(currentFile) {
    const modifiedFile = {
      ...currentFile,
      name: Date.now() + "_" + currentFile.name,
    };
    return modifiedFile;
  }

  useEffect(() => {
    uppy.reset();
    function handleSingleUpload(file) {
      const fileName = get(file, "name", "");
      const mime_type = get(file, "type", "");
      const fileKey = `${filePath}/${fileName}`;
      const uploadedFile: IUploadedFile = {
        mime_type,
        name: get(file, "data.name", ""),
        title: fileName.substr(0, fileName.lastIndexOf(".")),
        container: process.env.REACT_APP_AWS_STORAGE_BUCKET_NAME,
        key: fileKey,
        file: getS3FilePath(
          process.env.REACT_APP_AWS_STORAGE_BUCKET_NAME,
          fileKey
        ),
      };
      onUploadSuccess(uploadedFile, file.data);
    }
    function handleMultipleUpload(result) {
      const successfulFiles = result.successful;
      const uploadedFiles: IUploadedFile[] = successfulFiles.map((item) => {
        const fileName = get(item, "name", "");
        const mime_type = get(item, "type", "");
        const fileKey = `${filePath}/${fileName}`;
        const name = get(item.data, "name", "");
        return {
          mime_type,
          name,
          title: fileName.substr(0, fileName.lastIndexOf(".")),
          container: process.env.REACT_APP_AWS_STORAGE_BUCKET_NAME,
          key: fileKey,
          file: getS3FilePath(
            process.env.REACT_APP_AWS_STORAGE_BUCKET_NAME,
            fileKey
          ),
          file_name: name,
        };
      });
      onMultipleUploadSuccess(uploadedFiles, result);
    }
    if (isOpen && !allowMultipleUploads) {
      uppy.on("upload-success", handleSingleUpload);
      return () => {
        uppy.off("upload-success", handleSingleUpload);
      };
    }
    if (isOpen && allowMultipleUploads) {
      uppy.on("complete", handleMultipleUpload);
      return () => {
        uppy.off("complete", handleMultipleUpload);
      };
    }
  }, [isOpen]);

  return (
    <DashboardModal
      uppy={uppy}
      open={isOpen}
      onRequestClose={onRequestClose}
      plugins={["Dropbox", "GoogleDrive", "OneDrive"]}
      closeModalOnClickOutside
    />
  );
});

export default FileUploader;
