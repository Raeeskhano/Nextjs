import Link from "next/link";
import React from "react";

const user = () => {
  return (
    <div>
      <h1>Dashboard users</h1>
      <ul className="mt-10">
        <li>
          {" "}
          <Link href="/dashboard/user/1">user 1</Link>
        </li>
        <li>
          {" "}
          <Link href="/dashboard/user/2">user 2</Link>
        </li>
        <li>
          {" "}
          <Link href="/dashboard/user/3">user 3</Link>
        </li>
        <li>
          {" "}
          <Link href="/dashboard/user/4">user 4</Link>
        </li>
      </ul>
    </div>
  );
};

export default user;
