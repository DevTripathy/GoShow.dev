import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import BlurCircle from '../components/BlurCircle';
import Navbar from '../components/Navbar';
import goshow from '../assets/goshow.png';
import { User } from 'lucide-react';

const ProfilePage = () => {
    const navigate = useNavigate();
    const { userData, backendUrl, getUserDetails } = useAppContext();
    const [isEditing, setIsEditing] = useState(false);
    const [activeInput, setActiveInput] = useState(null);
    const [formData, setFormData] = useState({
        fullname: '',
        profilePhoto: '',
        address: ''
    });

    useEffect(() => {
        if (userData) {
            setFormData({
                fullname: userData.fullname || '',
                profilePhoto: userData.profilePhoto || '',
                address: userData.address || ''
            });
        }
    }, [userData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`${backendUrl}/api/user/updateprofile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (data.success) {
                toast.success("Profile updated successfully");
                getUserDetails(); // Refresh user data
                setIsEditing(false);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Failed to update profile");
        }
    };

    if (!userData) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    return (
        <>
            <Navbar />
            <div className='flex items-center justify-center min-h-screen bg-gradient-to-b from-black to bg-primary/20 relative'>
                <img src={goshow} alt="" className='absolute left-5 sm:left-20 top-5 w-28 sm:w-42 cursor-pointer' />
                <BlurCircle top="100px" left="100px"/>
                <BlurCircle bottom="0px" left="600px" />
                <div className="w-full max-w-2xl mx-auto bg-black/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border-3 border-primary">
                    <h2 className='text-primary text-4xl font-bold text-center mb-8'>Profile</h2>
                    <div className="flex flex-row gap-8">
                        <div className="flex-shrink-0">
                            {formData.profilePhoto ? (
                                <img
                                    src={formData.profilePhoto}
                                    alt="Profile"
                                    className="w-32 h-32 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center">
                                    <User className="w-16 h-16 text-primary" />
                                </div>
                            )}
                        </div>
                        <div className="flex-1 space-y-4">
                            {isEditing && (
                                <div>
                                    <label className="text-primary text-sm font-medium mb-2 block">Profile Photo URL</label>
                                    <div className={`w-full px-5 py-2.5 rounded-full bg-primary/10 border-2 transition-all duration-200 ${activeInput === 'profilePhoto' ? 'border-primary' : 'border-transparent'}`}>
                                        <input
                                            type="text"
                                            name="profilePhoto"
                                            value={formData.profilePhoto}
                                            onChange={handleChange}
                                            placeholder="Profile Photo URL"
                                            className='bg-transparent outline-none text-white w-full'
                                            onFocus={() => setActiveInput('profilePhoto')}
                                            onBlur={() => setActiveInput(null)}
                                        />
                                    </div>
                                </div>
                            )}

                            <div>
                                <label className="text-primary text-sm font-medium mb-2 block">Full Name</label>
                                {isEditing ? (
                                    <div className={`w-full px-5 py-2.5 rounded-full bg-primary/10 border-2 transition-all duration-200 ${activeInput === 'fullname' ? 'border-primary' : 'border-transparent'}`}>
                                        <input
                                            type="text"
                                            name="fullname"
                                            value={formData.fullname}
                                            onChange={handleChange}
                                            className='bg-transparent outline-none text-white w-full'
                                            onFocus={() => setActiveInput('fullname')}
                                            onBlur={() => setActiveInput(null)}
                                        />
                                    </div>
                                ) : (
                                    <p className='px-5 py-2.5 rounded-full bg-primary/10 text-white'>{userData.fullname}</p>
                                )}
                            </div>
                            <div>
                                <label className="text-primary text-sm font-medium mb-2 block">Address</label>
                                {isEditing ? (
                                    <div className={`w-full px-5 py-2.5 rounded-full bg-primary/10 border-2 transition-all duration-200 ${activeInput === 'address' ? 'border-primary' : 'border-transparent'}`}>
                                        <textarea
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            className='bg-transparent outline-none text-white w-full'
                                            rows="3"
                                            onFocus={() => setActiveInput('address')}
                                            onBlur={() => setActiveInput(null)}
                                        />
                                    </div>
                                ) : (
                                    <p className='px-5 py-2.5 rounded-full bg-primary/10 text-white'>{userData.address || 'Not provided'}</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-between">
                        {isEditing ? (
                            <>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className='px-4 py-2.5 rounded-full font-medium bg-primary-dull/90 text-white cursor-pointer hover:-translate-y-0.5 hover:bg-primary transition-all duration-300'
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    className='px-4 py-2.5 rounded-full font-medium bg-primary-dull/90 text-white cursor-pointer hover:-translate-y-0.5 hover:bg-primary transition-all duration-300'
                                >
                                    Save
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => setIsEditing(true)}
                                className='w-full py-2.5 rounded-full font-medium bg-primary-dull/90 text-white cursor-pointer hover:-translate-y-0.5 hover:bg-primary transition-all duration-300'
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfilePage;
