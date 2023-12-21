import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {
  Radio,
  Button,
  Row,
  Col,
  Tooltip,
  Tag,
  Progress,
  Avatar,
  Menu,
  Card,
} from 'antd';
import moment from 'moment';
import {
  AppstoreOutlined,
  UnorderedListOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import ProjectListData from './ProjectListData';
import {
  fetchAllBoards,
  createNewBoard,
} from 'redux/actions/Projects/boardActions';
import {
  PaperClipOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import utils from './components/utils';
import Flex from './components/Flex';
import EllipsisDropdown from './components/EllipsisDropdown';
import AddNewBoard from './AddNewBoard';
import {useDispatch, useSelector} from 'react-redux';
import {createNewActivity} from 'redux/actions/Projects/activityActions';
import {useAuthUser} from 'meta/utility/AuthHooks';
import {red} from '@ant-design/colors';
import {onGetProcessList} from 'redux/actions';
export const COLOR_1 = '#3e82f7'; // blue
export const COLOR_2 = '#04d182'; // cyan
export const COLOR_3 = '#ff6b72'; // volcano
export const COLOR_4 = '#ffc107'; // gold
export const COLOR_5 = '#a461d8'; // purple
export const COLOR_6 = '#fa8c16'; // orange
export const COLOR_7 = '#17bcff'; // geekblue

const VIEW_LIST = 'LIST';
const VIEW_GRID = 'GRID';

const ItemAction = ({id, removeId}) => (
  <EllipsisDropdown
    menu={
      <Menu>
        <Menu.Item key='0'>
          <EyeOutlined />
          <span>View</span>
        </Menu.Item>
        <Menu.Item key='1'>
          <EditOutlined />
          <span>Edit</span>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key='2' onClick={() => removeId(id)}>
          <DeleteOutlined />
          <span>Delete Project</span>
        </Menu.Item>
      </Menu>
    }
  />
);

const ItemHeader = ({Id, name, category}) => (
  <div>
    <h4 className='mb-0'>Project-{Id}</h4>
    <h4 className='mb-0'>{name}</h4>
    <span className='text-muted'>{category}</span>
  </div>
);
const days = (targetDate) => {
  var given = moment(targetDate, 'YYYY-MM-DD');
  var current = moment().startOf('day');
  return moment.duration(given.diff(current)).asDays();
};

const ItemInfo = ({
  attachmentCount,
  completedTask,
  totalTask,
  statusColor,
  targetDate,
  dayleft,
}) => (
  <Flex alignItems='center'>
    <div className='mr-3'>
      <Tooltip title='Attachment'>
        <PaperClipOutlined className='text-muted font-size-md' />
        <span className='ml-1 text-muted'>{attachmentCount}</span>
      </Tooltip>
    </div>
    <div>
      <Tag
        className={statusColor === 'none' ? 'bg-gray-lightest' : ''}
        color={
          days(targetDate) < 5
            ? 'red'
            : days(targetDate) < 15
            ? 'orange'
            : days(targetDate) < 25
            ? 'geekblue'
            : 'green'
        }>
        <ClockCircleOutlined />
        <span className='ml-2 font-weight-semibold'>
          {days(targetDate)} days left
        </span>
      </Tag>
    </div>
  </Flex>
);

const ItemProgress = ({progression}) => (
  <Progress
    percent={progression}
    strokeColor={getProgressStatusColor(progression)}
    size='small'
  />
);

const ItemMember = ({member}) => (
  //div added
  <div>
    {console.log('first', member)}
    {member.map((elm, i) =>
      i <= 2 ? (
        <Tooltip title={elm.name ? elm.name : ''} key={`avatar-${i}`}>
          <Avatar
            size='small'
            className={`ml-1 cursor-pointer ant-avatar-orange`}
            src={elm.avatar ? elm.avatar : ''}>
            {elm.avatar ? (
              ''
            ) : (
              <span className='font-weight-semibold font-size-sm'>
                {elm.name ? utils.getNameInitial(elm.name) : `User${i}`}
              </span>
            )}
          </Avatar>
        </Tooltip>
      ) : null,
    )}
    {member.length > 3 ? (
      <Tooltip title={`${member.length - 3} More`}>
        <Avatar
          size={25}
          className='ml-1 cursor-pointer bg-white border font-size-sm'>
          <span className='text-gray-light font-weight-semibold'>
            +{member.length - 3}
          </span>
        </Avatar>
      </Tooltip>
    ) : null}
  </div>
);

const ListItem = ({navigate, data, removeId}) => (
  <div
    onClick={(e) => {
      navigate(`/apps/projects/scrum-board/${data._id}`);
    }}
    className='bg-white rounded p-3 mb-3 border'>
    <Row align='middle'>
      <Col xs={24} sm={24} md={8}>
        <ItemHeader Id={data.Id} name={data.name} category={data.category} />
      </Col>
      <Col xs={24} sm={24} md={6}>
        <ItemInfo
          attachmentCount={data.attachmentCount}
          completedTask={data.completedTask}
          totalTask={data.totalTask}
          statusColor={data.statusColor}
          targetDate={data.targetDate}
          dayleft={data.dayleft}
        />
      </Col>
      <Col xs={24} sm={24} md={5}>
        <ItemProgress progression={60} />
      </Col>
      <Col xs={24} sm={24} md={3}>
        <div className='ml-0 ml-md-3'>
          <ItemMember member={data.members} />
        </div>
      </Col>
      <Col xs={24} sm={24} md={2}>
        <div className='text-right'>
          <ItemAction id={data._id} removeId={removeId} />
        </div>
      </Col>
    </Row>
  </div>
);

const GridItem = ({data, navigate, removeId}) => (
  <Card
    onClick={(e) => {
      navigate(`/apps/projects/scrum-board/${data._id}`);
    }}>
    <Flex alignItems='center' justifyContent='between'>
      <ItemHeader Id={data.Id} name={data.name} category={data.category} />
      <ItemAction id={data._id} removeId={removeId} />
    </Flex>
    <div className='mt-2'>
      <ItemInfo
        attachmentCount={0}
        completedTask={10}
        totalTask={22}
        statusColor='red'
        targetDate={data.targetDate}
        dayleft={6}
      />
    </div>
    <div className='mt-2'>
      <ItemMember member={data.members} />
    </div>
  </Card>
);

const getProgressStatusColor = (progress) => {
  if (progress >= 80) {
    return COLOR_1;
  }
  if (progress < 60 && progress > 30) {
    return COLOR_3;
  }
  if (progress < 30) {
    return COLOR_2;
  }
  return COLOR_4;
};
const imageUrls = {
  thumb:
    'https://images.unsplash.com/photo-1433477155337-9aea4e790195?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max',
  full: 'https://images.unsplash.com/photo-1433477155337-9aea4e790195?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb',
};

const ProjectList = () => {
  const navigate = useNavigate();
  const [view, setView] = useState(VIEW_GRID);
  const {user} = useAuthUser();
  const [list, setList] = useState(ProjectListData);
  const {boards, newBoard} = useSelector((state) => state.boards);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllBoards());
  }, [dispatch]);
  useEffect(() => {
    dispatch(onGetProcessList());
  }, [dispatch]);
  const processList = useSelector(({employees}) => employees.processList);

  useEffect(() => {
    if (newBoard) {
      dispatch(
        createNewActivity({
          text: `${user.name} created this Project -> ${newBoard.name} `,
          boardId: newBoard._id,
        }),
      );
    }
  }, [newBoard, dispatch, user]);

  const onChangeProjectView = (e) => {
    setView(e.target.value);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const onAddBoard = (name) => {
    const postBoardReq = {
      ...name,
      image: {
        color: 'white',
        thumb: imageUrls.thumb,
        full: imageUrls.full,
      },
    };
    dispatch(createNewBoard(postBoardReq));
    setIsModalVisible(false);
    // if (selectedBoard) {
    //   const board = {...selectedBoard, name};
    //   dispatch(onEditBoardDetail(board));
    // } else {

    // };

    // }
  };

  const deleteItem = (id) => {
    const data = list.filter((elm) => elm.id !== id);
    setList(data);
  };
  const showModal = () => {
    setSelectedBoard(null);
    setIsModalVisible(true);
  };

  return (
    <>
      <div className='container-fluid'>
        <Flex justifyContent='between' alignItems='center' className='py-4'>
          <h2>Projects</h2>
          <div>
            <Radio.Group
              defaultValue={VIEW_GRID}
              onChange={(e) => onChangeProjectView(e)}>
              <Radio.Button value={VIEW_GRID}>
                <AppstoreOutlined />
              </Radio.Button>
              <Radio.Button value={VIEW_LIST}>
                <UnorderedListOutlined />
              </Radio.Button>
            </Radio.Group>
            <Button type='primary' className='ml-2' onClick={() => showModal()}>
              <PlusOutlined />
              <span>New</span>
            </Button>
          </div>
        </Flex>
        {isModalVisible ? (
          <AddNewBoard
            isModalVisible={isModalVisible}
            handleCancel={handleCancel}
            onAddBoard={onAddBoard}
            handleOk={handleOk}
            selectedBoard={selectedBoard}
            processList={processList}
          />
        ) : null}
      </div>
      {console.log('boards', boards)}
      <div
        className={`my-4 ${
          view === VIEW_LIST ? 'container' : 'container-fluid'
        }`}>
        {view === VIEW_LIST ? (
          boards.map((elm) => (
            <ListItem
              navigate={navigate}
              data={elm}
              removeId={(id) => deleteItem(id)}
              key={elm._id}
            />
          ))
        ) : (
          <Row gutter={16}>
            {boards.map((elm) => (
              <Col xs={24} sm={24} lg={8} xl={8} xxl={6} key={elm.id}>
                <GridItem
                  navigate={navigate}
                  data={elm}
                  removeId={(id) => deleteItem(id)}
                />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </>
  );
};

export default ProjectList;
