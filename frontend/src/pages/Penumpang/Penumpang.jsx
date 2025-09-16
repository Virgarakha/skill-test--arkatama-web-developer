import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../../components/Sidebar';

const API_BASE_URL = 'http://localhost:8000/api';

const Penumpang = () => {
  const [data, setData] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [availableTravels, setAvailableTravels] = useState([]);
  const [formData, setFormData] = useState({
    penumpang_data: '',
    jenis_kelamin: '',
    id_travel: ''
  });




  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/v1/penumpang`);
        setData(response.data);
      } catch (error) {
        alert('Gagal memuat data: ' + (error.response?.data?.message || error.message));
      }
    };




    
    const fetchAvailableTravels = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/v1/travel`);
        setAvailableTravels(response.data);
      } catch (error) {
        console.log('Gagal memuat data travel:', error);
      }
    };

    fetchData();
    fetchAvailableTravels();
  }, []);




  const handleEdit = (item) => {
    setEditingData(item);
    setFormData({
      penumpang_data: `${item.nama} ${item.usia} ${item.kota}`,
      jenis_kelamin: item.jenis_kelamin,
      id_travel: item.id_travel.toString()
    });
    setIsEditModalOpen(true);
  };




  const handleCreate = () => {
    setFormData({
      penumpang_data: '',
      jenis_kelamin: '',
      id_travel: ''
    });
    setIsCreateModalOpen(true);
  };




  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      try {
        await axios.delete(`${API_BASE_URL}/v1/penumpang/${id}`);
        setData(data.filter(item => item.id !== id));
        alert('Data berhasil dihapus');
      } catch (error) {
        alert('Gagal menghapus data: ' + (error.response?.data?.message || error.message));
      }
    }
  };




  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    
    const penumpangParts = formData.penumpang_data.trim().split(' ');
    if (penumpangParts.length < 3) {
      alert('Format penumpang tidak valid. Gunakan format: NAMA USIA KOTA');
      return;
    }
    
    const usia = penumpangParts[penumpangParts.length - 2];
    const kota = penumpangParts[penumpangParts.length - 1];
    const nama = penumpangParts.slice(0, -2).join(' ');
    
    if (isNaN(usia)) {
      alert('Usia harus berupa angka');
      return;
    }

    const updateData = {
      nama,
      usia: parseInt(usia),
      kota,
      jenis_kelamin: formData.jenis_kelamin,
      id_travel: parseInt(formData.id_travel)
    };

    try {
      const response = await axios.put(`${API_BASE_URL}/v1/penumpang/${editingData.id}`, updateData);
      
      setData(data.map(item => 
        item.id === editingData.id 
          ? { ...item, ...updateData }
          : item
      ));
      
      setIsEditModalOpen(false);
      setEditingData(null);
      alert('Data berhasil diperbarui');
    } catch (error) {
      alert('Gagal memperbarui data: ' + (error.response?.data?.message || error.message));
    }
  };




  const handleSubmitCreate = async (e) => {
    e.preventDefault();
    
    const penumpangParts = formData.penumpang_data.trim().split(' ');
    if (penumpangParts.length < 3) {
      alert('Format penumpang tidak valid. Gunakan format: NAMA USIA KOTA');
      return;
    }
    
    const usia = penumpangParts[penumpangParts.length - 2];
    const kota = penumpangParts[penumpangParts.length - 1];
    const nama = penumpangParts.slice(0, -2).join(' ');
    
    if (isNaN(usia)) {
      alert('Usia harus berupa angka');
      return;
    }

    const createData = {
      nama,
      usia: parseInt(usia),
      kota,
      jenis_kelamin: formData.jenis_kelamin,
      id_travel: parseInt(formData.id_travel)
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/v1/penumpang`, createData);
      
      setData([...data, response.data.penumpang]);
      
      setIsCreateModalOpen(false);
      alert('Data berhasil ditambahkan');
      window.location.reload();
    } catch (error) {
      alert('Gagal menambahkan data: ' + (error.response?.data?.message || error.message));
    }
  };





  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };




  const closeModal = () => {
    setIsEditModalOpen(false);
    setIsCreateModalOpen(false);
    setEditingData(null);
  };




  return (
    <div className="flex w-full items-start">
      <div className="fixed">
        <Sidebar/>
      </div>
      <div className="w-[14%]"></div>
       
      <div className='w-[85%] p-5 py-8 '>
        <h1 className='font-bold text-2xl'>Daftar Penumpang</h1>
        <p className='mb-10'>Semua Data Penumpang yang terdaftar</p>
        <button 
          className='bg-blue-800 text-white p-2 rounded-lg px-4'
          onClick={handleCreate}
        >
          Tambah Penumpang
        </button>
        
        <ul className='grid grid-cols-4 gap-5 w-full mt-5'>
          {data.map(item => (
            <li key={item.id} className="flex flex-col w-full bg-white border border-[#cecece] p-5 rounded-2xl relative">
              <div className="absolute top-3 right-5 flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors"
                >
                  Hapus
                </button>
              </div>              
              <div className="flex flex-col w-full bg-gray-100 p-5 mt-7 rounded-2xl">
                <h1 className='font-bold text-2xl text-[#4a638c]'>{item.travel.nama}</h1>
                <div className="flex flex-col">
                  <p className='text-slate-600 text-sm mt-5'>Tanggal Keberangkatan</p>
                  <p className='font-bold text-xl text-[#444]'>{item.travel.tanggal_keberangkatan}</p>
                  <p className='text-slate-600 text-sm mt-5'>Kode Booking</p>
                  <p className='font-bold text-xl text-[#444]'>{item.kode_booking}</p>
                </div>
              </div>
              
              <div className="p-5 py-2">
                <p className='text-slate-600 text-sm mt-5'>Data Penumpang</p>
                <h1>{item.nama}, {item.jenis_kelamin}, Usia {item.usia}</h1>
                <p className='text-slate-600 text-sm mt-5'>Kota Penumpang</p>
                <h1>{item.kota}</h1>
                <p className='text-slate-600 text-sm mt-5'>Tahun Lahir Penumpang</p>
                <h1>{item.tahun_lahir}</h1>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {isEditModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0000008c]  bg-opacity-50 flex items-center justify-center z-50"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 25,
                duration: 0.3
              }}
              className="bg-white rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Data Penumpang</h2>
              
              <form onSubmit={handleSubmitEdit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Data Penumpang
                  </label>
                  <input
                    type="text"
                    name="penumpang_data"
                    value={formData.penumpang_data}
                    onChange={handleInputChange}
                    placeholder="Contoh: Budi Santoso 25 Jakarta"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Format: NAMA USIA KOTA</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Jenis Kelamin
                  </label>
                  <select
                    name="jenis_kelamin"
                    value={formData.jenis_kelamin}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Pilih Jenis Kelamin</option>
                    <option value="Laki - Laki">Laki - Laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Travel
                  </label>
                  <select
                    name="id_travel"
                    value={formData.id_travel}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Pilih Travel</option>
                    {availableTravels.map(travel => (
                      <option key={travel.id} value={travel.id}>
                        {travel.nama} (Sisa kuota: {travel.kuota_tersisa})
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Hanya menampilkan travel yang masih ada kuota</p>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-4 py-3 bg-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-400 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Simpan
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCreateModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0000008c] bg-opacity-50 flex items-center justify-center z-50"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 25,
                duration: 0.3
              }}
              className="bg-white rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Tambah Data Penumpang</h2>
              
              <form onSubmit={handleSubmitCreate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Data Penumpang
                  </label>
                  <input
                    type="text"
                    name="penumpang_data"
                    value={formData.penumpang_data}
                    onChange={handleInputChange}
                    placeholder="Contoh: Budi Santoso 25 Jakarta"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Format: NAMA USIA KOTA</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Jenis Kelamin
                  </label>
                  <select
                    name="jenis_kelamin"
                    value={formData.jenis_kelamin}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Pilih Jenis Kelamin</option>
                    <option value="Laki - Laki">Laki - Laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Travel
                  </label>
                  <select
                    name="id_travel"
                    value={formData.id_travel}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Pilih Travel</option>
                    {availableTravels.map(travel => (
                      <option key={travel.id} value={travel.id}>
                        {travel.nama} (Sisa kuota: {travel.kuota})
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Hanya menampilkan travel yang masih ada kuota</p>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-4 py-3 bg-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-400 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                  >
                    Tambah
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Penumpang;