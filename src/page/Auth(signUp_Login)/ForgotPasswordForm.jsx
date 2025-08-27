// ForgotPasswordForm.jsx
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
import { useDispatch } from "react-redux";
const ForgotPasswordForm = () => {
    const dispatch=useDispatch()
  const form = useForm({
    defaultValues: {
      // ✨ UPDATED DEFAULT VALUES TO ONLY EMAIL ✨
      email: "",
    },
  });
  const onSubmit = (data) => {
    console.log("Forgot password form data:", data);
  };

  return (
    <div className='px-10 py-2'>
      <h1 className='text-xl font-bold m-2'>Forgot Password</h1>
      <Form {...form} className="w-[80%]">
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem >
                <FormControl>
                  <Input
                    type="email"
                    className="border w-full border-gray-700"
                    placeholder="Enter your Email id"
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

export default ForgotPasswordForm;