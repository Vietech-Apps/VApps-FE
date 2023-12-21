import { error, success } from "../AppMessages";

export const normFile = (info) => {
  if (info.file.status !== "uploading") {
    console.log(info.file, info.fileList);
  }
  if (info.file.status === "done") {
    success(`${info.file.name} file uploaded successfully`);
  } else if (info.file?.status === "error") {
    error(`${info.file.name} file upload failed.`);
  }

  return info?.fileList?.map((p) => ({
    url: p.response ? p.response?.link : p.url,
    thumbUrl: p.response ? p.response?.link : p.url,
    uid: p.uid,
    name: p.name.replaceAll(" ", "-"),
    status: p.status,
    type: p.type,
  }));
};
