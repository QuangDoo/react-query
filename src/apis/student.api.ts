import { http } from 'utils/http';

export const getStudents = async (
  page?: number | string,
  limit?: number | string
) => {
  const data = await http.get<
    Pick<Student, 'id' | 'avatar' | 'last_name' | 'email'>[]
  >('students', {
    params: {
      _page: page || 1,
      _limit: limit || 10
    }
  });

  return data;
};

export const getStudent = async (id?: number) => {
  if (!id) return;

  const data = await http.get<Student>(`students/${id}`);

  return data;
};

export const addStudent = async (student: Omit<Student, 'id'>) => {
  const data = await http.post<Student>('students', student);

  return data;
};

export const updateStudent = async (student: Student) => {
  const data = await http.put<Student>(`students/${student.id}`, student);

  return data;
};

export const deleteStudent = async (id: number) => {
  const data = await http.delete(`students/${id}`);

  return data;
};
