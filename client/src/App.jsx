import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'

import { logo } from './assets'
import { Home, CreatePost } from './pages'



function App() {
        return (
                <BrowserRouter>
                        <header className='w-full flex
                        justify-between items-center bg-white 
                        sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]'>
                                <Link to='/' >
                                        <img src={logo} alt='Logo' className='w-28 object-contain' />
                                </Link>
                                <Link to='/create-post' className='font-inter font-medium
                                bg-[#e56f56] text-white px-4 py-2 
                                rounded-md transition-transform duration-150 ease-in-out
                                hover:scale-105'>Create</Link>
                        </header>
                        <main className='sm:p-8 px-4 px-8
                        w-full bg-[#f9fafe] min-h-[clac(100vh-73px)]'>
                                <Routes>
                                        <Route path='/' element={<Home />} />
                                        <Route path='/create-post' element={<CreatePost />} />
                                </Routes>
                        </main>
                </BrowserRouter>
        )
}

export default App