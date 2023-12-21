import React from "react";
import styled from "styled-components";

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 8px;
  border-bottom: 1px solid #ddd;
  background-color: #f2f2f2;
`;

const TableData = styled.td`
  text-align: left;
  padding: 8px;
  border-bottom: 1px solid #ddd;
`;

const ApprovalTable = ({ selected }) => {
  return (
    <Table>
      <thead>
        <tr>
          <TableHeader>Role</TableHeader>
          <TableHeader>Approval By</TableHeader>
          <TableHeader>Email</TableHeader>
          <TableHeader>Status</TableHeader>
          <TableHeader>Schedule Date</TableHeader>
          <TableHeader>Approval Date</TableHeader>
          <TableHeader>Request By</TableHeader>
        </tr>
      </thead>
      <tbody>
        {selected?.approvedBy?.map((c, i) => (
          <tr key={i}>
            <TableData>{c.user?.process?.title}</TableData>
            <TableData>{c.user?.name}</TableData>
            <TableData>{c.user?.email}</TableData>
            <TableData>{c.status || "Not yet"}</TableData>
            <TableData>{c.schedualDate}</TableData>
            <TableData>{c.approvalDate}</TableData>
            <TableData>{selected?.createdBy?.name}</TableData>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ApprovalTable;
