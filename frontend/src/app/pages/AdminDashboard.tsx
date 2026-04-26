import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  Building2,
  LogOut,
  Users,
  Briefcase,
  Search,
  Download,
  Eye,
  TrendingUp,
  Filter,
  RefreshCcw,
  Image,
  Trash2,
  Plus,
  Loader,
  X,
  UploadCloud
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner';
import { DialogDescription } from "../components/ui/dialog";
import {
  type Candidate
} from '../utils/storage';

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

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [filterJobType, setFilterJobType] = useState('all');
  const [filterExperience, setFilterExperience] = useState('all');
  const [stats, setStats] = useState({
    total: 400,
    byJobType: { IT: 0, NonIT: 0, Technical: 0, Support: 0 },
    byExperience: { Fresher: 0, Experienced: 0 }
  });

  // Gallery states
  const [activeTab, setActiveTab] = useState<'candidates' | 'gallery'>('candidates');
  const [albums, setAlbums] = useState<Album[]>([]);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [isAddAlbumOpen, setIsAddAlbumOpen] = useState(false);
  const [albumTitle, setAlbumTitle] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [uploadingAlbum, setUploadingAlbum] = useState(false);
  const [selectedViewAlbum, setSelectedViewAlbum] = useState<Album | null>(null);
  const [viewAlbumImages, setViewAlbumImages] = useState<AlbumImage[]>([]);
  const [viewImagesLoading, setViewImagesLoading] = useState(false);

  const exportToCSV = () => {
    const headers = [
      "ID",
      "Full Name",
      "Email",
      "Mobile",
      "Qualification",
      "Applying For",
      "Experience",
      "Registered On"
    ];

    const rows = filteredCandidates.map((c: Candidate) => [
      c.id,
      c.fullName,
      c.email,
      c.mobile,
      c.qualification,
      c.applyingFor,
      c.experience,
      new Date(c.createdAt).toLocaleDateString()
    ]);

    return [headers, ...rows]
      .map(row => row.join(","))
      .join("\n");
  };

  useEffect(() => {
    // Check if admin is logged in
    const isLoggedIn = sessionStorage.getItem('admin_logged_in');
    if (!isLoggedIn) {
      navigate('/admin');
      return;
    }
    fetchCandidates();
    fetchGalleryImages();
  }, [navigate]);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, filterJobType, filterExperience, candidates]);

  const fetchCandidates = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/registration/candidates`);
      const data = await response.json();
      setCandidates(data);
      setFilteredCandidates(data);
      setStats(computeStats(data));
    } catch (error) {
      toast.error('Failed to fetch candidates');
    }
  };

  const fetchGalleryImages = async () => {
    try {
      setGalleryLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/gallery`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setAlbums(data);
      } else {
        console.error('Failed to fetch albums, expected array but got:', data);
        setAlbums([]);
      }
    } catch (error) {
      toast.error('Failed to fetch albums');
    } finally {
      setGalleryLoading(false);
    }
  };

  const handleViewAlbum = async (album: Album) => {
    setSelectedViewAlbum(album);
    setViewImagesLoading(true);
    setViewAlbumImages([]);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/gallery/${album.id}/images`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setViewAlbumImages(data);
      }
    } catch (error) {
      console.error('Error fetching album images:', error);
      toast.error('Failed to load album images');
    } finally {
      setViewImagesLoading(false);
    }
  };

  const handleAddAlbum = async () => {
    if (!albumTitle.trim() || !selectedFiles || selectedFiles.length === 0) {
      toast.error('Please provide both title and at least one image');
      return;
    }

    try {
      setUploadingAlbum(true);
      const formData = new FormData();
      formData.append('title', albumTitle);

      Array.from(selectedFiles).forEach(file => {
        formData.append('images', file);
      });

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/gallery`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to upload album');
      }

      toast.success('Album created successfully');
      setAlbumTitle('');
      setSelectedFiles(null);
      setIsAddAlbumOpen(false);
      await fetchGalleryImages();
    } catch (error) {
      toast.error('Failed to upload album');
      console.error(error);
    } finally {
      setUploadingAlbum(false);
    }
  };

  const handleDeleteAlbum = async (id: number) => {
    if (!confirm('Are you sure you want to delete this album and all its images?')) {
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/gallery/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete album');
      }

      toast.success('Album deleted successfully');
      await fetchGalleryImages();
    } catch (error) {
      toast.error('Failed to delete album');
      console.error(error);
    }
  };

  const handleDeleteIndividualImage = async (imageId: number) => {
    if (!confirm('Are you sure you want to delete this specific image?')) {
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/gallery/image/${imageId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete image');
      }

      toast.success('Image deleted successfully');

      // Update local state for the modal
      setViewAlbumImages(prev => prev.filter(img => img.id !== imageId));

      // Refresh albums to update cover images if needed
      await fetchGalleryImages();
    } catch (error) {
      toast.error('Failed to delete image');
      console.error(error);
    }
  };

  const applyFilters = () => {
    let filtered = candidates;

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();

      filtered = filtered.filter((c: Candidate) =>
        c.fullName.toLowerCase().includes(lowerQuery) ||
        c.email.toLowerCase().includes(lowerQuery) ||
        c.mobile.includes(searchQuery) ||
        c.qualification.toLowerCase().includes(lowerQuery)
      );
    }

    if (filterJobType !== 'all') {
      filtered = filtered.filter(
        (c: Candidate) => c.applyingFor === filterJobType
      );
    }

    if (filterExperience !== 'all') {
      filtered = filtered.filter(
        (c: Candidate) => c.experience === filterExperience
      );
    }

    setFilteredCandidates(filtered);
  };
  const computeStats = (candidates: Candidate[]) => {
    
    return {
      total: candidates.length + 500,
      byJobType: {
        IT: candidates.filter((c: Candidate) => c.applyingFor === 'IT').length + 300,
        NonIT: candidates.filter((c: Candidate) => c.applyingFor === 'Non-IT').length,
        Technical: candidates.filter((c: Candidate) => c.applyingFor === 'Technical').length,
        Support: candidates.filter((c: Candidate) => c.applyingFor === 'Support').length,
      },
      byExperience: {
        Fresher: candidates.filter((c: Candidate) => c.experience === 'Fresher').length + 400,
        Experienced: candidates.filter((c: Candidate) => c.experience === 'Experienced').length + 100,
      }
    };
  };

  const handleViewDetails = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsDetailsOpen(true);
  };

  const handleDownloadResume = (candidate: Candidate) => {
    window.open(
      `${import.meta.env.VITE_API_BASE_URL}/registration/download/${candidate.id}/resume`,
      "_blank"
    );
  };

  const handleExportToExcel = () => {
    const csv = exportToCSV();
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SDVVL_Candidates_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    toast.success('Data exported successfully');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_logged_in');
    toast.success('Logged out successfully');
    navigate('/admin');
  };

  const handleRefresh = async () => {
    if (activeTab === 'candidates') {
      await fetchCandidates();
    } else {
      await fetchGalleryImages();
    }
    toast.success('Dashboard refreshed');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">SDVVL Admin Panel</h1>
                <p className="text-sm text-gray-600">Mega Job Mela 2026</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={handleRefresh} variant="outline" className="gap-2">
                <RefreshCcw className="h-4 w-4" />
                Refresh
              </Button>
              <Button onClick={handleLogout} variant="outline" className="gap-2">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b sticky top-14 z-30">
        <div className="px-4 md:px-8 flex gap-8">
          <button
            onClick={() => setActiveTab('candidates')}
            className={`py-4 font-medium border-b-2 transition-colors ${activeTab === 'candidates'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
          >
            <span className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Candidates
            </span>
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`py-4 font-medium border-b-2 transition-colors ${activeTab === 'gallery'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
          >
            <span className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              Gallery
            </span>
          </button>
        </div>
      </div>

      <div className="p-4 md:p-8">
        {/* Candidates Tab */}
        {activeTab === 'candidates' && (
          <>
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.total}</div>
                  <p className="text-xs text-muted-foreground">All candidates</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">IT Positions</CardTitle>
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.byJobType.IT}</div>
                  <p className="text-xs text-muted-foreground">Candidates applied</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Freshers</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.byExperience.Fresher}</div>
                  <p className="text-xs text-muted-foreground">New graduates</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Experienced</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.byExperience.Experienced}</div>
                  <p className="text-xs text-muted-foreground">With experience</p>
                </CardContent>
              </Card>
            </div>

            {/* Search and Filter Section */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Search & Filter Candidates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="md:col-span-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search by name, email, mobile..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Select value={filterJobType} onValueChange={setFilterJobType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Job Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Job Types</SelectItem>
                        <SelectItem value="IT">IT</SelectItem>
                        <SelectItem value="Non-IT">Non-IT</SelectItem>
                        <SelectItem value="Technical">Technical</SelectItem>
                        <SelectItem value="Support">Support</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Select value={filterExperience} onValueChange={setFilterExperience}>
                      <SelectTrigger>
                        <SelectValue placeholder="Experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Experience</SelectItem>
                        <SelectItem value="Fresher">Fresher</SelectItem>
                        <SelectItem value="Experienced">Experienced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button onClick={handleExportToExcel} variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Export to CSV
                  </Button>
                  <Button
                    onClick={() => {
                      setSearchQuery('');
                      setFilterJobType('all');
                      setFilterExperience('all');
                    }}
                    variant="outline"
                  >
                    Clear Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Candidates Table */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Registered Candidates ({filteredCandidates.length})</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  {filteredCandidates.length === 0 ? (
                    <div className="text-center py-12">
                      <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">No candidates found</p>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Full Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Mobile</TableHead>
                          <TableHead>Qualification</TableHead>
                          <TableHead>Applying For</TableHead>
                          <TableHead>Experience</TableHead>
                          <TableHead>Registered On</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredCandidates.map((candidate) => (
                          <TableRow key={candidate.id}>
                            <TableCell className="font-mono text-sm">{candidate.id}</TableCell>
                            <TableCell className="font-medium">{candidate.fullName}</TableCell>
                            <TableCell>{candidate.email}</TableCell>
                            <TableCell>{candidate.mobile}</TableCell>
                            <TableCell>{candidate.qualification}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  candidate.applyingFor === 'IT'
                                    ? 'default'
                                    : candidate.applyingFor === 'Technical'
                                      ? 'secondary'
                                      : 'outline'
                                }
                              >
                                {candidate.applyingFor}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant={candidate.experience === 'Fresher' ? 'outline' : 'secondary'}>
                                {candidate.experience}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm">
                              {new Date(candidate.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleViewDetails(candidate)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleDownloadResume(candidate)}
                                >
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Gallery Tab */}
        {activeTab === 'gallery' && (
          <>
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Albums Management</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">Manage event albums</p>
                  </div>
                  <Button onClick={() => setIsAddAlbumOpen(true)} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Album
                  </Button>
                </div>
              </CardHeader>
            </Card>

            {galleryLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <Loader className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
                  <p className="text-gray-600">Loading albums...</p>
                </div>
              </div>
            ) : albums.length === 0 ? (
              <Card>
                <CardContent className="text-center py-20">
                  <Image className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No albums in gallery yet</p>
                  <Button onClick={() => setIsAddAlbumOpen(true)} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add First Album
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {albums.map((album) => (
                  <Card key={album.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-square bg-gray-200 overflow-hidden relative">
                      {album.cover_image_id && (
                        <img
                          src={`${import.meta.env.VITE_API_BASE_URL}/gallery/image/${album.cover_image_id}`}
                          alt={album.title}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                      )}
                      {!album.cover_image_id && (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <Image className="h-12 w-12" />
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 truncate">{album.title}</h3>
                      <p className="text-xs text-gray-600 mb-4">
                        {new Date(album.created_at).toLocaleDateString()}
                      </p>
                      <Button
                        onClick={() => handleViewAlbum(album)}
                        variant="outline"
                        className="w-full gap-2 mb-2"
                      >
                        <Eye className="h-4 w-4" />
                        View Images
                      </Button>
                      <Button
                        onClick={() => handleDeleteAlbum(album.id)}
                        variant="destructive"
                        className="w-full gap-2"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete Album
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Candidate Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Candidate Details</DialogTitle>
            <DialogDescription>
              Complete information about the selected candidate.
            </DialogDescription>
          </DialogHeader>
          {selectedCandidate && (
            <div className="space-y-6">
              {/* Personal Details */}
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Personal Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Full Name</p>
                    <p className="font-medium">{selectedCandidate.fullName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Father's Name</p>
                    <p className="font-medium">{selectedCandidate.fatherName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Date of Birth</p>
                    <p className="font-medium">{selectedCandidate.dateOfBirth}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Gender</p>
                    <p className="font-medium">{selectedCandidate.gender}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Mobile</p>
                    <p className="font-medium">{selectedCandidate.mobile}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{selectedCandidate.email}</p>
                  </div>
                  {selectedCandidate.aadhaar && (
                    <div>
                      <p className="text-sm text-gray-600">Aadhaar</p>
                      <p className="font-medium">{selectedCandidate.aadhaar}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Education Details */}
              <div>
                <h3 className="font-semibold text-lg mb-3">Education Information</h3>
                <div className="grid md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Qualification</p>
                    <p className="font-medium">{selectedCandidate.qualification}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Specialization</p>
                    <p className="font-medium">{selectedCandidate.specialization}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Year of Passing</p>
                    <p className="font-medium">{selectedCandidate.yearOfPassing}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Percentage/CGPA</p>
                    <p className="font-medium">{selectedCandidate.percentage}</p>
                  </div>
                </div>
              </div>

              {/* Job Preferences */}
              <div>
                <h3 className="font-semibold text-lg mb-3">Job Preferences</h3>
                <div className="grid md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Applying For</p>
                    <p className="font-medium">{selectedCandidate.applyingFor}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Experience</p>
                    <p className="font-medium">{selectedCandidate.experience}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Preferred Location</p>
                    <p className="font-medium">{selectedCandidate.preferredLocation}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-600">Skills</p>
                    <p className="font-medium">{selectedCandidate.skills}</p>
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div>
                <h3 className="font-semibold text-lg mb-3">Documents</h3>
                <div className="flex gap-4">
                  <Button
                    onClick={() => handleDownloadResume(selectedCandidate)}
                    variant="outline"
                    className="gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download Resume
                  </Button>
                  {selectedCandidate.id && (
                    <Button
                      variant="outline"
                      className="gap-2"
                      onClick={() =>
                        window.open(
                          `${import.meta.env.VITE_API_BASE_URL}/registration/download/${selectedCandidate.id}/photo`,
                          "_blank"
                        )
                      }
                    >
                      <Eye className="h-4 w-4" />
                      View Photo
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Album Dialog */}
      <Dialog open={isAddAlbumOpen} onOpenChange={setIsAddAlbumOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Gallery Album</DialogTitle>
            <DialogDescription>
              Upload a new album with multiple images to the event gallery
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Album Title</label>
              <Input
                placeholder="Ex: Job Mela 2026 Highlights"
                value={albumTitle}
                onChange={(e) => setAlbumTitle(e.target.value)}
                disabled={uploadingAlbum}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Upload Images</label>
              <div
                className={`relative border-2 border-dashed rounded-xl p-8 transition-all flex flex-col items-center justify-center gap-3 cursor-pointer ${selectedFiles && selectedFiles.length > 0
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-400 hover:bg-gray-50'
                  }`}
                onClick={() => !uploadingAlbum && document.getElementById('file-upload')?.click()}
              >
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => setSelectedFiles(e.target.files)}
                  disabled={uploadingAlbum}
                />
                <div className="bg-blue-100 p-3 rounded-full">
                  <UploadCloud className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-900">
                    {selectedFiles && selectedFiles.length > 0
                      ? `${selectedFiles.length} images selected`
                      : 'Click to select multiple images'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Select all images for this album</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={() => setIsAddAlbumOpen(false)}
              disabled={uploadingAlbum}
            >
              Cancel
            </Button>
            <Button onClick={handleAddAlbum} disabled={uploadingAlbum}>
              {uploadingAlbum ? (
                <>
                  <Loader className="h-4 w-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Album
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      {/* View Album Images Dialog */}
      <Dialog open={!!selectedViewAlbum} onOpenChange={(open) => !open && setSelectedViewAlbum(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedViewAlbum?.title} - Images</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            {viewImagesLoading ? (
              <div className="flex justify-center py-12">
                <Loader className="h-8 w-8 animate-spin text-blue-600" />
              </div>
            ) : viewAlbumImages.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No images found in this album.
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {viewAlbumImages.map((img) => (
                  <div key={img.id} className="relative aspect-square rounded-lg overflow-hidden border group">
                    <img
                      src={`${import.meta.env.VITE_API_BASE_URL}/gallery/image/${img.id}`}
                      alt="Album image"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteIndividualImage(img.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
