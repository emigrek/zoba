import { api } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import Spinner from "@/components/ui/Spinner/Spinner";
import { Input } from "@/components/ui/Input/Input";
import { Button } from "@/components/ui/Button/Button";
import { BiEdit } from "react-icons/bi";
import { EditLinkSchema, editLinkSchema } from "@/validation/link";
import FormError from "@/components/FormError";
import { SubmitHandler } from "react-hook-form";
import { TRPCClientError } from "@trpc/client";
import { toast } from "react-hot-toast";
import useEditModal from "@/hooks/useEditModal";

interface EditFormProps {
    id: string;
}

const EditForm: FC<EditFormProps> = ({ id }) => {
    const { setIsOpen } = useEditModal();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<EditLinkSchema>({
        resolver: zodResolver(editLinkSchema)
    });

    const { data: link, isLoading } = api.link.getById.useQuery({ id });

    const linkContext = api.useContext();
    const { mutateAsync: editLink } = api.link.edit.useMutation({
        onSuccess: () => {
            linkContext.link.invalidate();
            toast.success("Link edited successfully", { icon: '🥳' });
            setIsOpen(false);
        }
    });

    useEffect(() => {
        if (!link) return;

        setValue("id", link.id);
        setValue("url", link.url);
        setValue("slug", link.slug);
    }, [link, isLoading]);

    const onSubmit: SubmitHandler<EditLinkSchema> = async ({ id, url, slug }) => {
        try {
            await editLink({ id, url, slug });
        } catch (error) {
            if (error instanceof TRPCClientError) {
                const { message } = error;
                toast.error(message, { icon: '🤔' });
            }
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col md:flex-row gap-5 flex-grow justify-center py-10">
                <Spinner className="w-8 h-8" />
            </div>
        )
    }

    if (!link) {
        return (
            <div className="flex flex-col gap-2 flex-grow justify-center items-center py-10">
                <p className="text-3xl">😨</p>
                <p className="text-red-500">Link not found</p>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
                <p className="text-neutral-400">Link</p>
                <Input id="url" placeholder="Paste your link" {...register("url")} />
                {errors.url && <FormError>{errors.url.message}</FormError>}
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-neutral-400">Slug</p>
                <Input id="slug" placeholder="Choose your slug" {...register("slug")} />
                {errors.slug && <FormError>{errors.slug.message}</FormError>}
            </div>
            <div className="flex justify-end items-center mt-3 gap-2">
                <Button onClick={() => setIsOpen(false)} type="button" size={'large'} variant={'transparent'}>
                    Cancel
                </Button>
                <Button className="w-32" type="submit" size={'large'} variant={'accent'} iconRight={BiEdit}>
                    Edit
                </Button>
            </div>
        </form>
    )
};

export default EditForm;