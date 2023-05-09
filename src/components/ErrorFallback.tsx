import { FC } from "react";
import { RxReload } from "react-icons/rx";
import cn from "@/utils/cn";

interface ErrorFallbackProps {
    reload?: () => void;
}

const ErrorFallback: FC<ErrorFallbackProps> = ({ reload }) => {
    const handleReload = () => {
        reload && reload();
    }

    return (
        <a onClick={handleReload} className={cn(reload && "cursor-pointer", "flex flex-col items-center justify-center bg-red-400/10 rounded-lg py-3 grow h-full")}>
            <div className="text-red-400 font-semibold">Couldn&apos;t fetch this data</div>
            {reload ? (
                <div className="flex gap-2 text-sm items-center text-red-400/60">
                    Click to reload
                    <RxReload className="w-4 h-4" />
                </div>
            ) : null}
        </a>
    )
};

export default ErrorFallback;
