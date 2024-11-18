import ProfileData from '@/components/profile/ProfileData';
import UserProfileLayout from '@/components/user-profile-layout/UserProfileLayout';

export function ProfilePage() {
  return (
    <>
      <UserProfileLayout>
        <ProfileData />
      </UserProfileLayout>
    </>
  );
}
