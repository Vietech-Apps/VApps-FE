import {error, success} from '../AppMessages';

export const manualNormFile = (info) => {
  if (info.file.status !== 'uploading') {
    console.log(info.file, info.fileList);
  }
  if (info.file.status === 'done') {
    success(`${info.file.name} file uploaded successfully`);
  } else if (info.file?.status === 'error') {
    error(`${info.file.name} file upload failed.`);
  }

  return info.fileList?.map((person) => ({
    url: person.response ? person.response?.url : person.url,
    path: person.response ? person.response?.path : person.path,
    uid: person.uid,
    name: person.name,
    status: person.status,
    type: person.type,
    size: person.size,
  }));
};
