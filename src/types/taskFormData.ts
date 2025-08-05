export type TaskFormData = {
  title: string;
  description: string;
  category: string;
  emoji: string;
};



export interface TaskFormProps {
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface Task {
  id?: number;
  title: string;
  desc: string;
  category: string;
  emoji: string;
}