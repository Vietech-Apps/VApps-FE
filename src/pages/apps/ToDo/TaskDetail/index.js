import React, { useEffect } from "react";
import TaskDetailHeader from "./TaskDetailHeader";
import TaskDetailBody from "./TaskDetailBody";
import { useParams } from "react-router-dom";
import AppsHeader from "meta/core/AppsContainer/AppsHeader";
import AppsContent from "meta/core/AppsContainer/AppsContent";
import { useGetDataApi } from "meta/utility/APIHooks";
import { useGetData } from "meta/services/auth/ezAPI";

const TaskDetail = () => {
  const { id } = useParams();

  const [{ apiData: selectedTask }, { reCallAPI, setData }] = useGetData(
    `/scrum/todo/read/${id}`,
    undefined,
    false
  );

  useEffect(() => {
    reCallAPI("true");
  }, [id]);

  const onUpdateSelectedTask = (data) => {
    setData(data);
  };

  if (!selectedTask) {
    return null;
  }
  return (
    <>
      <AppsHeader>
        <TaskDetailHeader
          selectedTask={selectedTask}
          onUpdateSelectedTask={onUpdateSelectedTask}
        />
      </AppsHeader>
      <AppsContent isDetailView>
        <TaskDetailBody
          selectedTask={selectedTask}
          onUpdateSelectedTask={onUpdateSelectedTask}
        />
      </AppsContent>
    </>
  );
};

export default TaskDetail;
