import MyAnnoucements from '@/components/profile/my-annoucements/MyAnnoucements';
import UserProfileLayout from '@/components/user-profile-layout/UserProfileLayout';

export default function MyAnnoucementsPage() {
  return (
    <>
      <UserProfileLayout>
        <MyAnnoucements />
      </UserProfileLayout>
    </>
  );
}
