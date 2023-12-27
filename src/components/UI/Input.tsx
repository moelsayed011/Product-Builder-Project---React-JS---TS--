import { InputHTMLAttributes } from "react"

interface IProps extends InputHTMLAttributes<HTMLInputElement>  {

}


export const Input = ({...rest} : IProps) => {
    return(

    <input type="text" name="title" id="title" 
    className='border-[1px] border-gray-300 shadow-md focus:border-indigo-500 focus:outline-none focus:ring-1
    px-3 py-3 rounded-md text-md focus:ring-indigo-500' 
    {...rest}/>
    ) 
    
    
}