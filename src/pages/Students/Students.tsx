import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteStudent, getStudent, getStudents } from 'apis';
import { useSearchParamsQuery } from 'hooks';
import { useMemo } from 'react';
import { Link, NavLink } from 'react-router-dom';

const LIMIT = 10;

export default function Students() {
  const searchQuery = useSearchParamsQuery<Record<'page', number>>();
  const page = useMemo(() => Number(searchQuery.page), [searchQuery.page]);
  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['studentsData', page],
    queryFn: () => getStudents(page, 10),
    // cacheTime will be executed when there are no component subcribe to queryKey
    staleTime: 0,
    // cacheTime = 0, react-query remove the querykey immerdiately
    cacheTime: 4000,
    keepPreviousData: true
  });

  const { mutate } = useMutation({
    mutationFn: (id: number) => deleteStudent(id),
    onSuccess: () => {
      // refetch();
      queryClient.invalidateQueries({
        queryKey: ['studentsData', page],
        exact: true
      });
    }
  });

  const pages = Math.ceil(Number(data?.headers['x-total-count']) / LIMIT);

  const handleDelete = (id: number) => () => {
    mutate(id);
  };

  const handlePrefetchStudent = (id: number) => async () => {
    await queryClient.prefetchQuery({
      queryKey: ['student', String(id)],
      queryFn: () => getStudent(id),
      staleTime: 10 * 1000
    });
  };

  return (
    <div>
      <h1 className='text-lg'>Students</h1>

      <div className='mt-2'>
        <Link
          to='/students/add'
          className='rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300  dark:focus:ring-blue-800'
        >
          Add
        </Link>
      </div>

      {isLoading && (
        <div role='status' className='mt-6 animate-pulse'>
          {[...Array(10)].map((x, index) => (
            <div
              key={index}
              className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700'
            />
          ))}

          <span className='sr-only'>Loading...</span>
        </div>
      )}

      <div className='relative mt-6 overflow-x-auto shadow-md sm:rounded-lg'>
        <table className='w-full text-left text-sm text-gray-500 dark:text-gray-400'>
          <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='py-3 px-6'>
                #
              </th>
              <th scope='col' className='py-3 px-6'>
                Avatar
              </th>
              <th scope='col' className='py-3 px-6'>
                Name
              </th>
              <th scope='col' className='py-3 px-6'>
                Email
              </th>
              <th scope='col' className='py-3 px-6'>
                <span className='sr-only'>Action</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {!!data?.data?.length &&
              data.data.map((student, index) => (
                <tr
                  key={student.id}
                  className='border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600'
                  onMouseEnter={handlePrefetchStudent(student.id)}
                >
                  <td className='py-4 px-6'>{student.id}</td>
                  <td className='py-4 px-6'>
                    <img
                      src={student.avatar}
                      alt='student'
                      className='h-5 w-5'
                    />
                  </td>
                  <th
                    scope='row'
                    className='whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white'
                  >
                    {student.last_name}
                  </th>
                  <td className='py-4 px-6'>{student.email}</td>
                  <td className='py-4 px-6 text-right'>
                    <Link
                      to={`/students/${student.id}`}
                      className='mr-5 font-medium text-blue-600 hover:underline dark:text-blue-500'
                    >
                      Edit
                    </Link>
                    <button
                      onClick={handleDelete(student.id)}
                      className='font-medium text-red-600 dark:text-red-500'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className='mt-6 flex justify-center'>
        <nav aria-label='Page navigation example'>
          <ul className='inline-flex -space-x-px'>
            <li>
              <Link
                onClick={(e) => (page === 1 ? e.preventDefault() : '')}
                to={`/students/?page=${page - 1}`}
                className={`${
                  page === 1 && 'cursor-not-allowed'
                } rounded-l-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
              >
                Previous
              </Link>
            </li>

            <li>
              {!!pages &&
                [...Array(pages)].map((_, index) => {
                  return (
                    <NavLink
                      to={`/students/?page=${index + 1}`}
                      key={index}
                      className={() => {
                        const activeClass =
                          page === index + 1
                            ? 'bg-gray-600 font-semibold text-white'
                            : '';

                        return `${activeClass} border border-gray-300 bg-white  py-2 px-3 leading-tight text-gray-500   hover:bg-gray-100  hover:text-gray-700`;
                      }}
                    >
                      {index + 1}
                    </NavLink>
                  );
                })}
            </li>
            <li>
              <Link
                to={`/students/?page=${page + 1}`}
                className='rounded-r-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
              >
                Next
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
