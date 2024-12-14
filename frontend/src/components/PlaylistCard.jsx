import { logo } from "../assets";
import { Link } from "react-router-dom";
import { HiTrash } from "react-icons/hi";
import axios from "axios";
import { useState } from "react";

const PlaylistCard = ({ playlist, user, setPlaylists }) => {
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        try {
            await axios.post(`http://localhost:5000/playlists/delete`, { playlistId: playlist.id, userId: user.id });
            const response = await axios.post('http://localhost:5000/playlists', { userId: user.id });
            setPlaylists(response.data.playlists);
        } catch (error) {
            setError(error.response?.data?.message || 'Something went wrong');
        }
    }

    return (
        <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
            <div className="flex justify-center items-center w-full h-56 group">
                <Link to={`/playlists/${playlist?.id}`}>
                    <img alt="playlist_img" src={logo} className="object-contain"/>
                </Link>
            </div>
            <div className="mt-4 flex flex-row justify-between">
                <Link to={`/playlists/${playlist?.id}`} className="flex-1">
                    <p className="font-semibold text-lg text-white truncate hover:underline">
                        {playlist.name}
                    </p>
                </Link>
                <HiTrash className="w-6 h-6 text-gray-500 opacity-30" onClick={handleDelete}/>
            </div>
        </div>
    )
};

export default PlaylistCard;