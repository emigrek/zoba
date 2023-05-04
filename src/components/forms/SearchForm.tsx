import { FC } from 'react'
import FormError from '@/components/FormError';
import { Input } from '@/components/ui/Input/Input';
import { Button } from '@/components/ui/Button/Button';
import { SearchSchema, searchSchema } from '@/validation/search';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useSearchModal from '@/hooks/useSearchModal';
import { BiSearch } from 'react-icons/bi';

const SearchForm: FC = () => {
    const { setIsOpen, setQuery } = useSearchModal();
    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors },
    } = useForm<SearchSchema>({
        resolver: zodResolver(searchSchema)
    });

    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter') return;
        e.preventDefault();
        setIsOpen(false);
        setQuery(getValues('query'));
        setValue('query', '');
    }

    const onSubmit: SubmitHandler<SearchSchema> = ({query}) => {
        setIsOpen(false);
        setQuery(query);
        setValue('query', '');
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
                <p className="text-neutral-400">Query</p>
                <Input id="query" placeholder="Enter search phrase" onKeyDown={(e) => handleEnter(e)} {...register("query")} />
                {errors.query && <FormError>{errors.query.message}</FormError>}
            </div>
            <div className="flex justify-end items-center mt-3 gap-2">
                <Button onClick={() => setIsOpen(false)} type="button" size={'large'} variant={'transparent'}>
                    Cancel
                </Button>
                <Button
                    variant="accent"
                    className='w-32'
                    size={'large'}
                    iconRight={BiSearch}
                >
                    Search
                </Button>
            </div>
        </form>
    )
}

export default SearchForm