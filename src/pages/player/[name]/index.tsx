import React from "react";
import { useSession } from "next-auth/react";
import { fetchPlayerSingle } from "@utils/data-fetching";

const Player = ({ player }: any) => {
  return <div>{player.name}</div>;
};

export async function getServerSideProps(context: any) {
  const player = await fetchPlayerSingle(context.params.name);
  console.log("Player fetched:", player);
  console.log("Context Params:", context.params);
  return {
    props: {
      player,
    }
  }
}

export default Player;
