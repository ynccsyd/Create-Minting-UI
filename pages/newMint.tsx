// import { Button, Text, HStack, Container} from "@chakra-ui/react";
// import { useEffect, useMemo, useState } from "react";
// import { ArrowForwardIcon } from "@chakra-ui/icons";
// import type { NextPage } from "next"
// import { PublicKey } from "@solana/web3.js";

// import { Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js";
// import { useConnection, useWallet } from "@solana/wallet-adapter-react";

// import Image from 'next/image'
// interface NewMintProps {
//   mint: PublicKey;
// }

// const Home: NextPage<NewMintProps> = ({ mint }) => {
//     const [metadata, setMetadata] = useState<any>()
//     const { connection } = useConnection()
//     const walletAdapter = useWallet()
//     const metaplex = useMemo(() => {
//         return Metaplex.make(connection).use(walletAdapterIdentity(walletAdapter))
//     }, [connection, walletAdapter])

//     useEffect(() => {
//         // What this does is to allow us to find the NFT object
//         // based on the given mint address
//         metaplex.nfts().findByMint({ mintAddress: mint }).run()
//             .then((nft) => {
//                 // We then fetch the NFT uri to fetch the NFT metadata
//                 fetch(nft.uri)
//                     .then((res) => res.json())
//                     .then((metadata) => {
//                         setMetadata(metadata)
//                     })
//             })
//     }, [mint, metaplex, walletAdapter])


//   return (
//       <Container>
//           <Image src={metadata?.image ?? ""} alt="" />
//           <Button bgColor="accent" color="white" maxW="380px" >
//               <HStack>
//                   <Text>stake my buildoor</Text>
//                   <ArrowForwardIcon />
//               </HStack>
//           </Button>
//       </Container>
//   );
// };
// export default Home
// // export default NewMint

// // NewMint.getInitialProps = async ({ query }) => {
// //     const { mint } = query;
// //     if (!mint) throw { error: "No mint" };

// //     try {
// //       const mintPubkey = new PublicKey(mint);
// //       return { mint: mintPubkey };
// //     } catch {
// //       throws({ error: "Invalid mint" });
// //     }
// //   };

import type { NextPage } from "next"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import MainLayout from "../components/MainLayout"
import {
  Container,
  Heading,
  VStack,
  Text,
  Image,
  Button,
  HStack,
} from "@chakra-ui/react"
import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"
import { ArrowForwardIcon } from "@chakra-ui/icons"
import { PublicKey } from "@solana/web3.js";
import { Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js"

interface NewMintProps {
  mint: PublicKey;
}

const Home: NextPage<NewMintProps> = ({ mint }) => {
  const [metadata, setMetadata] = useState<any>()
  const { connection } = useConnection()
  const walletAdapter = useWallet()
  const metaplex = useMemo(() => {
    return Metaplex.make(connection).use(walletAdapterIdentity(walletAdapter))
  }, [connection, walletAdapter])

  useEffect(() => {
    // What this does is to allow us to find the NFT object
    // based on the given mint address
    metaplex.nfts().findByMint({ mintAddress: mint }).run()
      .then((nft) => {
        // We then fetch the NFT uri to fetch the NFT metadata
        fetch(nft.uri)
          .then((res) => res.json())
          .then((metadata) => {
            setMetadata(metadata)
          })
      })
  }, [mint, metaplex, walletAdapter]);


  return (
    <MainLayout>
      <VStack spacing={20}>
        <Container>
          <VStack spacing={8}>
            <Heading color="white" as="h1" size="2xl" textAlign="center">
              😮 A new buildoor has appeared!
            </Heading>

            <Text color="bodyText" fontSize="xl" textAlign="center">
              Congratulations, you minted a lvl 1 buildoor! <br />
              Time to stake your character to earn rewards and level up.
            </Text>
          </VStack>
        </Container>

      </VStack>
      <Image src={metadata?.image ?? ""} alt="" />
      <Button
        bgColor="accent"
        color="white"
        maxW="380px"

      >
        <HStack>
          <Text>stake my buildoor</Text>
          <ArrowForwardIcon />
        </HStack>
      </Button>
    </MainLayout>

  )
}