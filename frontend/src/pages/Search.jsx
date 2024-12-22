import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Error, Loader } from "../components";
import { useGetSongsBySearchQuery } from "../redux/services/shazamCore";
import SearchSongCard from "../components/SearchSongCard";
import SearchArtistCard from "../components/SearchArtistCard";

const Search = () => {
    const { searchTerm } = useParams();
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    const { data, isFetching, error } = useGetSongsBySearchQuery(searchTerm);

    const songs = data?.tracks?.hits?.map((song) => song.track);
    const artists = data?.artists?.hits?.map((artist) => artist.artist);

    if (isFetching) return <Loader title="Loading..."/>;
    if (error) return <Error/>

    return (
        <div className="flex flex-col">
            <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Showing results for "<span className="font-black">{searchTerm}</span>"</h2>
            <h2 className="font-bold text-2xl text-white text-left mt-4 mb-10">Songs</h2>
            <div className="flex flex-wrap sm:justify-start justify-center gap-8 mt-4 mb-10">
                {songs?.map((song, i) => (
                    <SearchSongCard
                        key={song.key}
                        song={song}
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                        data={data}
                        i={i}
                    />
                ))}
            </div>
            <h2 className="font-bold text-2xl text-white text-left mt-4 mb-10">Artists</h2>
            <div className="flex flex-wrap sm:justify-start justify-center gap-8 mt-4 mb-10">
                {!artists ?
                    <h2 className="text-white text-2xl font-bold w-full text-center">Oops, there isn't any artists with this name</h2>
                :
                artists?.map((artist, i) => (
                    <SearchArtistCard 
                        key={i} 
                        artist={artist} 
                    />
                ))}
            </div>
        </div>
    )
};

export default Search;
