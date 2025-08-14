import { useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const AddScholarship = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        { method: 'POST', body: formData }
      );
      const data = await res.json();
      if (data.success) {
        setImage(data.data.url);
        toast.success('Image uploaded!');

      }
    } catch (err) {
      Swal.fire('Error', 'Image upload failed!', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
     
if (!image) {
  console.log('No image uploaded yet');
  return Swal.fire('Error', 'Please upload an image before submitting.', 'warning');
}

    const newScholarship = {
      scholarshipName: form.scholarshipName.value,
      universityName: form.universityName.value,
      universityImage: image,
      universityCountry: form.country.value,
      universityCity: form.city.value,
      universityRank: form.rank.value,
      subjectCategory: form.subjectCategory.value,
      scholarshipCategory: form.scholarshipCategory.value,
      degree: form.degree.value,
      tuitionFees: form.tuitionFees.value,
      applicationFees: parseFloat(form.applicationFees.value),
      serviceCharge: parseFloat(form.serviceCharge.value),
      applicationDeadline: form.deadline.value,
      postDate: form.postDate.value,
      postedBy: user.email,
      description: form.description.value,
    };

    try {
      await axiosSecure.post('/new-scholarship', newScholarship);
      Swal.fire('🎉 Added!', 'Scholarship added successfully.', 'success');
      form.reset();
      setImage('');
    } catch (err) {
      Swal.fire('Error', 'Failed to add scholarship.', 'error');
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 mt-10 bg-white rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-bold text-center mb-8 text-red-950">
        Add Scholarship
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input fields with border */}
        {[
          ['scholarshipName', 'Scholarship Name'],
          ['universityName', 'University Name'],
          ['country', 'University Country'],
          ['city', 'University City'],
          ['rank', 'University World Rank'],
          ['tuitionFees', 'Tuition Fees (Optional)'],
          ['applicationFees', 'Application Fees'],
          ['serviceCharge', 'Service Charge'],
        ].map(([name, label]) => (
          <div key={name} className="flex flex-col">
            <label className="mb-1 font-semibold text-gray-700">{label}</label>
            <input
              name={name}
              type={name.includes('Fees') || name === 'rank' ? 'number' : 'text'}
              required={!label.includes('Optional')}
              className="input border border-gray-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-200 rounded px-4 py-2"
              placeholder={label}
            />
          </div>
        ))}

        {/* Dropdowns */}
        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-gray-700">Subject Category</label>
          <select name="subjectCategory" required className="select border border-gray-300 rounded px-4 py-2">
            <option value="">Select Category</option>
            <option value="Agriculture">Agriculture</option>
            <option value="Engineering">Engineering</option>
            <option value="Doctor">Doctor</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-gray-700">Scholarship Category</label>
          <select name="scholarshipCategory" required className="select border border-gray-300 rounded px-4 py-2">
            <option value="">Select</option>
            <option value="Full fund">Full fund</option>
            <option value="Partial">Partial</option>
            <option value="Self-fund">Self-fund</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-gray-700">Degree</label>
          <select name="degree" required className="select border border-gray-300 rounded px-4 py-2">
            <option value="">Select Degree</option>
            <option value="Diploma">Diploma</option>
            <option value="Bachelor">Bachelor</option>
            <option value="Masters">Masters</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-gray-700">Application Deadline</label>
          <input type="date" name="deadline" required className="input border border-gray-300 rounded px-4 py-2" />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-gray-700">Scholarship Post Date</label>
          <input type="date" name="postDate" required className="input border border-gray-300 rounded px-4 py-2" />
        </div>

        {/* Description Field */}
        <div className="md:col-span-2 flex flex-col">
          <label className="mb-1 font-semibold text-gray-700">Description</label>
          <textarea
            name="description"
            required
            rows={4}
            placeholder="Enter scholarship description"
            className="textarea border border-gray-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-200 rounded px-4 py-2 resize-none"
          ></textarea>
        </div>

        {/* Image Upload */}
        <div className="md:col-span-2">
          <label className="font-semibold text-gray-700 mb-2 block">Upload University Image</label>
          <div className="flex items-center gap-4">
            <input
              type="file"
             accept="image/*"
              id="upload"
              onChange={handleImageUpload}
              className="hidden"
            />
            <label
              htmlFor="upload"
              className="cursor-pointer px-6 py-2 rounded-md font-medium bg-gradient-to-r from-amber-600 to-red-950 text-white transition-transform transform hover:scale-105 shadow-lg"
            >
              {uploading ? 'Uploading...' : 'Upload Image'}
            </label>
            {image && <img src={image} className="w-16 h-16 rounded border shadow" />}
          </div>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 mt-6 text-center">
          <button
            type="submit"
            // disabled={!image || uploading}
            className="px-8 py-3 rounded-lg text-white text-lg font-semibold bg-gradient-to-r from-amber-500 to-amber-700  hover:from-red-950 hover:to-red-900 transition-all duration-300 shadow-lg cursor-pointer"
          >
            Add Scholarship
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddScholarship;
