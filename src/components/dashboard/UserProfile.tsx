import { useRouter } from "next/navigation";
import CommonImage from "@/components/common/Image";
import { Button } from "@/components/ui/button";
import ProfilePicture from "@/components/dashboard/ProfilePicture";
import ChangePassword from "@/components/dashboard/ChangePassword";

const UserProfile: React.FC = () => {
  const router = useRouter();

  return (
    <div className="user-section p-5">
      <div className="user-profile gap-2 flex flex-col items-center">
        <CommonImage
          classname="user-profile"
          src="/dashboard-images/default_profile_pic.webp"
          alt="Profile Image"
          width={100}
          height={100}
        />
        <p>Shivam test Fresh sale</p>
        <p>
          <strong>Unique ID:</strong> 043431RY
        </p>
      </div>
      <div className="profile-list mt-5">
        <ul className="flex flex-col gap-2">
          <li>
            <Button
              className="w-full flex justify-start p-2 h-11"
              variant="outline"
              onClick={() => router.push("/student-dashboard/profile_info")} // ✅ Navigate to profile
            >
              <CommonImage
                classname="view-profile"
                src="/dashboard-images/Edit_Profile.webp"
                alt="Profile Image"
                width={25}
                height={25}
              />
              View Profile
            </Button>
          </li>
          <li>
            <ProfilePicture />
          </li>
          <li>
            <ChangePassword />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;
