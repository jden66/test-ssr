import React from "react";

function Home({ username }) {
  return (
    <div>
      <h3>This is home page</h3>
      {username && <p>{`${username}님 하이요`}</p>}
    </div>
  );
}

export default Home;
