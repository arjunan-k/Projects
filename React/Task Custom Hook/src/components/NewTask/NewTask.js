import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHttp from '../../hooks/use-http';
const URL = "Firebase Url"

const NewTask = (props) => {
  const {isLoading, error, sendRequest: sendTaskRequest} = useHttp()

  const createTask = (taskText, taskData) => {
    const generatedId = taskData.name; // firebase => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };
    props.onAddTask(createdTask);
  }

  const enterTaskHandler = async (taskText) => {
    sendTaskRequest({
      url: URL, 
      method: 'POST',
      body: { text: taskText },
      headers: {'Content-Type': 'application/json'}
  }, createTask.bind(null, taskText))
};

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;