import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MeetupUserRepository } from "@/repository/repository";

export const TableUsers = async () => {
  const { getUsers } = new MeetupUserRepository();
  const { data } = await getUsers();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Email</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((data) => (
          <TableRow key={data.id}>
            <TableCell key={data.id}>{data.id}</TableCell>
            <TableCell key={data.id}>{data.nome}</TableCell>
            <TableCell key={data.id}>{data.email}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
