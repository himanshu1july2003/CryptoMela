import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import { register } from "@/State/Auth/Action";
import { useDispatch } from "react-redux";
// Signup.jsx
const Signup = () => {
  const dispatch = useDispatch();

  const form = useForm({
    defaultValues: {
      // ✨ UPDATED DEFAULT VALUES TO MATCH USER REGISTRATION FIELDS ✨
      fullName: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
  });

  const onSubmit = (data) => {
     dispatch(register(data))
    console.log("Signup form data:", data); 
  };
  return (
    <div className='w-full'>
      <h1 className='text-xl font-bold m-2'>Create New Account</h1>
      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <FormField
            control={form.control}
            name="fullName" // ✨ UPDATED NAME ✨
            render={({ field }) => (
              <FormItem>
                <FormControl >
                  <Input
                    className="border w-full border-gray-700"
                    placeholder="Full Name"
                    {...field}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email" // ✨ UPDATED NAME ✨
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    className="border w-full border-gray-700"
                    placeholder="Your Email Id"
                    {...field}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password" // ✨ UPDATED NAME ✨
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    className="border w-full border-gray-700"
                    placeholder="Password"
                    {...field}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword" // ✨ UPDATED NAME ✨
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    className="border w-full border-gray-700"
                    placeholder="Confirm Password"
                    {...field}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <Dialog>
            <DialogTrigger asChild>
              <Button type="submit" className="w-full py-5">
                Submit
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogClose className="w-full py-5">
                Close
              </DialogClose>
            </DialogContent>
          </Dialog>
        </form>
      </Form>
    </div>
  );
};

export default Signup;