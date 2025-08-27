import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux'; // Make sure this import is present
import { login } from '@/State/Auth/Action';
import { useNavigate } from 'react-router-dom';

const SigninForm = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
  dispatch(login({ email: data.email, password: data.password }))
    .then(() => {
      navigate("/");   // ✅ yaha navigate kar
    });
};

  return (
    <div className='px-10 py-2'>
      <h1 className='text-xl font-bold m-2'>Login</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    className="border w-full border-gray-700"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    className="border w-full border-gray-700"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full py-5">
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SigninForm;