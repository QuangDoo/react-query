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

export const addStudent = async (student: Omit<Student, 'id'>) => {
  const data = await http.post<Student>('students', { ...student });
  return data;
};
