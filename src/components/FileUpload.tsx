import { Plus } from 'lucide-react'
import type React from 'react'
import { useState } from 'react'

type fileUpload = {
 onFileSelect: (file: File) => void
}

const FileUpload = ({ onFileSelect }: fileUpload) => {

 const [error, setError] = useState("");

 const MAX_FILE_SIZE = 5 * 1024 * 1024;
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
   const selectedFile = event.target.files?.[0]

   if (!selectedFile) return;
   if (selectedFile.size > MAX_FILE_SIZE) {
    setError("File size must not exceed 5MB.")
    return
   }
 
    onFileSelect(selectedFile)
  }
  return (
    <label
     htmlFor='file-upload'
     className='group flex w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-gray-300 p-6 transition-colors duration-200 hover:border-[#0D47A1] hover:bg-blue-200 sm:p-10'
    >
      <div className='flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300 transition-colors duration-200 group-hover:border-[#0D47A1] sm:h-12 sm:w-12'>
       <Plus
        size={20}
        className='text-gray-400 group-hover:text-[#00322D]'
       />
      </div>
      <h3 className='text-base font-bold text-gray-700 transition-colors duration-200 group-hover:text-[#00322D] sm:text-lg'>
       Upload Document backing your reason
      </h3>

      <input 
       id='file-upload'
       type='file'
       accept='.pdf, .doc,.docx, image/*'
       className='hidden'
       onChange={handleFileChange}
      />

      {
       error && (
        <p className='mt-2 text-sm text-red-400'>{error}</p>
       )
      }
    </label>
  )
}

export default FileUpload