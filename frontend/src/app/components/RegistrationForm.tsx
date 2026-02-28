import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Loader2, Upload, User, GraduationCap, Briefcase, FileText, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { type Candidate } from '../utils/storage';

interface RegistrationFormData {
  fullName: string;
  fatherName: string;
  dateOfBirth: string;
  gender: string;
  mobile: string;
  email: string;
  aadhaar: string;
  qualification: string;
  specialization: string;
  yearOfPassing: string;
  percentage: string;
  applyingFor: string;
  experience: string;
  skills: string;
  preferredLocation: string;
  declaration: boolean;
}

interface RegistrationFormProps {
  onSuccess: () => void;
}

export function RegistrationForm({ onSuccess }: RegistrationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<RegistrationFormData>();
  
  const watchGender = watch('gender');
  const watchApplyingFor = watch('applyingFor');
  const watchExperience = watch('experience');

  const handleSendOtp = () => {
    const mobile = watch('mobile');
    if (!mobile || mobile.length !== 10) {
      toast.error('Please enter a valid 10-digit mobile number');
      return;
    }
    
    // Generate a 6-digit OTP
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    setOtpSent(true);
    
    // In production, this would send an SMS
    toast.success(`OTP sent to ${mobile}. Demo OTP: ${newOtp}`);
  };

  const handleVerifyOtp = () => {
    if (otp === generatedOtp) {
      setOtpVerified(true);
      toast.success('Mobile number verified successfully!');
    } else {
      toast.error('Invalid OTP. Please try again.');
    }
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        toast.error('Please upload a PDF file');
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        toast.error('File size should be less than 2MB');
        return;
      }
      setResumeFile(file);
      toast.success('Resume uploaded successfully');
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }
      if (file.size > 500 * 1024) {
        toast.error('Image size should be less than 500KB');
        return;
      }
      setPhotoFile(file);
      toast.success('Photo uploaded successfully');
    }
  };

  const onSubmit = async (data: RegistrationFormData) => {
    if (!otpVerified) {
      toast.error('Please verify your mobile number first');
      return;
    }

    if (!resumeFile) {
      toast.error('Please upload your resume');
      return;
    }

    if (!photoFile) {
      toast.error('Please upload your photo');
      return;
    }

    if (!data.declaration) {
      toast.error('Please accept the declaration');
      return;
    }

    setIsSubmitting(true);

    try {
      const resumeData = await fileToBase64(resumeFile);
      const photoData = await fileToBase64(photoFile);

      const payload = {
        ...data,
        resumeData,
        photoData,
      };

      const response = await fetch("/api/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      setIsSubmitting(false);

      if (response.ok) {
        toast.success("Registration completed successfully!");
        onSuccess();
      } else {
        const result = await response.json();
        toast.error(result.message || "Registration failed");
      }
    } catch (error) {
      setIsSubmitting(false);
      toast.error("Server error. Please try again later.");
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Personal Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Personal Details
          </CardTitle>
          <CardDescription>Please provide your basic information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                placeholder="Enter your full name"
                {...register('fullName', { required: 'Full name is required' })}
              />
              {errors.fullName && (
                <p className="text-sm text-red-500">{errors.fullName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="fatherName">Father's Name *</Label>
              <Input
                id="fatherName"
                placeholder="Enter father's name"
                {...register('fatherName', { required: "Father's name is required" })}
              />
              {errors.fatherName && (
                <p className="text-sm text-red-500">{errors.fatherName.message}</p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth *</Label>
              <Input
                id="dateOfBirth"
                type="date"
                {...register('dateOfBirth', { required: 'Date of birth is required' })}
              />
              {errors.dateOfBirth && (
                <p className="text-sm text-red-500">{errors.dateOfBirth.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender *</Label>
              <Select
                value={watchGender}
                onValueChange={(value) => setValue('gender', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && (
                <p className="text-sm text-red-500">{errors.gender.message}</p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile Number *</Label>
              <div className="flex gap-2">
                <Input
                  id="mobile"
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  {...register('mobile', {
                    required: 'Mobile number is required',
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: 'Please enter a valid 10-digit mobile number',
                    },
                  })}
                />
                {!otpVerified && (
                  <Button
                    type="button"
                    onClick={handleSendOtp}
                    variant="outline"
                    disabled={otpSent}
                  >
                    {otpSent ? 'Sent' : 'Send OTP'}
                  </Button>
                )}
                {otpVerified && (
                  <Button type="button" variant="outline" disabled className="bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </Button>
                )}
              </div>
              {errors.mobile && (
                <p className="text-sm text-red-500">{errors.mobile.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email ID *</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
          </div>

          {otpSent && !otpVerified && (
            <div className="space-y-2">
              <Label htmlFor="otp">Enter OTP *</Label>
              <div className="flex gap-2">
                <Input
                  id="otp"
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <Button type="button" onClick={handleVerifyOtp}>
                  Verify
                </Button>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="aadhaar">Aadhaar Number *</Label>
            <Input
              id="aadhaar"
              placeholder="12-digit Aadhaar number"
              maxLength={12}
              {...register('aadhaar')}
            />
          </div>
        </CardContent>
      </Card>

      {/* Education Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Education Details
          </CardTitle>
          <CardDescription>Tell us about your educational background</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="qualification">Highest Qualification *</Label>
              <Select
                value={watch('qualification')}
                onValueChange={(value) => setValue('qualification', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select qualification" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10th">10th</SelectItem>
                  <SelectItem value="12th">12th</SelectItem>
                  <SelectItem value="Diploma">Diploma</SelectItem>
                  <SelectItem value="Bachelor's">Bachelor's Degree</SelectItem>
                  <SelectItem value="Master's">Master's Degree</SelectItem>
                  <SelectItem value="PhD">PhD</SelectItem>
                </SelectContent>
              </Select>
              {errors.qualification && (
                <p className="text-sm text-red-500">{errors.qualification.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialization">Specialization *</Label>
              <Input
                id="specialization"
                placeholder="e.g., Computer Science, Mechanical"
                {...register('specialization', { required: 'Specialization is required' })}
              />
              {errors.specialization && (
                <p className="text-sm text-red-500">{errors.specialization.message}</p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="yearOfPassing">Year of Passing *</Label>
              <Input
                id="yearOfPassing"
                type="number"
                placeholder="e.g., 2023"
                min="1990"
                max="2026"
                {...register('yearOfPassing', { required: 'Year of passing is required' })}
              />
              {errors.yearOfPassing && (
                <p className="text-sm text-red-500">{errors.yearOfPassing.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="percentage">Percentage / CGPA *</Label>
              <Input
                id="percentage"
                placeholder="e.g., 85% or 8.5 CGPA"
                {...register('percentage', { required: 'Percentage/CGPA is required' })}
              />
              {errors.percentage && (
                <p className="text-sm text-red-500">{errors.percentage.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Job Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Job Preferences
          </CardTitle>
          <CardDescription>What kind of job are you looking for?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="applyingFor">Applying For *</Label>
              <Select
                value={watchApplyingFor}
                onValueChange={(value) => setValue('applyingFor', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="IT">IT</SelectItem>
                  <SelectItem value="Non-IT">Non-IT</SelectItem>
                  <SelectItem value="Technical"> Semi-Technical</SelectItem>
                  <SelectItem value="Support">Others</SelectItem>
                </SelectContent>
              </Select>
              {errors.applyingFor && (
                <p className="text-sm text-red-500">{errors.applyingFor.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Experience Level *</Label>
              <Select
                value={watchExperience}
                onValueChange={(value) => setValue('experience', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Fresher">Fresher</SelectItem>
                  <SelectItem value="Experienced">Experienced</SelectItem>
                </SelectContent>
              </Select>
              {errors.experience && (
                <p className="text-sm text-red-500">{errors.experience.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="skills">Skills *</Label>
            <Textarea
              id="skills"
              placeholder="List your key skills (e.g., Java, Python, Communication, Leadership)"
              rows={3}
              {...register('skills', { required: 'Skills are required' })}
            />
            {errors.skills && (
              <p className="text-sm text-red-500">{errors.skills.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferredLocation">Preferred Location *</Label>
            <Input
              id="preferredLocation"
              placeholder="e.g., Mumbai, Bangalore, Any"
              {...register('preferredLocation', { required: 'Preferred location is required' })}
            />
            {errors.preferredLocation && (
              <p className="text-sm text-red-500">{errors.preferredLocation.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Document Upload
          </CardTitle>
          <CardDescription>Upload your resume and photograph</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="resume">Resume (PDF only, max 2MB) *</Label>
            <div className="flex items-center gap-4">
              <Input
                id="resume"
                type="file"
                accept=".pdf"
                onChange={handleResumeChange}
                className="cursor-pointer"
              />
              {resumeFile && (
                <span className="text-sm text-green-600 flex items-center gap-1">
                  <CheckCircle className="h-4 w-4" />
                  {resumeFile.name}
                </span>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="photo">Passport Size Photo (max 500KB) *</Label>
            <div className="flex items-center gap-4">
              <Input
                id="photo"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="cursor-pointer"
              />
              {photoFile && (
                <span className="text-sm text-green-600 flex items-center gap-1">
                  <CheckCircle className="h-4 w-4" />
                  {photoFile.name}
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Declaration */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="declaration"
              {...register('declaration', { required: true })}
              onCheckedChange={(checked) => setValue('declaration', checked as boolean)}
            />
            <Label
              htmlFor="declaration"
              className="text-sm leading-relaxed cursor-pointer"
            >
              I hereby declare that all the information provided above is true and correct to the best of my knowledge. I understand that any false information may lead to disqualification.
            </Label>
          </div>
          {errors.declaration && (
            <p className="text-sm text-red-500 mt-2">You must accept the declaration</p>
          )}
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-center pt-4">
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="w-full md:w-auto px-12 py-6 text-lg font-semibold"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-5 w-5" />
              Submit Registration
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
