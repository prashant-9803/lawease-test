import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { googleAuth } from '@/services/operations/authAPI';

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [accountType, setAccountType] = useState('user')
  const [otpSent, setOtpSent] = useState(false);
  
  // Split the form data into two steps
  const [emailData, setEmailData] = useState({
    email: ''
  });

  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    otp: ''
  });

  // Handle email input for OTP step
  const handleEmailChange = (e) => {
    setEmailData({
      ...emailData,
      [e.target.id]: e.target.value
    });
  };

  // Handle other inputs for signup step
  const handleSignupDataChange = (e) => {
    setSignupData({
      ...signupData,
      [e.target.id]: e.target.value
    });
  };

  // Step 1: Send OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/sendotp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailData.email }),
      });

      const data = await response.json();
      if (data.success) {
        setOtpSent(true);
        toast.success('OTP sent successfully!');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Failed to send OTP');
    }
  };

  // Step 2: Complete Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailData.email,
          firstName: signupData.firstName,
          lastName: signupData.lastName,
          password: signupData.password,
          confirmPassword: signupData.confirmPassword,
          otp: signupData.otp,
          accountType: accountType === 'user' ? 'Client' : 'Provider'
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success('Signup successful!');
        if (accountType === 'Provider') {
          // Make sure the token is being received from the backend
          if (data.token) {
            // Store the token without JSON.stringify
            localStorage.setItem('token', data.token);
            console.log('Token saved:', data.token); // Debug log
            navigate('/form');
          } else {
            throw new Error('No token received from server');
          }
        } else {
          navigate('/login');
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast.error(error.message || 'Signup failed');
    }
  };
  const handleGoogleSuccess = (credentialResponse) => {
    dispatch(googleAuth(
      credentialResponse.credential,
      accountType === 'user' ? 'Client' : 'Provider',
      navigate
    ));
  };

  const handleGoogleError = () => {
    toast.error("Google sign in failed");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 mt-14">
      {/* Left side - Project name and logo */}
      <div className="w-1/3 bg-gray-950 text-white flex flex-col items-center justify-center p-8">
        {/* Your existing logo SVG */}
        <svg version="1.1" className="invert scale-50" xmlns="http://www.w3.org/2000/svg" width="506" height="148">
<path d="M0 0 C166.98 0 333.96 0 506 0 C506 48.84 506 97.68 506 148 C339.02 148 172.04 148 0 148 C0 99.16 0 50.32 0 0 Z " fill="#FEFEFE" transform="translate(0,0)"/>
<path d="M0 0 C34.32 0 68.64 0 104 0 C104 3.3 104 6.6 104 10 C102.02 10 100.04 10 98 10 C98 27.16 98 44.32 98 62 C99.98 62 101.96 62 104 62 C104 65.3 104 68.6 104 72 C69.68 72 35.36 72 0 72 C0 68.7 0 65.4 0 62 C2.31 62 4.62 62 7 62 C7 44.84 7 27.68 7 10 C4.69 10 2.38 10 0 10 C0 6.7 0 3.4 0 0 Z " fill="#060606" transform="translate(21,56)"/>
<path d="M0 0 C1.06442825 0.41556656 2.12885651 0.83113312 3.22554016 1.2592926 C6.60822569 2.58224934 9.98574243 3.91787203 13.36328125 5.25390625 C15.64485376 6.14862469 17.92675177 7.04251356 20.20898438 7.93554688 C27.70703021 10.87294375 35.20032833 13.82192546 42.67578125 16.81640625 C42.67578125 19.12640625 42.67578125 21.43640625 42.67578125 23.81640625 C3.73578125 23.81640625 -35.20421875 23.81640625 -75.32421875 23.81640625 C-75.32421875 21.50640625 -75.32421875 19.19640625 -75.32421875 16.81640625 C-65.32167159 12.5505188 -55.19940176 8.60183751 -45.06665039 4.65820312 C-42.23584568 3.55633537 -39.40595242 2.45215123 -36.57617188 1.34765625 C-34.7721878 0.64439687 -32.9681532 -0.05873294 -31.1640625 -0.76171875 C-30.32036606 -1.09085266 -29.47666962 -1.41998657 -28.60740662 -1.75909424 C-27.82551468 -2.06321228 -27.04362274 -2.36733032 -26.23803711 -2.68066406 C-25.20978065 -3.08106903 -25.20978065 -3.08106903 -24.16075134 -3.48956299 C-15.51577738 -6.75652263 -8.16793155 -3.25293129 0 0 Z " fill="#080808" transform="translate(89.32421875,26.18359375)"/>
<path d="M0 0 C2.31 0 4.62 0 7 0 C10.96 12.21 14.92 24.42 19 37 C22.48713952 27.44304577 22.48713952 27.44304577 25.9699707 17.88452148 C26.40913818 16.68384033 26.84830566 15.48315918 27.30078125 14.24609375 C27.74591064 13.02591553 28.19104004 11.8057373 28.6496582 10.54858398 C30.00676822 6.98221369 31.47260441 3.49595164 33 0 C35.30761719 0.05151367 35.30761719 0.05151367 38 1 C39.31847865 3.45569568 40.21101142 5.56144688 41.078125 8.17578125 C41.46348419 9.25813301 41.46348419 9.25813301 41.85662842 10.36235046 C42.67383888 12.67277429 43.46184986 14.9920226 44.25 17.3125 C44.79503255 18.86458052 45.34188695 20.41602256 45.890625 21.96679688 C49.85965425 33.25995633 49.85965425 33.25995633 51 38 C51.35827881 36.88439697 51.71655762 35.76879395 52.08569336 34.61938477 C53.41139191 30.49420382 54.74108961 26.37032134 56.07202148 22.24682617 C56.64831579 20.45941972 57.22351396 18.67165947 57.79760742 16.88354492 C58.62132834 14.31856754 59.4489382 11.75487388 60.27734375 9.19140625 C60.53466782 8.3872377 60.79199188 7.58306915 61.05711365 6.75453186 C62.88612829 1.11387171 62.88612829 1.11387171 64 0 C65.99958364 -0.04080783 68.00045254 -0.04254356 70 0 C68.53832799 6.1728981 66.72443575 12.16337585 64.7421875 18.1875 C64.43427277 19.13061035 64.12635803 20.0737207 63.80911255 21.04541016 C62.83365868 24.03112569 61.8543926 27.01557444 60.875 30 C60.2093823 32.03507348 59.54401516 34.07022893 58.87890625 36.10546875 C57.25550092 41.07126423 55.62897132 46.03602778 54 51 C51.525 51.495 51.525 51.495 49 52 C48.41714233 50.33445068 48.41714233 50.33445068 47.82250977 48.63525391 C46.38325442 44.52361939 44.9422594 40.41259639 43.50073242 36.30175781 C42.87655777 34.52100036 42.2528578 32.74007646 41.62963867 30.95898438 C40.73480374 28.40190636 39.83827473 25.84542786 38.94140625 23.2890625 C38.6622084 22.49005524 38.38301056 21.69104797 38.09535217 20.86782837 C36.71275509 16.86603017 36.71275509 16.86603017 35 13 C30.38 25.87 25.76 38.74 21 52 C19.68 52 18.36 52 17 52 C13.87947927 44.36468333 11.26978226 36.75273998 9.02783203 28.82617188 C7.04547763 21.92429783 4.67257325 15.17632797 2.23486328 8.42358398 C1.94466309 7.61477783 1.65446289 6.80597168 1.35546875 5.97265625 C1.09403076 5.25343994 0.83259277 4.53422363 0.56323242 3.79321289 C0 2 0 2 0 0 Z " fill="#0B0B0B" transform="translate(245,49)"/>
<path d="M0 0 C1.98 0 3.96 0 6 0 C6.34667725 0.77375977 6.69335449 1.54751953 7.05053711 2.34472656 C7.8099356 4.03953224 8.56934542 5.73433285 9.32894897 7.42904663 C10.79277918 10.69494032 12.255864 13.96116411 13.7175293 17.22802734 C16.41424295 23.25240368 19.11727315 29.27308907 21.8671875 35.2734375 C22.28492432 36.18834961 22.70266113 37.10326172 23.13305664 38.04589844 C23.90365188 39.73096739 24.67869332 41.41401207 25.45874023 43.09472656 C28 48.66537045 28 48.66537045 28 52 C26.02 52 24.04 52 22 52 C20.35 48.37 18.7 44.74 17 41 C7.76 41 -1.48 41 -11 41 C-12.65 44.63 -14.3 48.26 -16 52 C-18.31 52 -20.62 52 -23 52 C-15.49685193 34.59218168 -7.78469139 17.2831905 0 0 Z " fill="#0F0F0F" transform="translate(213,49)"/>
<path d="M0 0 C1.2065625 0.0309375 1.2065625 0.0309375 2.4375 0.0625 C14.92197772 26.83609061 14.92197772 26.83609061 20.6875 39.5625 C21.05738037 40.37299805 21.42726074 41.18349609 21.80834961 42.01855469 C22.14487549 42.76524414 22.48140137 43.51193359 22.828125 44.28125 C23.11719727 44.91998047 23.40626953 45.55871094 23.70410156 46.21679688 C24.46917573 48.14221654 24.98032135 50.04376002 25.4375 52.0625 C23.1275 52.0625 20.8175 52.0625 18.4375 52.0625 C16.7875 48.4325 15.1375 44.8025 13.4375 41.0625 C-0.4225 40.5675 -0.4225 40.5675 -14.5625 40.0625 C-15.5525 43.0325 -16.5425 46.0025 -17.5625 49.0625 C-18.2225 50.0525 -18.8825 51.0425 -19.5625 52.0625 C-22.6875 52.25 -22.6875 52.25 -25.5625 52.0625 C-23.52671911 45.49652077 -21.00286808 39.28045367 -18.1484375 33.03125 C-17.73332916 32.11412231 -17.31822083 31.19699463 -16.89053345 30.2520752 C-16.02028363 28.33180354 -15.14788961 26.41250229 -14.2734375 24.49414062 C-12.9296678 21.54531268 -11.59323938 18.59323915 -10.2578125 15.640625 C-9.40927944 13.7706403 -8.560336 11.90084175 -7.7109375 10.03125 C-7.30990814 9.14594604 -6.90887878 8.26064209 -6.49569702 7.34851074 C-6.12506134 6.53676392 -5.75442566 5.72501709 -5.37255859 4.88867188 C-5.04629486 4.17191284 -4.72003113 3.45515381 -4.38388062 2.7166748 C-3.09982145 0.13071371 -3.03952539 0.07413477 0 0 Z " fill="#0F0F0F" transform="translate(381.5625,48.9375)"/>
<path d="M0 0 C9.9 0 19.8 0 30 0 C30 1.98 30 3.96 30 6 C22.08 6 14.16 6 6 6 C6 11.61 6 17.22 6 23 C12.27 23 18.54 23 25 23 C25 24.98 25 26.96 25 29 C19.06 29 13.12 29 7 29 C7 34.61 7 40.22 7 46 C14.92 46 22.84 46 31 46 C31 47.98 31 49.96 31 52 C20.77 52 10.54 52 0 52 C0 34.84 0 17.68 0 0 Z " fill="#0F0F0F" transform="translate(453,49)"/>
<path d="M0 0 C9.9 0 19.8 0 30 0 C30 1.98 30 3.96 30 6 C22.08 6 14.16 6 6 6 C6 11.61 6 17.22 6 23 C12.27 23 18.54 23 25 23 C25 24.98 25 26.96 25 29 C18.73 29 12.46 29 6 29 C6 34.61 6 40.22 6 46 C13.92 46 21.84 46 30 46 C30 47.98 30 49.96 30 52 C20.1 52 10.2 52 0 52 C0 34.84 0 17.68 0 0 Z " fill="#0B0B0B" transform="translate(322,49)"/>
<path d="M0 0 C3.41524351 1.89586352 5.6757776 3.9418886 7.75 7.3125 C7.75 8.3025 7.75 9.2925 7.75 10.3125 C5.94921875 10.99609375 5.94921875 10.99609375 3.75 11.3125 C2.14453125 10.09765625 2.14453125 10.09765625 0.5625 8.375 C-2.26404408 5.76166506 -4.06618231 4.82121328 -7.9375 4.6875 C-10.93667688 4.91820591 -12.2323815 5.3020128 -14.875 6.875 C-16.52013917 9.35476244 -16.52013917 9.35476244 -16.375 12.8125 C-15.2418148 16.33796508 -14.50729595 17.54210668 -11.328125 19.35546875 C-8.65249909 20.58766489 -5.92450513 21.6612652 -3.1875 22.75 C3.09607198 25.28055873 5.99278728 27.67668092 9.75 33.3125 C10.50880093 37.94471499 10.16508256 41.48233489 8.0625 45.6875 C4.21767119 50.05190027 0.3726662 51.8971191 -5.328125 52.55078125 C-11.1239861 52.74884125 -15.54974235 51.83769324 -20.25 48.3125 C-25.25 42.86347087 -25.25 42.86347087 -25.25 39.3125 C-23.6 38.6525 -21.95 37.9925 -20.25 37.3125 C-19.651875 38.26125 -19.05375 39.21 -18.4375 40.1875 C-16.43437474 43.45214197 -16.43437474 43.45214197 -13.25 45.3125 C-7.91028564 46.09775211 -3.61209514 46.17690653 1 43.25 C3.05921563 40.36333779 3.05921563 40.36333779 2.75 36.6875 C1.60904012 32.82279314 1.60904012 32.82279314 -1.25 30.3125 C-3.84353905 29.16987211 -6.42936508 28.10255261 -9.0625 27.0625 C-20.80692353 22.12533712 -20.80692353 22.12533712 -23.25 16.3125 C-23.98398133 13.11323786 -24.02360097 10.50578519 -23.25 7.3125 C-17.8166008 -1.31701638 -9.27462276 -4.24081264 0 0 Z " fill="#0B0B0B" transform="translate(436.25,49.6875)"/>
<path d="M0 0 C3.63 0 7.26 0 11 0 C11 17.16 11 34.32 11 52 C7.37 52 3.74 52 0 52 C0 34.84 0 17.68 0 0 Z " fill="#FDFDFD" transform="translate(78,66)"/>
<path d="M0 0 C3.63 0 7.26 0 11 0 C11 17.16 11 34.32 11 52 C7.37 52 3.74 52 0 52 C0 34.84 0 17.68 0 0 Z " fill="#FDFDFD" transform="translate(57,66)"/>
<path d="M0 0 C3.3 0 6.6 0 10 0 C10 17.16 10 34.32 10 52 C6.7 52 3.4 52 0 52 C0 34.84 0 17.68 0 0 Z " fill="#F2F2F2" transform="translate(99,66)"/>
<path d="M0 0 C3.3 0 6.6 0 10 0 C10 17.16 10 34.32 10 52 C6.7 52 3.4 52 0 52 C0 34.84 0 17.68 0 0 Z " fill="#F2F2F2" transform="translate(37,66)"/>
<path d="M0 0 C1.98 0 3.96 0 6 0 C6 15.18 6 30.36 6 46 C13.59 46 21.18 46 29 46 C29 47.98 29 49.96 29 52 C19.43 52 9.86 52 0 52 C0 34.84 0 17.68 0 0 Z " fill="#0C0C0C" transform="translate(157,49)"/>
<path d="M0 0 C0.66 0 1.32 0 2 0 C3.67257264 3.78908876 5.33705115 7.58167885 7 11.375 C7.47695312 12.45523438 7.95390625 13.53546875 8.4453125 14.6484375 C8.89648438 15.6796875 9.34765625 16.7109375 9.8125 17.7734375 C10.23144531 18.72653809 10.65039062 19.67963867 11.08203125 20.66162109 C12 23 12 23 12 25 C4.74 25 -2.52 25 -10 25 C-6.625 14.875 -6.625 14.875 -5.17578125 11.62109375 C-4.86962891 10.92822266 -4.56347656 10.23535156 -4.24804688 9.52148438 C-3.93931641 8.83376953 -3.63058594 8.14605469 -3.3125 7.4375 C-2.99216797 6.71498047 -2.67183594 5.99246094 -2.34179688 5.24804688 C-1.56487057 3.49706371 -0.78297505 1.74828676 0 0 Z " fill="#F7F7F7" transform="translate(215,58)"/>
<path d="M0 0 C3.3437141 3.8711138 5.15154753 8.4273026 7.1875 13.0625 C7.55552734 13.87783203 7.92355469 14.69316406 8.30273438 15.53320312 C8.65013672 16.31759766 8.99753906 17.10199219 9.35546875 17.91015625 C9.82956177 18.97955444 9.82956177 18.97955444 10.31323242 20.07055664 C11 22 11 22 11 25 C3.74 25 -3.52 25 -11 25 C-9.9275 22.36 -8.855 19.72 -7.75 17 C-7.4209668 16.1853125 -7.09193359 15.370625 -6.75292969 14.53125 C-4.71941998 9.56097951 -2.45369759 4.77711035 0 0 Z " fill="#F8F8F8" transform="translate(381,58)"/></svg>
      </div>
  
      {/* Right side - Signup form */}
      <div className="w-2/3 flex items-center justify-center p-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Create an Account
            </CardTitle>
            <CardDescription className="text-center">
              Choose your account type and enter your details to get started.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Account Type Selection */}
            <div className="mb-6">
              <Label>Account Type</Label>
              <div className="flex mt-2">
                <div className="inline-flex rounded-md shadow-sm" role="group">
                  <button
                    type="button"
                    className={`px-4 py-2 text-sm font-medium rounded-l-lg focus:z-10 focus:ring-2 focus:ring-primary transition-colors ${
                      accountType === 'user' ? 'bg-black text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                    onClick={() => setAccountType('user')}
                  >
                    User
                  </button>
                  <button
                    type="button"
                    className={`px-4 py-2 text-sm font-medium rounded-r-lg focus:z-10 focus:ring-2 focus:ring-primary transition-colors ${
                      accountType === 'Provider' ? 'bg-black text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                    onClick={() => setAccountType('Provider')}
                  >
                    Provider
                  </button>
                </div>
              </div>
            </div>
  
            {/* Step 1: Email and OTP */}
            {!otpSent ? (
              <form onSubmit={handleSendOTP} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={emailData.email}
                    onChange={handleEmailChange}
                    placeholder="john@example.com" 
                    required 
                  />
                </div>
                <Button className="w-full" type="submit">
                  Send OTP
                </Button>
              </form>
            ) : (
              /* Step 2: Complete Signup Form */
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input 
                      id="firstName" 
                      value={signupData.firstName}
                      onChange={handleSignupDataChange}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                      id="lastName" 
                      value={signupData.lastName}
                      onChange={handleSignupDataChange}
                      required 
                    />
                  </div>
                </div>
  
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password"
                    value={signupData.password}
                    onChange={handleSignupDataChange}
                    required 
                  />
                </div>
  
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input 
                    id="confirmPassword" 
                    type="password"
                    value={signupData.confirmPassword}
                    onChange={handleSignupDataChange}
                    required 
                  />
                </div>
  
                <div className="space-y-2">
                  <Label htmlFor="otp">OTP</Label>
                  <Input 
                    id="otp" 
                    value={signupData.otp}
                    onChange={handleSignupDataChange}
                    placeholder="Enter OTP" 
                    required 
                  />
                </div>
  
                <Button className="w-full" type="submit">
                  Sign Up
                </Button>
              </form>
            )}
  
            {/* Google Sign In */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
  
              <div className="mt-4 flex justify-center">
              <div className="mt-4 flex justify-center">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                    theme="outline"
                    size="large"
                    text="continue_with"
                    shape="rectangular"
                    useOneTap={false}
                  />
                </div>
              </div>
            </div>
  
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <a href="/login" className="text-primary hover:underline">
                Login
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}