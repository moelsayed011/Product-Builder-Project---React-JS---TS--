
// import './App.css'
import { useState } from 'react'
import { ProductCard } from './components/ProductCard/ProductCard'
import Modal from './components/UI/Modal'
import { formInputsList, productList } from './components/data'
import { Button } from './components/UI/Button'
import { Input } from './components/UI/Input'

function App() {
  /* ------- STATE MODAL ------- */

  const [isOpen, setIsOpen] = useState(true)


  /* ------- HANDEL MODAL ------- */
  function closeModal() {
      setIsOpen(false)
  }

  function openModal() {
      setIsOpen(true)
  }


  /* ------- RENDER ------- */
 

  const renderProduct =productList.map(product => <ProductCard key={product.id} product={product}/>)

  const renderFormInputsList = formInputsList.map(input => (
    <div className='flex flex-col'>
      <label htmlFor={input.id} className='text-gray-700 mb-[1px] text-sm font-medium'>{input.label}</label>
      <Input type={input.type} name={input.name} id={input.id}/>
    </div>
  ))

  return (



    <main className='container mx-auto'>

     
        <Button className=' bg-indigo-700 w-full' onClick={openModal}>add</Button>
    



      <div className="p-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {renderProduct}
      </div>

      <Modal isOpen={isOpen} closeModal={closeModal} title='Create New Product'>

        <form className='space-y-3'>

          {renderFormInputsList}
            <div  className='flex items-center space-x-3'>
            <Button className=' bg-indigo-700' >Submit</Button>
            <Button className=' bg-gray-500'>Cancel</Button>
            </div>

        </form>
      </Modal>
    
    </main>
  )
}

export default App
