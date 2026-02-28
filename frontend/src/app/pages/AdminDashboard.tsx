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
  Filter
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner';
import {
  getAllCandidates,
  searchCandidates,
  getCandidateById,
  exportToCSV,
  getStatistics,
  type Candidate
} from '../utils/storage';

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
    total: 0,
    byJobType: { IT: 0, NonIT: 0, Technical: 0, Support: 0 },
    byExperience: { Fresher: 0, Experienced: 0 }
  });

  useEffect(() => {
    // Check if admin is logged in
    const isLoggedIn = sessionStorage.getItem('admin_logged_in');
    if (!isLoggedIn) {
      navigate('/admin');
      return;
    }

    loadCandidates();
    loadStatistics();
  }, [navigate]);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, filterJobType, filterExperience, candidates]);

  const loadCandidates = () => {
    const allCandidates = getAllCandidates();
    setCandidates(allCandidates);
    setFilteredCandidates(allCandidates);
  };

  const loadStatistics = () => {
    const statistics = getStatistics();
    setStats(statistics);
  };

  const applyFilters = () => {
    let filtered = candidates;

    // Apply search filter
    if (searchQuery) {
      filtered = searchCandidates(searchQuery);
    }

    // Apply job type filter
    if (filterJobType !== 'all') {
      filtered = filtered.filter(c => c.applyingFor === filterJobType);
    }

    // Apply experience filter
    if (filterExperience !== 'all') {
      filtered = filtered.filter(c => c.experience === filterExperience);
    }

    setFilteredCandidates(filtered);
  };

  const handleViewDetails = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsDetailsOpen(true);
  };

  const handleDownloadResume = (candidate: Candidate) => {
    if (candidate.resumeData) {
      const link = document.createElement('a');
      link.href = candidate.resumeData;
      link.download = `${candidate.fullName}_Resume.pdf`;
      link.click();
      toast.success('Resume downloaded successfully');
    } else {
      toast.error('Resume not available');
    }
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
            <Button onClick={handleLogout} variant="outline" className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="p-4 md:p-8">
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
      </div>

      {/* Candidate Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Candidate Details</DialogTitle>
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
                  {selectedCandidate.photoData && (
                    <Button variant="outline" className="gap-2">
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
    </div>
  );
}
