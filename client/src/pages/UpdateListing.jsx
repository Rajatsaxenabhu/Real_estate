import { useEffect, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate,useParams } from 'react-router-dom';
export default function UpdateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params=useParams();
  const [uploading, setUploading] = useState(false);
  const [files,setfiles]=useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
 
  const[imageuploadError,setImageuploadError]=useState(false);
  const [formdata,setformdata]=useState({
    imageurl:[],
    name: '',
    description: '',
    address: '',
    type: 'rent',
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });  

  useEffect(()=>{
    const fetchListing=async()=>{
      const listingID = params.listingID;
      const res=await fetch(`/api/listing/getUserData/${listingID}`);
      
      const data=await res.json();
     
      if(data.success===false){
        console.log(data.message);
        return;
      }
      setformdata(data);
      console.log(data);
      
    };
    fetchListing();
  }, []);
  const handleChange = (e) => {
    if (e.target.id === 'sale' || e.target.id === 'rent') {
      setformdata({
        ...formdata,
        type: e.target.id,
      });
    }

    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      setformdata({
        ...formdata,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === 'number' ||
      e.target.type === 'text' ||
      e.target.type === 'textarea'
    ) {
      setformdata({
        ...formdata,
        [e.target.id]: e.target.value,
      });
    }
  };
  const storeImage= async(file)=>{
    return new Promise((resolve,reject)=>{
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          resolve(downloadURL));
        }
    );
  })  
  };
  const handleRemoveImage = (index) => {
    setformdata({
      ...formdata,
      imageurl: formdata.imageurl.filter((_, i) => i !== index),
    });
  };
  const handleimage=(e)=>{
    
    if(files.length>0 && files.length+ formdata.imageurl.length<7){
      setUploading(true);
      setImageuploadError(false);
      const promises=[];
      for(let i=0; i<files.length; i++){
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises).then((urls)=>{
        setformdata({...formdata,
          imageurl:formdata.imageurl.concat(urls),
        });
      setImageuploadError(false);
      setUploading(false);
    }).catch((err)=>{
      setImageuploadError('Image upload failed (2 mb max per image)');
      setUploading(false);
      console.log(err);
    });}
    else{
      setImageuploadError('you only upload 6 images');
      setUploading(false);
    }
  };
  const handleSubmit=async (e)=>{
    e.preventDefault();
    try {
      if (formdata.imageurl.length < 1)
        return setError('You must upload at least one image');
      if (+formdata.regularPrice < +formdata.discountPrice)
        return setError('Discount price must be lower than regular price');
      setError(false);
      setLoading(true);
      const listingID = params.listingID;
      const res=await fetch(`/api/listing/update/${listingID}`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...formdata,userRef: currentUser._id,}),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>
        Update Listing
      </h1>
      <form  onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-1'>
          <input
            type='text'
            placeholder='Name'
            className='border p-3 rounded-lg'
            id='name'
            maxLength='62'
            minLength='10'
            required
            onChange={handleChange}
            value={formdata.name}
          />
          <textarea
            type='text'
            placeholder='Description'
            className='border p-3 rounded-lg'
            id='description'
            required
            onChange={handleChange}
            value={formdata.description}
          />
          <input
            type='text'
            placeholder='Address'
            className='border p-3 rounded-lg'
            id='address'
            required
            onChange={handleChange}
            value={formdata.address}
          />
          <div className='flex gap-6 flex-wrap'>
            <div className='flex gap-2'>
              <input type='checkbox' id='sale' className='w-5' onChange={handleChange}
                checked={formdata.type === 'sale'}/>
              <span>Sell</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='rent' className='w-5' onChange={handleChange}
                checked={formdata.type === 'rent'}/>
              <span>Rent</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='parking' className='w-5' onChange={handleChange}
                checked={formdata.parking}/>
              <span>Parking spot</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='furnished' className='w-5' onChange={handleChange}
                checked={formdata.furnished}/>
              <span>Furnished</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='offer' className='w-5' onChange={handleChange}
                checked={formdata.offer}/>
              <span>Offer</span>
            </div>
          </div>
          <div className='flex flex-wrap gap-6'>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='bedrooms'
                min='1'
                max='10'
                required
                className='p-3 border border-gray-300 rounded-lg'
                onChange={handleChange}
                value={formdata.bedrooms}
              />
              <p>Beds</p>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='bathrooms'
                min='1'
                max='10'
                required
                className='p-3 border border-gray-300 rounded-lg'
                onChange={handleChange}
                value={formdata.bathrooms}
              />
              <p>Baths</p>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='regularPrice'
                min='1000'
                max='100000'
                required
                className='p-3 border border-gray-300 rounded-lg'
                onChange={handleChange}
                value={formdata.regularPrice}
              />
              <div className='flex flex-col items-center'>
                <p>Regular price</p>
                <span className='text-xs'>($ / month)</span>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='discountPrice'
                min='1'
                max='10'
                required
                className='p-3 border border-gray-300 rounded-lg'
              />
              <div className='flex flex-col items-center'>
                <p>Discounted price</p>
                <span className='text-xs'>($ / month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className='font-semibold'>Images:
          <span className='font-normal text-gray-600 ml-2'>The first image will be the cover (max 6)</span>
          </p>
          <div className="flex gap-4">
            <input onChange={(e)=>{setfiles(e.target.files)}} 
              className='p-3 border border-gray-300 rounded w-full' type="file" id='images' accept='image/*' multiple />
            <button type='button' onClick={handleimage} className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>{uploading ? 'Uploading...' : 'Uploads'}</button>
          </div>
          <p className='text-red-700 text-sm'>
            {imageuploadError && imageuploadError}
          </p>
                   {
            formdata.imageurl.length>0 &&  formdata.imageurl.map((url,index)=>(
              <div key={url}
              className='flex justify-between p-3 border items-center'>
                <img
                  src={url}
                  alt='listing image'
                  className='w-20 h-20 object-contain rounded-lg'
                />
                <button
                  type='button'
                  onClick={()=>handleRemoveImage(index)}
                  className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                >
                  Delete
                </button>
              </div>
            ))
          }

          <button
            disabled={loading || uploading}
            className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
          >
            {loading ? 'Creating...' : 'Update Listing'}
          </button>
          {error && <p className='text-red-700 text-sm'>{error}</p>}
        </div>
      </form>
    </main>
  );
}