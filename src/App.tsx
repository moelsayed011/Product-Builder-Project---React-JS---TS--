import { ChangeEvent, FormEvent, useState } from 'react'
import { ProductCard } from './components/ProductCard/ProductCard'
import Modal from './components/UI/Modal'
import { categories, colors, formInputsList, productList } from './components/data'
import { Button } from './components/UI/Button'
import { Input } from './components/UI/Input'
import { IProduct } from './components/interfaces'
import { productValidation } from './validation'
import { ErroeMsg } from './components/UI/ErroeMsg'
import { CircleColor } from './components/UI/CircleColor'
import { v4 as uuid } from "uuid";
import Select from './components/UI/Select'
import { TproductType } from './types'



function App() {

  /* ------- STATE MODAL ------- */
  const defaultProductObj = {
    title: '',
    description: '',
    imageURL: '',
    price: '',
    colors: [],
    category: {
      name: '',
      imageURL: ''
    }

  }


 
  const [products,setProducts ] = useState<IProduct[]>(productList)


  const [errors, setErrors] = useState({ title: "", description: '', imageURL: '', price: '', })

  const [product, setProduct] = useState<IProduct>(defaultProductObj)

  const [selected, setSelected] = useState(categories[0])


  const [tempColor, setTempColor] = useState<string[]>([])

  const[productEdit , setProductEdit] = useState<IProduct>(defaultProductObj)


  const [isOpen, setIsOpen] = useState(false)

  const [isOpenEdit, setIsOpenEdit] = useState(false)









  
  


  /* ------- HANDEL MODAL ------- */

  // {====>>>>> for Add product  <<<<<=====}
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const onChangeHandeler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setProduct({
      ...product,
      [name]: value,
    })

    setErrors({
      ...errors,
      [name]: "",
    })
  }


  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { title, description, price, imageURL } = product
    const errors = productValidation({
      title,
      description,
      imageURL,
      price
    })

    const handelErrors = Object.values(errors).some(value => value == '') && Object.values(errors).every(value => value == '')
    if (!handelErrors) {
      setErrors(errors)
      return;
    }

    // Add new product 
    setProducts(prev => [{ ...product, id: uuid(), colors: tempColor, category: selected }, ...prev])
    setProduct(defaultProductObj)
    setTempColor([])
    closeModal()
    console.log("Data Aready Sending.....")
  }

  const onCancel = () => {
    console.log("Close")
    setProduct(defaultProductObj)
    closeModal()
  }


      //{====>>>>> for Edit product  <<<<<=====}
  function closeEditModal() {
    setIsOpenEdit(false)
  }

  function openEditModal() {
    setIsOpenEdit(true)
  }
  
  const onChangeEditHandeler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setProductEdit({
      ...productEdit,
      [name]: value,
    })

    setErrors({
      ...errors,
      [name]: "",
    })
  }

  const onSubmitEditHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { title, description, price, imageURL } = product
    const errors = productValidation({
      title,
      description,
      imageURL,
      price
    })

    const handelErrors = Object.values(errors).some(value => value == '') && Object.values(errors).every(value => value == '')
    if (!handelErrors) {
      setErrors(errors)
      return;
    }

    // Add new product 
    setProducts(prev => [ {...product ,id: uuid() ,colors: tempColor , category: selected} , ...prev ])
    setProduct(defaultProductObj)
    setTempColor([])
    closeModal()
    console.log("Data Aready Sending.....")
  }

 

  const onCancelEdit = () => {
    setProduct(defaultProductObj)
    closeEditModal()
  }

  /* ------- RENDER ------- */



  const renderProduct = products.map(product => <ProductCard openEditModal={openEditModal}
        setProductEdit={setProductEdit} key={product.id} product={product} />)




  const renderFormInputsList = formInputsList.map(input => (
    <div key={input.id} className='flex flex-col'>
      <label htmlFor={input.id} className='text-gray-700 mb-[1px] text-sm font-medium'>{input.label}</label>
      <Input type={input.type} name={input.name} id={input.id} value={product[input.name]} onChange={onChangeHandeler} />
      <ErroeMsg msg={errors[input.name]} />
    </div>
  ))

  const renderProductEditWithErrorMsg = (id : string , label:string , name :TproductType) =>{
    return (
      <div  className='flex flex-col'>
        <label htmlFor={id} className='text-gray-700 mb-[1px] text-sm font-medium'>{label}</label>
        <Input type={name} name={name} id={id} value={productEdit[name]} onChange={onChangeEditHandeler} />
        <ErroeMsg msg={errors[name]} />
      </div>
    )
  }


  const productCircleColor = colors.map((color) => <CircleColor key={color} color={color}
    onClick={() => {

      // handel repeat color with filter method
      if (tempColor.includes(color)) {
        setTempColor(prev => prev.filter(item => item != color))
        return;
      }
      setTempColor((prev) => [...prev, color])
    }} />)

  return (



    <main className='container mx-auto'>
      <Button className=' bg-indigo-700 w-full' onClick={openModal}>add</Button>




      <div className="p-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {renderProduct}
      </div>


{/* add new product */}
      <Modal isOpen={isOpen} closeModal={closeModal} title='Create New Product'>

        <form className='space-y-3' onSubmit={onSubmitHandler}>

          {renderFormInputsList}

          <div  className='flex space-x-2 items-center' >
            {productCircleColor}
          </div>

          <div className='flex space-x-2 flex-wrap items-center'>
            {tempColor.map((color) =>
              <span className='p-1 mb-2 text-sm text-white rounded-md cursor-pointer' style={{ backgroundColor: color }}>{color}</span>
            )}
          </div>


          <Select selected={selected} setSelected={setSelected}/>


          <div className='flex items-center space-x-3 '>
            <Button className=' bg-indigo-700'  >Submit</Button>
            <Button className=' bg-gray-500' onClick={onCancel}>Cancel</Button>
          </div>

        </form>
      </Modal>



      {/* edit product */}
      <Modal isOpen={isOpenEdit} closeModal={closeEditModal} title='Edit Product'>

        <form className='space-y-3' onSubmit={onSubmitEditHandler}>

          {renderProductEditWithErrorMsg("title", "Product Title", "title")}
          {renderProductEditWithErrorMsg("description", "Product description", "description")}
          {renderProductEditWithErrorMsg("imageURL", "Product imageURL", "imageURL")}
          {renderProductEditWithErrorMsg("price", "Product Price", "price")}

          {/* {renderFormInputsList}

          <div className='flex space-x-2 items-center' >
            {productCircleColor}
          </div>

          <div className='flex space-x-2 flex-wrap items-center'>
            {tempColor.map((color) =>
              <span className='p-1 mb-2 text-sm text-white rounded-md cursor-pointer' style={{ backgroundColor: color }}>{color}</span>
            )}
          </div>


          <Select selected={selected} setSelected={setSelected} /> */}


          <div className='flex items-center space-x-3 '>
            <Button className=' bg-indigo-700'  >Submit</Button>
            <Button className=' bg-gray-500' onClick={onCancelEdit}>Cancel</Button>
          </div>

        </form>
      </Modal>

    </main>
  )
}

export default App

