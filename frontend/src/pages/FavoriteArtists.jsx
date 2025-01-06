import { useSelector } from "react-redux";
import { ArtistCard, Loader } from "../components";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { HiTrash } from "react-icons/hi";

const FavoriteArtists = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const [ artistIds, setArtistIds ] = useState([]);
    const [ artistDetails, setArtistDetails ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                setLoading(true);
                const idsResponse = await axios.post("http://localhost:5000/artists", { userId: user.id });
                const ids = idsResponse.data.artists;
                setArtistIds(ids);
                if (ids.length > 0) {
                    const requests = ids.map((artistId) => {
                        const id = artistId.artist_id;
                        return axios.get(`https://shazam.p.rapidapi.com/artists/get-details`, {
                            params: { id, l: 'en-US' },
                            headers: {
                                'x-rapidapi-key': 'ebc1f87bd7msh5a264a4fc705584p14dae2jsn53f1c632fed3',
                                'x-rapidapi-host': 'shazam.p.rapidapi.com'
                            }
                        });
                    });
                    const responses = await Promise.all(requests);
                    setArtistDetails(responses.map(response => response.data));
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        fetchArtists();
    }, []);

    const handleDeleteArtist = async (artistId) => {
        try {
            const response = await axios.post("http://localhost:5000/artists/delete", { artistId, userId: user.id });
            if (response.data.success) {
                const updatedArtists = artistDetails.filter((artistDetail) => artistDetail.data[0].id !== artistId);
                setArtistDetails(updatedArtists);
            }
        } catch (error) {
            console.log(error);
        }
    }

    if (loading) {
        return (
            <Loader title="Loading favorite artists..." />
        )
    }

    if (!loading && artistDetails.length === 0) {
        return (
            <div className="flex justify-center items-center h-full mt-4">
                <p className="text-white text-2xl font-bold">You haven't add any favorite artists yet</p>
            </div>
        )
    }

    return (
        <div className="flex flex-row flex-wrap gap-8">
            {artistDetails.map((artistDetail, index) => (
                <div 
                    key={index}
                    className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer" 
                >
                    <Link to={`/artists/${artistDetail.data[0].id}`}>
                        <img alt="artist" src={artistDetail?.data[0]?.attributes?.artwork?.url.replace("{w}", 500).replace("{h}", 500)} className="w-full h-56 rounded-lg" />
                    </Link>
                    <div className="flex flex-row justify-between items-center mt-4">    
                        <Link to={`/artists/${artistDetail.data[0].id}`}>
                            <p className="font-semibold text-lg text-white truncate">{artistDetail?.data[0]?.attributes?.name}</p>
                        </Link>
                        <HiTrash className="text-gray-500 hover:text-white text-xl cursor-pointer" onClick={() => handleDeleteArtist(artistDetail.data[0].id)} />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default FavoriteArtists;