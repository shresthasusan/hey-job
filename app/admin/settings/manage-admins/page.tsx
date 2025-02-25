import AddAdminsForm from "@/app/ui/admin-components/settings-component/manage-admins-component/addAdminsForm";
import AdminList from "@/app/ui/admin-components/settings-component/manage-admins-component/adminList";

interface Admin {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export default function ManageUsers() {
  return (
    <div className="p-6">
      <AddAdminsForm />

      {/* Admin List Table */}
      <AdminList />
    </div>
  );
}
