import { Box } from "@/components/Box/Box";
import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import PageHeader from "@/components/Layout/PageHeader";
import { api } from "@/utils/api";
import { type NextPage } from "next";
import { BiCut } from "react-icons/bi";
import { toast } from "react-hot-toast"
import { createLinkSchema } from "@/schema/link";
import { ZodError } from "zod";

const Shorten: NextPage = () => {
  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
  const { mutateAsync, data } = api.link.create.useMutation({
    onSuccess: () => {
      toast.success("Link shortened successfully");
    }
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = e.currentTarget.url.value;

    if(!url) return;
    
    try {
      createLinkSchema.parse({ url });
    } catch (error) {
      if(error instanceof ZodError) {
        for(const err of error.errors) {
          toast.error(err.message);
        }
      }
      return;
    }
    
    await mutateAsync({ url });
  };

  return (
    <div className="flex flex-col w-full gap-5">
      <PageHeader
        title="Shorten your links"
        subtitle="Sign in to persist your data"
        icon={BiCut}
      />
      <Box className="w-full">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <p className="text-neutral-300">Link</p>
            <Input id="url" placeholder="Paste your link" />
          </div>
          <Button className="w-full" size="large" variant="primary">
            Shorten
          </Button>
          <div className="flex flex-col gap-2">
            <p className="text-neutral-300">Output</p>
            <Input id="output" value={`${origin}/${data ? data?.slug : ""}`} readOnly />
          </div>
        </form>
      </Box>
    </div>
  );
};

export default Shorten;