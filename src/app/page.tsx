import { FormComponent } from "@/components/form";
import { TableUsers } from "@/components/table";

export default function Home() {
  return (
    <main className="flex items-center justify-center">
      <div className="mt-10">
        <FormComponent />
        <TableUsers />
      </div>
    </main>
  );
}
