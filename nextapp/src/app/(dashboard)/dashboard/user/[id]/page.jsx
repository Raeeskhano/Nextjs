import React from "react";

const UserDetails = async ({ params }) => {
  const { id } = await params;
  return <div className="h-screen">User details for ID: {id}</div>;
};

export default UserDetails;
