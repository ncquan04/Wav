import { useSelector } from "react-redux";
import { ArtistCard } from "../components";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FavoriteArtists = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const [ artistIds, setArtistIds ] = useState([]);
    const [ artistDetails, setArtistDetails ] = useState([]);

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const idsResponse = await axios.post("http://localhost:5000/artists", { userId: user.id });
                const ids = idsResponse.data.artists;
                setArtistIds(ids);    
                if (ids.length > 0) {
                    const requests = ids.map((artistId) => {
                        const id = artistId.artist_id;
                        return axios.get(`https://shazam.p.rapidapi.com/artists/get-details`, {
                            params: { id, l: 'en-US' },
                            headers: {
                                'x-rapidapi-key': import.meta.env.VITE_SHAZAM_CORE_RAPID_API_KEY,
                                'x-rapidapi-host': 'shazam.p.rapidapi.com'
                            }
                        });
                    });
                    const responses = await Promise.all(requests);
                    setArtistDetails(responses.map(response => response.data));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchArtists();
    }, []);

    return (
        <div className="flex flex-row flex-wrap gap-8">
            {artistDetails.map((artistDetail, index) => (
                <div 
                    className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer" 
                    onClick={() => navigate(`/artists/${artistDetail.data[0].id}`)}
                >
                    <img alt="artist" src={artistDetail?.data[0]?.attributes?.artwork?.url.replace("{w}", 500).replace("{h}", 500)} className="w-full h-56 rounded-lg" />
                    <p className="mt-4 font-semibold text-lg text-white truncate">{artistDetail?.data[0]?.attributes?.name}</p>
                </div>
            ))}
        </div>
    )
}

export default FavoriteArtists;