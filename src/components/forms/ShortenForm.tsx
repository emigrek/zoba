import { FC, useRef, useState } from 'react'
import { Input } from '@/components/ui/Input/Input';
import { Button } from '@/components/ui/Button/Button';
import { createLinkSchema } from "@/schema/link";
import { ZodError } from "zod";
import { useMemo } from "react";
import { api } from '@/utils/api';
import { toast } from 'react-hot-toast';

// @ts-ignore
import { CopyToClipboard } from 'react-copy-to-clipboard';
import HCaptcha from '@hcaptcha/react-hcaptcha';

import { env } from "@/env.mjs";
import { TRPCClientError } from '@trpc/client';
import { BiCut } from 'react-icons/bi';

interface ShortenFormProps { }

const ShortenForm: FC<ShortenFormProps> = ({ }) => {
    const hcaptchaRef = useRef<HCaptcha>(null);
    const [link, setLink] = useState<string>("");
    const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';

    const linkContext = api.useContext();
    const { mutateAsync: createLink, data } = api.link.create.useMutation({
        onSuccess: () => {
            linkContext.link.getInfinite.invalidate();
            toast.success("Link shortened successfully");
        }
    });

    const shortened = useMemo(() => `${origin}/z/${data ? data?.slug : ""}`, [data, origin]);

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
            }
            return;
        }

        setLink(url);
        hcaptchaRef.current?.execute();
    };

    const onHCaptchaChange = async (token: string) => {
        try {
            await createLink({ url: link, captcha: token });
        } catch (error) {
            if (error instanceof TRPCClientError) {
                const { message } = error;
                toast.error(message);
            }
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
                <p className="text-neutral-400">Link</p>
                <Input id="url" placeholder="Paste your link" />
            </div>
            <Button type="submit" className="w-full" size="large" variant={'accent'} iconRight={BiCut}>
                Shorten
            </Button>
            <HCaptcha
                size="invisible"
                ref={hcaptchaRef}
                sitekey={env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY}
                onVerify={onHCaptchaChange}
            />
            <div className="flex flex-col gap-2">
                <p className="text-neutral-400">Output</p>
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