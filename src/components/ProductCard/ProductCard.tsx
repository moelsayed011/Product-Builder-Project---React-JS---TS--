
import { textSlice } from '../../utils/functin';
import { Image } from '../Image/Image'
import { Button } from '../UI/Button'
import { CircleColor } from '../UI/CircleColor';
// import { CircleColor } from '../UI/CircleColor';
import { IProduct } from '../interfaces'
interface IProps {
product : IProduct;
setProductEdit:(product : IProduct) => void;
    openEditModal : () => void
    idx :number
    setProductEditIdx : (value: number) => void
    openConfirmModal: ( ) => void
}


export const ProductCard = ({ product, setProductEdit, openEditModal, setProductEditIdx, idx , openConfirmModal }:IProps) => {
    const { description, title, imageURL, price, colors, category } = product

    const productCircleColor = colors.map((color) => <CircleColor key={color} color={color}/>)




    const onEdit =()=>{
        setProductEdit(product)
        openEditModal()
        setProductEditIdx(idx)
    }

    const removeProduct =() => {
        setProductEdit(product)
        openConfirmModal()
    }

    return<>
        <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 border rounded-md p-2 flex flex-col space-y-3" >
            <Image imageURL={imageURL} alt={'product name'} className="rounded-md mb-2" />
            <h3>{title}</h3>
            <p>
                {textSlice(description)}
            </p> 


            <div className='flex space-x-2 items-center' >
                {colors.length ? productCircleColor : <p className="min-h-[20px]">Not available colors!</p>}
            </div>



            <div  className='flex justify-between items-center'>
                <span className='text-lg text-indigo-600 font-semibold'>${price}</span>
                <div className="flex items-center space-x-2">
                    <span className="text-xs font-semibold">{category.name}</span>
                    <Image imageURL={category.imageURL} alt={category.name} className="w-10 h-10 rounded-full object-bottom" />
                </div>
            </div>
                <div className=' flex items-center justify-between space-x-2'>
                    <Button className=' bg-indigo-600' onClick={onEdit}>Edit</Button>
                    <Button className=' bg-red-700 ' onClick={removeProduct}>Delete</Button>
                </div>
        </div>
    </>
}