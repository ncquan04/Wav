import { Link } from "react-router-dom";

const DetailsHeader = ({ artistId, artistData, songData}) => {
  const shazamSongId = songData?.resources['shazam-songs'] ? Object.keys(songData.resources['shazam-songs'])[0] : null;
  const songDetailsArtistId = songData?.resources?.artists ? Object.keys(songData.resources.artists)[0] : null;

  return (
    <div className="relative w-full flex flex-col">
      <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28"/>
      <div className="absolute inset-0 flex items-center">
        <img alt="art" src={artistId ? artistData?.attributes?.artwork?.url.replace('{w}', '500').replace('{h}', '500') : songData?.resources['shazam-songs'][shazamSongId]?.attributes?.artwork.url} className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black"/>
        <div className="ml-5">
          <p className="font-bold sm:text-3xl text-xl text-white">
            {artistId ? artistData?.attributes?.name : songData?.resources['shazam-songs'][shazamSongId]?.attributes?.title}
          </p>
          {!artistId && (
            <Link to={`/artists/${songDetailsArtistId}`}>
              <p className="text-base text-gray-400 mt-2 hover:underline">{songData?.resources?.artists[songDetailsArtistId]?.attributes?.name}</p>
            </Link>
          )}
          <p className="text-base text-gray-400 mt-2">
            {artistId ? artistData?.attributes?.genreNames[0] : songData?.resources['shazam-songs'][shazamSongId]?.attributes?.genres?.primary}
          </p>
        </div>
      </div>

      <div className="w-full sm:h-44 h-24"/>
    </div>
  )
};

export default DetailsHeader;
