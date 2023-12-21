import React, { useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button, Select, Space } from "antd";
import { useGetData } from "meta/services/auth/ezAPI";
import ModalWithFormChild from "meta/Reusable/ModalWithFormChild";
import TermForm from "./TermForm";
import { SaveOutlined } from "@ant-design/icons";

const { Option } = Select;

const HeaderSelect = ({
  quill,
  dataSource,
  setEditorHtml,
  editorHtml,
  setRefreshing,
}) => {
  const handleChange = (value) => {
    setEditorHtml(value);
  };

  return (
    <Space>
      <Select
        style={{ width: 200 }}
        onChange={handleChange}
        placeholder="load your templete"
        allowClear
        showSearch
      >
        {dataSource?.map((d) => (
          <Option value={d.content} key={d._id}>
            {d.title}
          </Option>
        ))}
      </Select>
      {/* <Button type="link">Save as Templete</Button> */}
      <ModalWithFormChild
        childern={<TermForm modal={true} />}
        route={"meta/termCond/create"}
        title={"Save as Templete"}
        tooltip={"Save as Templete"}
        size="small"
        otherValues={{ content: editorHtml }}
        icon={<SaveOutlined />}
        type="text"
        setRefreshing={setRefreshing}
      />
    </Space>
  );
};

const CustomToolbar = ({
  quill,
  dataSource,
  setEditorHtml,
  editorHtml,
  setRefreshing,
}) => (
  <div id="toolbar">
    <HeaderSelect
      quill={quill}
      dataSource={dataSource}
      setEditorHtml={setEditorHtml}
      editorHtml={editorHtml}
      setRefreshing={setRefreshing}
    />

    <button className="ql-bold"></button>
    <button className="ql-italic"></button>
    <button className="ql-underline"></button>
    <button className="ql-strike"></button>
    <select className="ql-header">
      <option value="1"></option>
      <option value="2"></option>
      <option value="3"></option>
      <option value="4"></option>
      <option value="5"></option>
      <option value="6"></option>
      <option selected></option>
    </select>
    <select className="ql-font"></select>
    <select className="ql-size"></select>
    <select className="ql-align"></select>
    <button className="ql-list" value="ordered"></button>
    <button className="ql-list" value="bullet"></button>
    <button className="ql-indent" value="-1"></button>
    <button className="ql-indent" value="+1"></button>
    <button className="ql-direction" value="rtl"></button>
    <button className="ql-blockquote"></button>
    <button className="ql-code-block"></button>
    <button className="ql-link"></button>
    <button className="ql-image"></button>
    <button className="ql-video"></button>
    <button className="ql-formula"></button>
    <button className="ql-clean"></button>
    <select className="ql-color"></select>
    <select className="ql-background"></select>
    <button className="ql-new-button"></button>
    {/* <select className="ql-new-select">
      <option>A</option>
    </select> */}
  </div>
);

const TermAndConditionComponent = ({ editorHtml, setEditorHtml }) => {
  const [{ apiData: dataSource }, { setRefreshing }] = useGetData(
    `meta/termCond/alllist`,
    []
  );

  const modules = {
    toolbar: {
      container: "#toolbar",
    },
  };
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "color",
    "background",
    "code-block",
    "formula",
    "align",
    "direction",
  ];

  const onEditorChange = (content) => {
    setEditorHtml(content);
  };
  const quillRef = useRef();
  return (
    <div className="text-editor">
      <CustomToolbar
        quill={quillRef.current}
        dataSource={dataSource}
        setEditorHtml={setEditorHtml}
        editorHtml={editorHtml}
        setRefreshing={setRefreshing}
      />
      <ReactQuill
        value={editorHtml}
        onChange={onEditorChange}
        modules={modules}
        formats={formats}
        placeholder={"Write something or insert a star ★"}
        ref={quillRef}
      />
    </div>
  );
};

export default TermAndConditionComponent;
