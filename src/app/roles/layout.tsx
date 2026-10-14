import RolesNav from "@/components/roles/RolesNav";
import RolesBreadcrumb from "@/components/roles/RolesBreadcrumb";

export default function RolesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white min-h-screen">
      <RolesBreadcrumb />
      <RolesNav />
      {children}
    </div>
  );
}
