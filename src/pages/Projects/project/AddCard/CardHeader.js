import React from 'react';
import {useDropzone} from 'react-dropzone';
import {IoMdAttach} from 'react-icons/io';
import {AiOutlineDelete} from 'react-icons/ai';
import AppIconButton from 'meta/core/AppIconButton';

const CardHeader = (props) => {
  const {onClickDeleteIcon, list, onAddAttachments} = props;
  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      const files = acceptedFiles.map((file) => {
        return {
          id: Math.floor(Math.random() * 10000),
          file,
          preview: URL.createObjectURL(file),
        };
      });
      onAddAttachments(files);
    },
  });
  //{board.name}
  return (
    <div className='scrum-board-card-header'>
      <h3 className='text-truncate'>{list.name}</h3>
      <div className='scrum-board-card-header-action'>
        <AppIconButton
          icon={
            <div {...getRootProps({className: 'dropzone'})}>
              <input {...getInputProps()} />
              <IoMdAttach />
            </div>
          }
        />

        <AppIconButton icon={<AiOutlineDelete />} onClick={onClickDeleteIcon} />
      </div>
    </div>
  );
};

export default CardHeader;
