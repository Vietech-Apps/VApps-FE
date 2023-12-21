import { Badge, Tag } from "antd";
import {
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
export function getStatusTag(status, count = null) {
  switch (status) {
    case "done":
      return (
        <Tag icon={<CheckCircleOutlined />} color="success">
          Done
        </Tag>
      );

    case "All":
      return <Tag color="#BDC3C7">All</Tag>;
    case "Today":
      return <Tag color="#BDC3C7">Today</Tag>;

    case "processing":
      return <Tag color="geekblue">Processing</Tag>;
    case "In Progress":
      return (
        <Tag icon={<SyncOutlined spin />} color="geekblue">
          In Progress
        </Tag>
      );
    case "stop":
      return (
        <Tag icon={<CloseCircleOutlined />} color="error">
          Stop
        </Tag>
      );
    case "warning":
      return (
        <Tag icon={<ExclamationCircleOutlined />} color="warning">
          warning
        </Tag>
      );
    case "pending":
      return (
        <Tag icon={<ClockCircleOutlined />} color="orange">
          Pending
        </Tag>
      );
    case "Enquiry":
      return (
        <Tag color="#87d068">
          Enquiry{count && <Badge color="#87d068" count={count} />}
        </Tag>
      );
    case "Estimation":
      return (
        <Tag color="#9B59B6">
          Estimation{count && <Badge color="#9B59B6" count={count} />}
        </Tag>
      );
    case "RFQ":
      return <Tag color="#9B59B6">Req For Quote</Tag>;
    case "PO":
      return <Tag color="#87d068">Purchase Order</Tag>;

    case "Quotation":
      return (
        <Tag color="#2db7f5">
          Quotation{count && <Badge color="#2db7f5" count={count} />}
        </Tag>
      );
    case "Active":
      return <Tag color="#2db7f5">Active</Tag>;
    case "Resigned":
      return <Tag color="#2db7f5">Resigned</Tag>;
    case "Retired":
      return <Tag color="#2db7f5">Retired</Tag>;
    case "Separated":
      return <Tag color="#2db7f5">Separated</Tag>;
    case "Deactivated":
      return <Tag color="#2db7f5">Deactivated</Tag>;
    case "Disqualified":
      return <Tag color="#2db7f5">Disqualified</Tag>;
    case "Disengaged":
      return <Tag color="#2db7f5">Disengaged</Tag>;
    case "Removed":
      return <Tag color="#2db7f5">Removed</Tag>;
    case "Quotation Sent":
      return <Tag color="#2db7f5">Quotation Sent</Tag>;
    case "Sale Order":
      return <Tag color="#52c41a">Sale Order</Tag>;
    case "Cancelled":
      return <Tag color="#eb2f96">Cancelled</Tag>;
    case "High":
      return <Tag color="#eb2f96">High</Tag>;
    case "Medium":
      return <Tag color="#F9E79F">Medium</Tag>;
    case "Low":
      return <Tag color="#7DCEA0">Low</Tag>;
    case "Confirm":
      return <Tag color="#eb2f96">Confirm</Tag>;
    case "GateIn":
      return <Tag color="#eb2f96">GateIn</Tag>;
    case "In Payment":
      return <Tag color="#52c41a">In Payment</Tag>;
    case "Partial":
      return <Tag color="#eb2f96">Partial</Tag>;
    case "Draft":
      return <Tag color="#F9E79F">Draft</Tag>;
    case "Posted":
      return <Tag color="#62DB7C">Posted</Tag>;
    case "DC":
      return <Tag color="#62DB7C">DC</Tag>;
    default:
      return <Tag color="#eb2f96">Status</Tag>;
  }
}
export const getStatusColor = (status) => {
  switch (status) {
    case "done":
      return "success";
    case "All":
    case "Today":
      return "#BDC3C7";
    case "processing":
      return "geekblue";
    case "In Progress":
      return "geekblue";
    case "stop":
      return "error";
    case "warning":
      return "warning";
    case "pending":
      return "orange";
    case "Enquiry":
      return "#87d068";
    case "Estimation":
      return "#9B59B6";
    case "RFQ":
      return "#9B59B6";
    case "PO":
      return "#87d068";
    case "Quotation":
      return "#2db7f5";
    case "Active":
    case "Resigned":
    case "Retired":
    case "Separated":
    case "Deactivated":
    case "Disqualified":
    case "Disengaged":
    case "Removed":
    case "Quotation Sent":
      return "#2db7f5";
    case "Sale Order":
      return "#52c41a";
    case "Cancelled":
    case "High":
      return "#eb2f96";
    case "Medium":
      return "#F9E79F";
    case "Low":
      return "#7DCEA0";
    case "Confirm":
    case "GateIn":
      return "#eb2f96";
    case "In Payment":
      return "#52c41a";
    case "Partial":
      return "#eb2f96";
    case "Draft":
      return "#E2A72E";
    case "Posted":
      return "#43C888";
    default:
      return "#E2A72E";
  }
};
