import {message} from 'antd';
export const success = (title) => {
  message.success(title);
};
export const error = (title) => {
  message.error(title);
};
export const warning = (title) => {
  message.warning(title);
};

export const normFile = (info) => {

  if (info.file.status !== 'uploading') {
    console.log(info.file, info.fileList);
   
  }
  if (info.file.status === 'done') {
     
    success(`${info.file.name} file uploaded successfully`);
  } else if (info.file?.status === 'error') {
    error(`${info.file.name} file upload failed.`);
  }

  return info.fileList?.map((person) => ({
    url: person.response ? person.response?.link : person.url,
    thumbUrl: person.response ? person.response?.link : person.url,
    uid: person.uid,
    name: person.name.replace(/\s+/g, '-'),
    status: person.status,
    type: person.type,
  }));
};

export const onFinishFailed = (errorInfo) => {
  errorInfo.errorFields.map((p) => error(p.errors[0]));
};
