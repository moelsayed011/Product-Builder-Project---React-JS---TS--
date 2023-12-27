/**
 * 
 * @param {string} text  - The input text to be sliced.
 * @param {number} [max=60] - The maximum length of the sliced text. Default is 60.
 * @returns  - is used to document the return value of the function. In this case,The sliced text. indicates that the function returns a string.
 */

export function textSlice(text:string ,max:number=60){
    if (text.length >= max) return `${text.slice( 0,max)}.....`
    return text

}