import { Link } from "react-router-dom";
import shazam_logo from "../assets/shazam_logo.jpeg";

const DetailsHeader = ({ artistId, artistData, songData}) => {
  const shazamSongId = songData?.resources['shazam-songs'] ? Object.keys(songData.resources['shazam-songs'])[0] : null;
  const songDetailsArtistId = songData?.resources?.artists ? Object.keys(songData.resources.artists)[0] : null;

  return (
    <div className="relative w-full flex flex-col">
      <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28"/>
      <div className="absolute inset-0 flex justify-between items-center">
        <div className="flex items-center">
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
        <div className="flex flex-col items-center">
          <div className="text-white text-2xl font-bold mb-4">See more at</div>
          <a href={artistId ? `https://shazam.com/artist/${artistData.attributes.name}/${artistData.id}` : songData?.resources['shazam-songs'][shazamSongId]?.attributes?.share.href} target="_blank" rel="noreferrer">
            <div className="w-60 h-24 rounded-full overflow-hidden" style={{backgroundImage: `url(${shazam_logo})`, backgroundSize: 'cover', backgroundPosition: 'center'}}/>
          </a>
        </div>
      </div>
      <div className="w-full sm:h-44 h-24"/>
    </div>
  )
};

export default DetailsHeader;
