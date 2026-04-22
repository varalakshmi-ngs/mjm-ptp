import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { MapPin, Phone, Mail, Grid3x3, Loader, ChevronLeft, ChevronRight, X } from 'lucide-react';

interface Album {
  id: number;
  title: string;
  cover_image_id: number;
  created_at: string;
}

interface AlbumImage {
  id: number;
  image_name: string;
  created_at: string;
}

export default function GalleryPage() {
  const navigate = useNavigate();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [albumImages, setAlbumImages] = useState<AlbumImage[]>([]);
  const [imagesLoading, setImagesLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/gallery`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setAlbums(data);
      } else {
        console.error('Failed to fetch albums, expected array but got:', data);
        setAlbums([]);
      }
    } catch (error) {
      console.error('Error fetching gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAlbumClick = async (album: Album) => {
    setSelectedAlbum(album);
    setCurrentImageIndex(0);
    setImagesLoading(true);
    setAlbumImages([]);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/gallery/${album.id}/images`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setAlbumImages(data);
      }
    } catch (error) {
      console.error('Error fetching album images:', error);
    } finally {
      setImagesLoading(false);
    }
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentImageIndex < albumImages.length - 1) {
      setCurrentImageIndex(prev => prev + 1);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentImageIndex > 0) {
      setCurrentImageIndex(prev => prev - 1);
    }
  };

  const getImageUrl = (imageId: number) => {
    return `${import.meta.env.VITE_API_BASE_URL}/gallery/image/${imageId}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
              <div className="p-2 rounded-lg">
                <img
                  src="/b5dc0401-0a74-4242-aad1-2fc3e46169b5-removebg-preview.png"
                  alt="sdvvl"
                  className="h-20 w-20"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">SDVVL</h1>
                <p className="text-sm text-gray-600">Shaping Digital Ventures</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <button
                onClick={() => navigate('/')}
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Home
              </button>
              <button
                onClick={() => navigate('/register')}
                className="text-gray-700 hover:bg-amber-300 font-bold bg-amber-200 h-10 w-40 rounded-xl"
              >
                Register
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Gallery Header Section */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Grid3x3 className="h-8 w-8 text-white" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">Event Gallery</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Explore moments from SDVVL Mega Job Mela 2026
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <Loader className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
                <p className="text-gray-600">Loading gallery...</p>
              </div>
            </div>
          ) : albums.length === 0 ? (
            <div className="text-center py-20">
              <Grid3x3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-xl text-gray-600">No albums in gallery yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {albums.map((album) => (
                <div
                  key={album.id}
                  className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden cursor-pointer hover:shadow-2xl hover:border-blue-500 hover:-translate-y-1 transition-all duration-300 flex flex-col group shadow-sm"
                  onClick={() => handleAlbumClick(album)}
                >
                  <div className="w-full aspect-[4/3] bg-gray-50 relative overflow-hidden flex items-center justify-center p-2">
                    {album.cover_image_id ? (
                      <img
                        src={getImageUrl(album.cover_image_id)}
                        alt={album.title}
                        className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Grid3x3 className="h-12 w-12 text-gray-300" />
                      </div>
                    )}
                    {/* <div className="absolute top-3 right-3 bg-blue-600/80 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full font-bold tracking-wide shadow-sm">
                      ALBUM
                    </div> */}
                  </div>
                  <div className="p-6 bg-white border-t border-gray-100 text-center">
                    <h3 className="font-extrabold text-xl text-gray-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">
                      {album.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal for album view with scrolling */}
      {selectedAlbum && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedAlbum(null)}
        >
          <div className="relative w-full max-w-5xl h-full max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="flex justify-between items-center text-white mb-4">
              <div>
                <h2 className="text-2xl font-bold">{selectedAlbum.title}</h2>
                <p className="text-gray-400 text-sm">
                  {albumImages.length > 0 ? `${currentImageIndex + 1} of ${albumImages.length} images` : ''}
                </p>
              </div>
              <button
                onClick={() => setSelectedAlbum(null)}
                className="text-white hover:text-red-400 transition-colors p-2"
              >
                <X className="h-8 w-8" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 relative flex items-center justify-center bg-black/50 rounded-lg border border-gray-800 overflow-hidden">
              {imagesLoading ? (
                <div className="text-center">
                  <Loader className="h-12 w-12 text-white animate-spin mx-auto" />
                </div>
              ) : albumImages.length > 0 ? (
                <>
                  {/* Image Display */}
                  <div className="w-full h-full flex items-center justify-center p-4">
                    <img
                      src={getImageUrl(albumImages[currentImageIndex].id)}
                      alt={`${selectedAlbum.title} - Image ${currentImageIndex + 1}`}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  
                  {/* Navigation Buttons */}
                  {currentImageIndex > 0 && (
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black text-white p-3 rounded-full transition-colors"
                    >
                      <ChevronLeft className="h-8 w-8" />
                    </button>
                  )}
                  {currentImageIndex < albumImages.length - 1 && (
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black text-white p-3 rounded-full transition-colors"
                    >
                      <ChevronRight className="h-8 w-8" />
                    </button>
                  )}
                </>
              ) : (
                <p className="text-white text-xl">No images found in this album.</p>
              )}
            </div>
            
            {/* Thumbnails (optional scrolling option at bottom) */}
            {!imagesLoading && albumImages.length > 1 && (
              <div className="mt-4 flex gap-2 overflow-x-auto py-2 px-1 snap-x no-scrollbar">
                {albumImages.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`shrink-0 h-20 w-20 rounded-md overflow-hidden border-2 transition-all snap-center ${
                      idx === currentImageIndex ? 'border-white scale-110' : 'border-transparent opacity-50 hover:opacity-100'
                    }`}
                  >
                    <img 
                      src={getImageUrl(img.id)} 
                      alt="" 
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Event Details Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Event Contact Information
            </h2>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Venue</h3>
                    <p className="text-gray-700 font-medium">SDVVL SKILL HUB</p>
                    <p className="text-gray-600">Kakinada, Andhra Pradesh 533005</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <div className="flex items-start gap-4">
                  <div className="bg-green-600 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Contact</h3>
                    <p className="text-gray-700">+91 81216 52938</p>
                    <p className="text-gray-700">+91 88869 68522</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-600 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                    <p className="text-gray-700">careers@sdvvl.com</p>
                    <p className="text-gray-700">sdvvlcompany@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
                <div className="flex items-start gap-4">
                  <div className="bg-amber-600 p-3 rounded-lg">
                    <span className="text-white font-bold">📅</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Event Date & Time</h3>
                    <p className="text-gray-700 font-medium">April 27, 2026</p>
                    <p className="text-gray-600">9:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-white p-2 rounded-lg">
                  <img
                    src="/b5dc0401-0a74-4242-aad1-2fc3e46169b5-removebg-preview.png"
                    alt="sdvvl"
                    className="h-20 w-20"
                  />
                </div>
                <h3 className="text-xl font-bold text-white">SDVVL</h3>
              </div>
              <p className="text-gray-400">
                Empowering careers, connecting talent with opportunities.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => navigate('/')}
                    className="hover:text-blue-400 transition-colors"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/register')}
                    className="hover:text-blue-400 transition-colors"
                  >
                    Register
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-2">
                <li>+91 81216 52938</li>
                <li>careers@sdvvl.com</li>
                <li>Kakinada, AP 533005</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2026 SDVVL Company. All rights reserved. | Mega Job Mela 2026
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
