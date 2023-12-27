import { ButtonHTMLAttributes, ReactNode } from "react"

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
children : ReactNode;
className?: string;
}


export const Button = ({children ,className, ...rest } : IProps) => {
    console.log(rest)
    
    return<>

        <button {...rest}  className={`${className} p-2 flex-1 rounded-md text-white`}  >
            {children}
        </button>
    </>
}