
// import './App.css'
import { ChangeEvent, FormEvent, useState } from 'react'
import { ProductCard } from './components/ProductCard/ProductCard'
import Modal from './components/UI/Modal'
import { formInputsList, productList } from './components/data'
import { Button } from './components/UI/Button'
import { Input } from './components/UI/Input'
import { IProduct } from './components/interfaces'

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

  const [product,setProduct] =useState <IProduct>(defaultProductObj)



  const [isOpen, setIsOpen] = useState(false)


  /* ------- HANDEL MODAL ------- */
  function closeModal() {
      setIsOpen(false)
  }

  function openModal() {
      setIsOpen(true)
  }

  const onChangeHandeler = (event : ChangeEvent<HTMLInputElement>) =>{
    const {value,name} =event.target;
    setProduct({
      ...product,
      [name] : value,
    })
  }



  const onSubmitHandler = (e: FormEvent<HTMLFormElement> )=>{
    e.preventDefault()
    console.log(product)
  }

  const onCancel =()=>{
    console.log("Close")
    setProduct(defaultProductObj)
    closeModal()
  }

  /* ------- RENDER ------- */

 

  const renderProduct =productList.map(product => <ProductCard key={product.id} product={product}/>)

  const renderFormInputsList = formInputsList.map(input => (
    <div className='flex flex-col'>
      <label htmlFor={input.id} className='text-gray-700 mb-[1px] text-sm font-medium'>{input.label}</label>
      <Input type={input.type} name={input.name} id={input.id} value={product[input.name]} onChange={onChangeHandeler}/>
    </div>
  ))

  return (



    <main className='container mx-auto'>

     
        <Button className=' bg-indigo-700 w-full' onClick={openModal}>add</Button>
    



      <div className="p-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {renderProduct}
      </div>

      <Modal isOpen={isOpen} closeModal={closeModal} title='Create New Product'>

        <form className='space-y-3' onSubmit={onSubmitHandler}>

          {renderFormInputsList}
            <div  className='flex items-center space-x-3'>
            <Button className=' bg-indigo-700'  >Submit</Button>
            <Button className=' bg-gray-500'  onClick={onCancel}>Cancel</Button>
            </div>

        </form>
      </Modal>
    
    </main>
  )
}

export default App
