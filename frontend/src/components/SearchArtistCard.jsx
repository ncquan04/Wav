import axios from "axios";
import { useState } from "react";
import { HiOutlineCheckCircle, HiOutlinePlusCircle, HiOutlineXCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SearchArtistCard = ({artist}) => {
    const { user } = useSelector(state => state.auth);
    const [ added, setAdded ] = useState(false);
    const [ errorAdd, setErrorAdd ] = useState(false);

    const handleClick = async (artistId) => {
        try {
            await axios.post('http://localhost:5000/artists/add', { userId: user.id, artistId });
            setAdded(true);
            setTimeout(() => {
                setAdded(false);
            }, 3000);
        } catch (error) {
            setErrorAdd(true);
            setTimeout(() => {
                setErrorAdd(false);
            }, 3000);
        }
    }

    return (
        <div className="flex flex-col w-[250px] h-80 p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
            <div className={`h-full flex flex-col justify-between ${(added || errorAdd) ? 'hidden' : ''}`}>
                <Link to={`/artists/${artist?.adamid}`}>
                    <img alt="artist" src={artist?.avatar} className="w-full h-60 rounded-lg" />
                </Link>
                <div className="flex flex-row justify-between">
                    <Link className="w-[80%] mt-auto" to={`/artists/${artist?.adamid}`}>
                        <p className="font-semibold text-lg text-white truncate">{artist?.name}</p>
                    </Link>
                    <HiOutlinePlusCircle className="text-2xl text-gray-500 hover:text-white mt-auto" onClick={() => handleClick(artist.adamid)} />
                </div>
            </div>
            <div className={`flex flex-col justify-center items-center h-full ${(added) ? '' : 'hidden'} animate-slowfade`}>
                <HiOutlineCheckCircle className="text-4xl text-green-500 mb-4" />
                <p className="text-green-500 text-xl font-bold">Added to your <br/> favorite artists!</p>
            </div>
            <div className={`flex flex-col justify-center items-center h-full ${(errorAdd) ? '' : 'hidden'} animate-slowfade`}>
                <HiOutlineXCircle className="text-4xl text-red-500 mb-4" />
                <p className="text-red-500 text-center text-xl font-bold">You have already <br/> had this artist <br/> in your favorites</p>
            </div>
        </div>
    )
}

export default SearchArtistCard;