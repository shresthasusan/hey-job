"use client";

import { useSession } from "next-auth/react";

interface Props {
  name?: boolean;
  fullName?: boolean;
  id?: boolean;
  email?: boolean;
}

const DisplaySessionInfo = ({ name, fullName, id, email }: Props) => {
  const { data: session } = useSession();
  const user_Name = session?.user.name;
  const full_Name = session?.user.name + " " + session?.user.lastName;
  const _id = session?.user.id;
  const _email = session?.user.email;
  return (
    <>
      {name && <span>{user_Name}</span>}
      {fullName && <span>{full_Name}</span>}
      {id && <span>{_id}</span>}
      {email && <span>{_email}</span>}
    </>
  );
};

export default DisplaySessionInfo;
