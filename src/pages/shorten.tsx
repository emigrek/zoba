import { Box } from "@/components/Box/Box";
import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import PageHeader from "@/components/Layout/PageHeader";
import { api } from "@/utils/api";
import { type NextPage } from "next";
import { BiCut } from "react-icons/bi";

const Shorten: NextPage = () => {
  const { mutate, data, error } = api.link.create.useMutation();
  const { zodError } = error?.data || {};
  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = e.currentTarget.url.value;
    if (!url) return;
    await mutate({ url });
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
            {zodError?.fieldErrors?.url ? (
              <p className="text-red-500">
                {zodError?.fieldErrors?.url}
              </p>
            ) : null}
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