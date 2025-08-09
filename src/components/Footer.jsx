import React from 'react'

const Footer = () => {
    return (
        <div className='bg-blue-900 text-white flex flex-col justify-center items-center  w-full'>
            <div className="logo font-bold text-white text-2xl">
                <span className='text-green-500'> &lt;</span>

                <span>Pass</span><span className='text-green-500'>OP/&gt;</span>


            </div>
            <div className='flex justify-center items-center'> Created <img className='w-7 mx-2' src="icons/hacker.jpeg" alt="" /> by RahulMahale </div>
        </div>
    )
}

export default Footer
