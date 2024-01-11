
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
}


export const ProductCard = ({product,setProductEdit,  openEditModal }:IProps) => {
    const { description, title, imageURL, price, colors } = product

    const productCircleColor = colors.map((color) => <CircleColor key={color} color={color}/>)




    const onEdit =()=>{
        setProductEdit(product)
        openEditModal()
    }



    return<>
        <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 border rounded-md p-2 flex flex-col space-y-3" >
            <Image imageURL={imageURL} alt={'product name'} className="rounded-md mb-2" />
            <h3>{title}</h3>
            <p>
                {textSlice(description)}
            </p> 
            <div className='flex space-x-2 items-center' >
                {productCircleColor}
            </div>
            <div  className='flex justify-between items-center'>
                <span>${price}</span>
                <Image imageURL={imageURL} alt={"product_name"} className='w-10 h-10 rounded-full  object-center'/>
            </div>
                <div className=' flex items-center justify-between space-x-2'>
                    <Button className=' bg-indigo-600' onClick={onEdit}>Edit</Button>
                    <Button className=' bg-red-700 '>Delete</Button>
                </div>
        </div>
    </>
}