import {CloudDownloadOutlined, UploadOutlined} from '@ant-design/icons';
import {Button, Upload} from 'antd';
import jwtAxios from 'meta/services/auth/jwt-api';
import {getIconByName} from '../AppIcons';
import {error, success} from '../AppMessages';
const ManualUploadNode = ({folder, ...props}) => {
  const onPreview = async (file) => {
    let src = file.url;

    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);

        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const onRemove =async (info) => {
  if (info.path) {
      const response = await jwtAxios.delete(
        `/multer/delete?path=${info.response[0].path}`,
      );
      const index = info.fileList.indexOf(info.file);
      const newFileList = info.fileList.slice();
      newFileList.splice(index, 1);
    //   setFileList(newFileList);
    } else {
      const index = info.fileList.indexOf(info.file);
      const newFileList = info.fileList.slice();
      newFileList.splice(index, 1);
    //   setFileList(newFileList);
    }
  };
  return (
    <Upload
      name='image'
      action={`/api/multer/upload?folder=${folder}`}
      listType='picture'
      onPreview={onPreview}
      onRemove={onRemove}
      {...props}>
      <Button icon={getIconByName('attachment')}>Attachments</Button>
    </Upload>
  );
};

export default ManualUploadNode;
