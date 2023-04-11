import { FC } from 'react'
import { Input } from '../ui/Input/Input';
import { Button } from '../ui/Button/Button';
import { createLinkSchema } from "@/schema/link";
import { ZodError } from "zod";
import { useMemo } from "react";
import { api } from '@/utils/api';
import { toast } from 'react-hot-toast';

// @ts-ignore
import { CopyToClipboard } from 'react-copy-to-clipboard';

interface ShortenFormProps { }

const ShortenForm: FC<ShortenFormProps> = ({ }) => {
    const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
    const { mutateAsync: createLink, data } = api.link.create.useMutation({
        onSuccess: () => {
            toast.success("Link shortened successfully");
        }
    });
    const shortened = useMemo(() => `${origin}/${data ? data?.slug : ""}`, [data, origin]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const url = e.currentTarget.url.value;

        if (!url) return;

        try {
            createLinkSchema.parse({ url });
        } catch (error) {
            if (error instanceof ZodError) {
                for (const err of error.errors) {
                    toast.error(err.message);
                }
                return;
            } else {
                toast.error("Something went wrong");
                return;
            }
        }

        await createLink({ url });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
                <p className="text-neutral-300">Link</p>
                <Input id="url" placeholder="Paste your link" />
            </div>
            <Button type="submit" className="w-full" size="large" variant="blue">
                Shorten
            </Button>
            <div className="flex flex-col gap-2">
                <p className="text-neutral-300">Output</p>
                <CopyToClipboard
                    text={shortened}
                    onCopy={() => toast.success("Copied to clipboard")}
                >
                    <Input id="output" className="h-16 text-xl"
                        value={shortened}
                        readOnly
                    />
                </CopyToClipboard>
            </div>
        </form>
    )
}

export default ShortenForm