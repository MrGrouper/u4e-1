import { useState } from 'react'
import { uploadImage } from '../../helpers/api-communicator'

//@ts-expect-error jdfka
const Avatar = (props: {
    currentUser: any
}) => {

    const [file, setFile] = useState<any>()

    function handleChange(event) {
      setFile(event.target.files[0])
    }
    
    const handleSubmit = async(event) => {
      event.preventDefault()
      const formData = new FormData();
      if (file){
      formData.append('file', file);
      formData.append('fileName', file.name);
      try {
        await uploadImage(formData)
      }
      catch{
        console.log('error uploading image')
      }
    }
}

  return (
    <div className="App">
    <form onSubmit={handleSubmit}>
      <h1>React File Upload</h1>
      <input type="file" onChange={handleChange}/>
      <button type="submit">Upload</button>
    </form>
</div>
);
}

export default Avatar