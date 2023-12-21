import React, { useState, useEffect } from "react";
import AppTableContainer from "./components/Tables";
import moment from "moment";
import { useIntl } from "react-intl";
import { message } from "antd";
import ModalForm from "./components/ModalForm";
import jwtAxios from "meta/services/auth/jwt-api";
//import {useAuthUser} from 'meta/utility/AuthHooks';
import Header from "./components/Header";
import AppsPagination from "meta/core/AppsPagination";
import AppsFooter from "meta/core/AppsContainer/AppsFooter";
import { useSelector } from "react-redux";

const Main = () => {
  //const {user} = useAuthUser();
  const ProcessList = useSelector(({ employees }) => employees.processList);
  const titleForm = `Task`;
  const listPath = `scrum/task/list`;
  const createPath = `scrum/task/create`;
  const updatePath = `scrum/task/update`;

  const [list1, setList1] = useState([]);
  const getList1 = async () => {
    try {
      const response = await jwtAxios.get(`admin/allusers`);
      setList1(response.data.result);
    } catch (error) {
      console.log("error", error);
    }
  };
  const [list2, setList2] = useState([]);
  const getList2 = async () => {
    try {
      const response = await jwtAxios.get(`vms/make/list`);
      setList2(response.data.result);
    } catch (error) {
      console.log("error", error);
    }
  };
  const [list3, setList3] = useState([]);
  const getList3 = async () => {
    try {
      const response = await jwtAxios.get(`vms/maintenancetype/sortedlist`);
      setList3(response.data.result);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getList1();
    //getList2();
    //getList3();
  }, []);

  const [total, setTotal] = useState();
  const [currentPage, setCurrentPage] = useState();
  const [currentPageSize, setCurrentPageSize] = useState();
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filter1, setFilter1] = useState();
  const [filter2, setFilter2] = useState();
  const [filter3, setFilter3] = useState();
  const [filter4, setFilter4] = useState();
  const [filter5, setFilter5] = useState();
  const [filter6, setFilter6] = useState();
  const [filter7, setFilter7] = useState();

  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [date, setDate] = useState(null);
  const [inquery, setInquery] = useState(1);

  //List Data
  const getListData = async () => {
    try {
      setLoading(true);
      const params = {
        //f1: filter1,
        //f2: filter2,
        //f3: filter3,
        //f4: filter4,
        //f5: filter5,
        //f6: filter6,
        //f7: filter7,
        page: currentPage,
        pageSize: currentPageSize,
        start: start == null ? "" : moment(start).format("DD-MM-YYYY"),
        end: end == null ? "" : moment(end).format("DD-MM-YYYY"),
      };
      const { data } = await jwtAxios.get(`${listPath}`, { params });
      if (data.success === true) {
        setListData(data.result);
        setTotal(data.pagination.totalCount);
        setCurrentPage(data.pagination.currentPage);
        setCurrentPageSize(data.pagination.pageSize);
        setLoading(false);
      } else if (data.success === false) {
        message.info(data.message);
        setListData(data.result);
        setLoading(false);
      }
    } catch (error) {
      message.error(error.response.data.message);
      console.log("error", error);
      setLoading(false);
    }
  };

  const onChange = (page, pageSize) => {
    setCurrentPage(page);
    setCurrentPageSize(pageSize);
    setInquery(inquery + 1);
  };
  useEffect(() => {
    getListData();
  }, [inquery]);
  //console.log(listData);

  const { messages } = useIntl();
  const [visible, setVisible] = useState(false);
  const handleVisible = () => {
    setVisible(true);
    setSelectedData({});
    setFilePath("");
    setFileList([]);
  };
  const [selectedData, setSelectedData] = useState({});
  const [fileList, setFileList] = useState([]);
  const [filePath, setFilePath] = useState();
  const handleSelected = (data) => {
    setSelectedData(data);
    setFileList(data.file);
    setVisible(true);
    setFilePath(data.avatar);
  };
  //  console.log(selectedData);

  return (
    <div>
      <Header
        handleVisible={handleVisible}
        titleForm={`${titleForm}`}
        ProcessList={ProcessList}
        list1={list1}
        list2={list2}
        setFilter1={setFilter1}
        filter1={filter1}
        filter2={filter2}
        setFilter2={setFilter2}
        filter3={filter3}
        setFilter3={setFilter3}
        filter4={filter4}
        setFilter4={setFilter4}
        filter5={filter5}
        setFilter5={setFilter5}
        filter6={filter6}
        setFilter6={setFilter6}
        filter7={filter7}
        setFilter7={setFilter7}
        setInquery={setInquery}
        inquery={inquery}
        total={total}
        start={start}
        setStart={setStart}
        end={end}
        setEnd={setEnd}
      />
      {listData ? (
        <AppTableContainer
          listData={listData}
          handleSelected={handleSelected}
          setCurrentPage={setCurrentPage}
          loading={loading}
        />
      ) : (
        []
      )}
      {currentPage > 0 ? (
        <AppsFooter className="contact-footer">
          <AppsPagination
            count={total}
            pageSize={currentPageSize}
            page={currentPage}
            showSizeChanger
            onChange={onChange}
          />
        </AppsFooter>
      ) : (
        []
      )}
      {visible && (
        <ModalForm
          visible={visible}
          setVisible={setVisible}
          titleForm={`Add New${titleForm}`}
          selectedData={selectedData}
          listData={listData}
          setListData={setListData}
          fileList={fileList}
          setFileList={setFileList}
          createPath={createPath}
          updatePath={updatePath}
          list1={list1}
          list2={list2}
          list3={list3}
          ProcessList={ProcessList}
          setFilePath={setFilePath}
          filePath={filePath}
        />
      )}
    </div>
  );
};

export default Main;
