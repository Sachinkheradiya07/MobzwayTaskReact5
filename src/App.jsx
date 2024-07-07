import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./App.css";

const ItemTypes = {
  TASK: "task",
};

// Task component
const Task = ({ task }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TASK,
    item: { id: task.id, content: task.content },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className="task-box"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="task-id">{task.id}</div>
      <div className="task-content">{task.content}</div>
    </div>
  );
};

// DroppableBox component
const DroppableBox = ({ title, tasks, setTasks, moveTask }) => {
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.TASK,
    drop: (item) => {
      moveTask(item, title);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      className="box"
      ref={drop}
      style={{ backgroundColor: isOver ? "#f0f0f0" : "white" }}
    >
      <h3>{title}</h3>
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
};

function App() {
  const [tasks, setTasks] = useState([
    { id: "task-1", content: "Morning Exercise" },
    { id: "task-2", content: "Check Emails" },
    { id: "task-3", content: "Team Meeting" },
    { id: "task-4", content: "Work on Project A" },
    { id: "task-5", content: "Lunch Break" },
    { id: "task-6", content: "Client Call" },
    { id: "task-7", content: "Code Review" },
    { id: "task-8", content: "Write Documentation" },
    { id: "task-9", content: "Afternoon Walk" },
    { id: "task-10", content: "Plan for Tomorrow" },
  ]);

  const [todayTasks, setTodayTasks] = useState([]);
  const [tomorrowTasks, setTomorrowTasks] = useState([]);
  const [thisWeekTasks, setThisWeekTasks] = useState([]);
  const [nextWeekTasks, setNextWeekTasks] = useState([]);
  const [unplannedTasks, setUnplannedTasks] = useState(tasks);

  const moveTask = (item, targetList) => {
    setUnplannedTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== item.id)
    );
    setTodayTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== item.id)
    );
    setTomorrowTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== item.id)
    );
    setThisWeekTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== item.id)
    );
    setNextWeekTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== item.id)
    );

    switch (targetList) {
      case "Today":
        setTodayTasks((prevTasks) => [...prevTasks, item]);
        break;
      case "Tomorrow":
        setTomorrowTasks((prevTasks) => [...prevTasks, item]);
        break;
      case "This Week":
        setThisWeekTasks((prevTasks) => [...prevTasks, item]);
        break;
      case "Next Week":
        setNextWeekTasks((prevTasks) => [...prevTasks, item]);
        break;
      default:
        setUnplannedTasks((prevTasks) => [...prevTasks, item]);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <h2>Drag and Drop Task Management</h2>
      <div className="container">
        <DroppableBox
          title="Today"
          tasks={todayTasks}
          setTasks={setTodayTasks}
          moveTask={moveTask}
        />
        <DroppableBox
          title="Tomorrow"
          tasks={tomorrowTasks}
          setTasks={setTomorrowTasks}
          moveTask={moveTask}
        />
        <DroppableBox
          title="This Week"
          tasks={thisWeekTasks}
          setTasks={setThisWeekTasks}
          moveTask={moveTask}
        />
        <DroppableBox
          title="Next Week"
          tasks={nextWeekTasks}
          setTasks={setNextWeekTasks}
          moveTask={moveTask}
        />
        <DroppableBox
          title="Unplanned"
          tasks={unplannedTasks}
          setTasks={setUnplannedTasks}
          moveTask={moveTask}
        />
      </div>
    </DndProvider>
  );
}

export default App;
