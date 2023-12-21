import {Button} from 'antd';
import React from 'react';
import ReactExport from 'react-export-excel';
import moment from 'moment';
import {FileExcelOutlined} from '@ant-design/icons';
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const ExportExcel = ({data}) => {
  return (
    <ExcelFile
      element={
        <Button type='primary' icon={<FileExcelOutlined />}>
          Export
        </Button>
      }>
      <ExcelSheet data={data ? data : []} name='Refueling' fileName='Refueling'>
        <ExcelColumn label='Id' value='Id' />
        <ExcelColumn label='Driver' value={(p) => p.driver.name} />
        <ExcelColumn label='Vehicle' value={(p) => p.vehicle.vehicleReg} />
        <ExcelColumn label='Reading' value='reading' />
        <ExcelColumn label='Fuel Amount' value='fuelPrice' />
        <ExcelColumn label='Liters' value='fuelLitres' />
        <ExcelColumn label='Filling Station' value='fillingStation' />
        <ExcelColumn label='Description' value='description' />
        <ExcelColumn
          label='Date'
          value={(col) => moment(col.date).format('DD-MM-YYYY')}
        />
        {/* <ExcelColumn label='Recipt' value='file' /> */}
      </ExcelSheet>
    </ExcelFile>
  );
};

export default ExportExcel;
