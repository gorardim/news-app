import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../queries/me";
import { UPDATE_PROFILE, UPDATE_PASSWORD } from "../graphql/mutations";
import { useState, useEffect } from "react";

const UpdateMe = () => {
  const { loading: queryLoading, error, data } = useQuery(GET_ME);
  const [updateProfile, { loading: updateProfileLoading, error: updateProfileError }] = useMutation(UPDATE_PROFILE);
  const [updatePassword, { loading: updatePasswordLoading, error: updatePasswordError }] = useMutation(UPDATE_PASSWORD);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });
  const [password, setPassword] = useState({
    current_password: "",
    password: "",
    password_confirmation: "",
  });

  useEffect(() => {
    if (data) {
      const { me } = data;
      if(!me) {
        window.location.replace("/login");
      }
      setProfile({
        name: me.name,
        email: me.email,
      });
    } 
  }, [data]);

  if (queryLoading) return null;
  if (error) return null;

  const handleProfileChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile({ variables: profile });
    } catch (error) {
      console.log("Update profile error:", error);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePassword({ variables: password });
    } catch (error) {
      console.log("Update password error:", error);
    }
  };

  const handelLogout = () => {
    localStorage.removeItem("token");
    window.location.replace("/login");
  }

  return (
    <>
    {/* create a back button to go to home route */}
    <div className="container d-flex align-items-center justify-content-center">
        <div className="col-md-6">
            <div className="card">
                <div className="card-header">
                    <h5>Update Profile</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={handleProfileSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Name
                            </label>
                            <input type="text" className="form-control" id="name" name="name" value={profile.name} onChange={handleProfileChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email address
                            </label>
                            <input type="email" className="form-control" id="email" name="email" value={profile.email} onChange={handleProfileChange} />
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={updateProfileLoading}>
                            Update Profile
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div className="container d-flex align-items-center justify-content-center mt-5">
        <div className="col-md-6">
            <div className="card">
                <div className="card-header">
                    <h5>Update Password</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={handlePasswordSubmit}>
                        <div className="mb-3">
                            <label htmlFor="current_password" className="form-label">
                                Current Password
                            </label>
                            <input type="password" className="form-control" id="current_password" name="current_password" value={password.current_password} onChange={handlePasswordChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                New Password
                            </label>
                            <input type="password" className="form-control" id="password" name="password" value={password.password} onChange={handlePasswordChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password_confirmation" className="form-label">
                                Confirm New Password
                            </label>
                            <input type="password" className="form-control" id="password_confirmation" name="password_confirmation" value={password.password_confirmation} onChange={handlePasswordChange} />
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={updatePasswordLoading}>
                            Update Password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div className="container d-flex align-items-center justify-content-center mt-5">
        <div className="col-md-6">
            <div className="d-grid gap-3">
                <a href="/" className="btn btn-primary">Home</a>
                <button onClick={handelLogout} className="btn btn-secondary">Logout</button>
            </div>
        </div>
    </div>
    </>
    //   <div className="container align-items-center justify-content-center vh-100">
    //     <h2>Update Profile</h2>
    //     <div className="fakeimg">
    //       <form onSubmit={handleProfileSubmit}>
    //         <div className="mb-3">
    //           <label htmlFor="name" className="form-label">
    //             Name
    //           </label>
    //           <input type="text" className="form-control input mb-3" id="name" name="name" value={profile.name} onChange={handleProfileChange} />
    //         </div>
    //         <div className="mb-3">
    //           <label htmlFor="email" className="form-label">
    //             Email address
    //           </label>
    //           <input type="email" className="form-control input mb-3" id="email" name="email" value={profile.email} onChange={handleProfileChange} />
    //         </div>
    //         <button type="submit" className="btn btn-primary" disabled={updateProfileLoading}>
    //           Update Profile
    //         </button>
    //       </form>
    //     </div>
    //     <h2 className="mt-5">Update Password</h2>
    //     <div className="fakeimg">
    //       <form onSubmit={handlePasswordSubmit}>
    //         <div className="mb-3">
    //           <label htmlFor="current_password" className="form-label">
    //             Current Password
    //           </label>
    //           <input type="password" className="form-control input mb-3" id="current_password" name="current_password" value={password.current_password} onChange={handlePasswordChange} />
    //         </div>
    //         <div className="mb-3">
    //           <label htmlFor="password" className="form-label">
    //             Password
    //           </label>
    //           <input type="password" className="form-control input mb-3" id="password" name="password" value={password.password} onChange={handlePasswordChange} />
    //         </div>
    //         <div className="mb-3">
    //           <label htmlFor="password_confirmation" className="form-label">
    //             Password Confirmation
    //           </label>
    //           <input type="password" className="form-control input mb-3" id="password_confirmation" name="password_confirmation" value={password.password_confirmation} onChange={handlePasswordChange} />
    //         </div>
    //         <button type="submit" className="btn btn-primary" disabled={updatePasswordLoading}>
    //           Update Password
    //         </button>
    //       </form>
    //     </div>
    //     <br />
    //     {/* create logout button in the center on click remove token from localstorage and redirect to login page */}
    //     <div className="container d-flex align-items-center justify-content-center mt-5">
    //         <a href="/logout" className="btn btn-primary">
    //             Logout
    //         </a>
    //     </div>
    //   </div>
    // </>
  );
};

export default UpdateMe;
