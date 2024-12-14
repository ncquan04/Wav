import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Error, Loader } from '../components';
import PlaylistCard from '../components/PlaylistCard';
import { HiOutlinePlusCircle } from "react-icons/hi";

const Playlists = () => {
    const { user } = useSelector((state) => state.auth);
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [playlistNameError, setPlaylistNameError] = useState(false);
    const [isCreatingPlaylist, setIsCreatingPlaylist] = useState(false);
    const [form, setForm] = useState({ name: '' });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name) {
            setPlaylistNameError(true);
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/playlists/create', { userId: user.id, name: form.name });
            setPlaylists([...playlists, response.data.playlist]);
            setIsCreatingPlaylist(false);
            setForm({ name: '' });
        } catch (error) {
            setError(error.response?.data?.message || 'Something went wrong');
        }
    }

    const handleCancel = () => {
        setIsCreatingPlaylist(false);
        setForm({ name: '' });
    }

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                setLoading(true);
                const response = await axios.post('http://localhost:5000/playlists', { userId: user.id, name: form.name });
                setPlaylists(response.data.playlists);
                setLoading(false);
            } catch (error) {
                setError(error.response?.data?.message || 'Something went wrong');
                setLoading(false);
            }
        };
        fetchPlaylists();
    }, []);

    if (loading) {
        return <Loader title='Loading playlists...' />
    }

    if (error) {
        return <Error />
    }

    return (
        <div className="flex flex-col" onClick={handleCancel}>
            <div className="flex flex-wrap gap-4 mt-10" onClick={(e) => e.stopPropagation()}>
                {playlists.map((playlist) => (
                    <PlaylistCard
                        key={playlist.id}
                        playlist={playlist}
                        user={user}
                        setPlaylists={setPlaylists}
                    />
                ))}
                <div className='flex flex-col justify-center items-center w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer'>
                    <div className={`h-[250px] flex flex-col justify-center items-center ${isCreatingPlaylist ? '' : 'hidden'}`}>
                        <div className={`text-base font-semibold mb-4 text-red-500 ${playlistNameError ? '' : 'hidden'}`}>Playlists name is required</div>
                        <form>
                            <input
                                type='text'
                                name='name'
                                value={form.name}
                                placeholder='Playlist name'
                                className='w-full p-2 mb-4 rounded-lg'
                                onChange={handleChange}
                            />
                            <button
                                type='submit'
                                className='w-full p-2 font-semibold bg-cyan-400 text-white rounded hover:opacity-70 mb-4'
                                onClick={handleSubmit}
                            >
                                Create
                            </button>
                            <button
                                type='button'
                                className='w-full p-2 font-semibold bg-red-400 text-white rounded hover:opacity-70'
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                    <div className={`h-[250px] flex flex-col justify-center items-center ${isCreatingPlaylist ? 'hidden' : ''}`} onClick={() => setIsCreatingPlaylist(true)}>
                        <HiOutlinePlusCircle className='w-8 h-8 opacity-80 text-white mb-2' />
                        <span className='text-white font-semibold text-xl'>Create new playlist</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Playlists;