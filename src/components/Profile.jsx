import React, {useEffect, useState} from "react";
import {loadCurrentUserProfile} from "../service/HttpService";

const Profile = () => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    loadCurrentUserProfile().then(res => setProfile(res.data)).catch(err => console.log(err));
  }, []);

  return <div className={"container mt-4"}>
    <div className="card">
      <div className="card-body">
        <div className="text-center">
          <i style={{fontSize: "8rem", color: "#D3D3D3"}} className="fas fa-user-circle"/>
          <p>Username: {profile.userName}</p>
          <p>Name: {profile.name}</p>
        </div>
      </div>
    </div>
  </div>;
}

export default Profile;
