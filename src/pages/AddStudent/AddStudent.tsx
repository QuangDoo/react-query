import { useMutation } from '@tanstack/react-query';
import { addStudent } from 'apis';
import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import { useMatch } from 'react-router-dom';
import { isAxiosError } from 'utils/isAxiosError';

type FormState = Omit<Student, 'id'>;
type FormError = {
  [key in keyof FormState]: string | null;
};

const initalState: FormState = {
  avatar: '',
  btc_address: '',
  country: '',
  email: '',
  first_name: '',
  gender: '',
  last_name: ''
};
export default function AddStudent() {
  const [formState, setFormState] = useState<FormState>(initalState);
  const addMatch = Boolean(useMatch('/students/add'));

  const { mutate, data, error, reset } = useMutation({
    mutationFn: (params: FormState) => {
      return addStudent(params);
    },
    onSuccess: () => {
      setFormState(initalState);
    }
  });

  const errorForm = useMemo(() => {
    if (
      isAxiosError<{ error: FormError }>(error) &&
      error.response?.status === 422
    ) {
      return error.response?.data?.error;
    }
    return null;
  }, [error]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });

    if (data || error) {
      reset();
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate(formState);
  };

  return (
    <div>
      <h1 className='text-lg'>{addMatch ? 'Add' : 'Edit'} Student</h1>
      <form className='mt-6' onSubmit={handleSubmit}>
        <div className='group relative z-0 mb-6 w-full'>
          <input
            name='email'
            id='floating_email'
            className='peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm
             text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0'
            placeholder=' '
            required
            value={formState.email}
            onChange={handleChange}
          />
          <label
            htmlFor='floating_email'
            className='absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500'
          >
            Email address
          </label>
          {errorForm && (
            <p className='mt-2 text-sm text-red-600'>
              <span className='font-medium'>Lỗi! {errorForm.email}</span>
            </p>
          )}
        </div>

        <div className='group relative z-0 mb-6 w-full'>
          <div>
            <div>
              <div className='mb-4 flex items-center'>
                <input
                  id='gender-1'
                  type='radio'
                  name='gender'
                  className='h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500  '
                  value='male'
                  checked={formState.gender === 'male'}
                  onChange={handleChange}
                />
                <label
                  htmlFor='gender-1'
                  className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                >
                  Male
                </label>
              </div>
              <div className='mb-4 flex items-center'>
                <input
                  id='gender-2'
                  type='radio'
                  name='gender'
                  className='h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500'
                  value='female'
                  checked={formState.gender === 'female'}
                  onChange={handleChange}
                />
                <label
                  htmlFor='gender-2'
                  className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                >
                  Female
                </label>
              </div>
              <div className='flex items-center'>
                <input
                  id='gender-3'
                  type='radio'
                  name='gender'
                  className='h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500'
                  value='other'
                  checked={formState.gender === 'other'}
                  onChange={handleChange}
                />
                <label
                  htmlFor='gender-3'
                  className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                >
                  Other
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className='group relative z-0 mb-6 w-full'>
          <input
            type='text'
            name='country'
            id='country'
            className='peer block w-full appearance-none 
            border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none 
            focus:ring-0 dark:border-gray-600  dark:focus:border-blue-500'
            placeholder=' '
            required
            value={formState.country}
            onChange={handleChange}
          />
          <label
            htmlFor='country'
            className='absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500'
          >
            Country
          </label>
        </div>
        <div className='grid md:grid-cols-2 md:gap-6'>
          <div className='group relative z-0 mb-6 w-full'>
            <input
              type='tel'
              name='first_name'
              id='first_name'
              className='peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900
               focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600  dark:focus:border-blue-500'
              placeholder=' '
              required
              value={formState.first_name}
              onChange={handleChange}
            />
            <label
              htmlFor='first_name'
              className='absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300
               peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75
                peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500'
            >
              First Name
            </label>
          </div>
          <div className='group relative z-0 mb-6 w-full'>
            <input
              type='text'
              name='last_name'
              id='last_name'
              className='peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600  dark:focus:border-blue-500'
              placeholder=' '
              required
              value={formState.last_name}
              onChange={handleChange}
            />
            <label
              htmlFor='last_name'
              className='absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm
               text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75
                peer-focus:font-medium peer-focus:text-blue-600  peer-focus:dark:text-blue-500'
            >
              Last Name
            </label>
          </div>
        </div>
        <div className='grid md:grid-cols-2 md:gap-6'>
          <div className='group relative z-0 mb-6 w-full'>
            <input
              type='text'
              name='avatar'
              id='avatar'
              className='peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm
               text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600  dark:focus:border-blue-500'
              placeholder=' '
              required
              value={formState.avatar}
              onChange={handleChange}
            />
            <label
              htmlFor='avatar'
              className='absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500'
            >
              Avatar Base64
            </label>
          </div>
          <div className='group relative z-0 mb-6 w-full'>
            <input
              type='text'
              name='btc_address'
              id='btc_address'
              className='peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600  dark:focus:border-blue-500'
              placeholder=' '
              required
              value={formState.btc_address}
              onChange={handleChange}
            />
            <label
              htmlFor='btc_address'
              className='absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500'
            >
              BTC Address
            </label>
          </div>
        </div>

        <button
          type='submit'
          className='w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto'
        >
          Submit
        </button>
      </form>
    </div>
  );
}
