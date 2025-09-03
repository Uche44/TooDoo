export type TaskFormData = {
  title: string;
  description: string;
  category: string;
  emoji: string;
};



export interface TaskFormProps {
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export interface Task {
  id?: number;
  title: string;
  desc: string;
  category: string;
  emoji: string;
}

// props to category display buttons for task component
export interface Props {
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  refresh: boolean;
}


// props to category display buttons for task component
export interface TasksProps {
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  onCategoryChange: () => void;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}