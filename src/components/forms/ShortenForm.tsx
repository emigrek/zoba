import { FC, useRef, useState } from 'react'
import { Input } from '@/components/ui/Input/Input';
import { Button } from '@/components/ui/Button/Button';
import FormError from '@/components/FormError';
import { api } from '@/utils/api';
import { toast } from 'react-hot-toast';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { env } from "@/env.mjs";
import { TRPCClientError } from '@trpc/client';
import { BiCut } from 'react-icons/bi';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateLinkSchema, createLinkSchema } from "@/validation/link";

const ShortenForm: FC = () => {
    const hcaptchaRef = useRef<HCaptcha>(null);
    const [link, setLink] = useState<string>("");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateLinkSchema>({
        resolver: zodResolver(createLinkSchema)
    });

    const linkContext = api.useContext();
    const { mutateAsync: createLink, data, isLoading } = api.link.create.useMutation({
        onSuccess: () => {
            linkContext.link.invalidate().catch(() => {
                toast.error("Something went wrong during reinvalidation", { icon: '🤔' });
            });
            toast.success("Link shortened successfully", { icon: '🥳' });
        }
    });

    const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
    const shortened = `${origin}/z/${data ? data?.slug : ""}`;

    const onSubmit: SubmitHandler<CreateLinkSchema> = ({ url }) => {
        setLink(url);
        hcaptchaRef.current?.execute();
    };

    const onHCaptchaChange = (token: string) => {
        createLink({ url: link, captcha: token }).catch((error) => {
            if (error instanceof TRPCClientError) {
                const { message } = error;
                toast.error(message, { icon: '🤔' });
            }
        }).finally(() => {
            hcaptchaRef.current?.resetCaptcha();
        });
    }

    const handleClipboard = () => {
        navigator.clipboard.writeText(shortened).catch(() => {
            toast.error("Something went wrong", { icon: '🤔' });
        }).finally(() => {
            toast.success("Copied to clipboard", { icon: '📋' });
        });
    }
    
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
                <p className="text-neutral-400">Link</p>
                <Input id="url" placeholder="Paste your link" {...register("url")} />
                {errors.url && <FormError>{errors.url.message}</FormError>}
            </div>
            <Button loading={isLoading} type="submit" className="w-full" size="large" variant={'accent'} iconRight={BiCut}>
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
                <Input onClick={handleClipboard} id="output" className="h-16 text-xl" value={shortened} readOnly />
            </div>
        </form>
    )
}

export default ShortenForm