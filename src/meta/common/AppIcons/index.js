import {
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  FilterOutlined,
  PlusSquareOutlined,
  SaveOutlined,
  SendOutlined,
  UserOutlined,
  CopyOutlined,
  EyeOutlined,
  ArrowRightOutlined,
  PaperClipOutlined,
  ReconciliationOutlined,
  SyncOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import {
  AiOutlineCloseCircle,
  AiOutlineDownload,
  AiOutlineSchedule,
  AiOutlineTag,
} from 'react-icons/ai';
import {BiAnalyse} from 'react-icons/bi';
import {BsList} from 'react-icons/bs';
import {CgAttachment} from 'react-icons/cg';
import {FiExternalLink, FiRefreshCcw} from 'react-icons/fi';
import {ImPaste} from 'react-icons/im';
import {IoIosRefresh} from 'react-icons/io';
import {MdAddTask, MdOutlineCategory, MdOutlineNextPlan} from 'react-icons/md';

export const getIconByName = (iconName) => {
  switch (iconName) {
    case 'save':
      return <SaveOutlined className="mr-2" />;
    case 'create':
      return <PlusSquareOutlined className="mr-2" />;
    case 'read':
      return <SaveOutlined />;
    case 'edit':
      return <EditOutlined />;
    case 'delete':
      return <DeleteOutlined />;
    case 'attachment':
      return <CgAttachment />;
    case 'send':
      return <SendOutlined />;
    case 'user':
      return <UserOutlined />;
    case 'check':
      return <CheckOutlined />;
    case 'tag':
      return <AiOutlineTag />;
    case 'category':
      return <MdOutlineCategory />;
    case 'filter':
      return <FilterOutlined />;
    case 'copy':
      return <CopyOutlined />;
    case 'paste':
      return <ImPaste />;
    case 'externalLink':
      return <FiExternalLink />;
    case 'next':
      return <ArrowRightOutlined />;
    case 'view':
      return <EyeOutlined />;
    case 'paperClip':
      return <PaperClipOutlined />;
    case 'refresh':
      return <FiRefreshCcw />;
    case 'download':
      return <AiOutlineDownload />;
    case 'list':
      return <BsList />;
    case 'accessories':
      return <ReconciliationOutlined />;
    case 'analytic':
      return <BiAnalyse />;
    case 'proceed':
      return <MdAddTask />;
    case 'spining':
      return <SyncOutlined spin />;
    case 'closed':
      return <AiOutlineCloseCircle />;
  }
};
