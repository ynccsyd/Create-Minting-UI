import { useRouter } from "next/router";
import { Button, Text, HStack } from "@chakra-ui/react";
import { MouseEventHandler, useCallback, useEffect, useMemo, useState } from "react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import type { NextPage } from "next"
import { PublicKey } from "@solana/web3.js";
import { Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react"

interface NewMintProps {
    mint: PublicKey;
}
const Home: NextPage<NewMintProps> = ({ mint }) => {
    const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
        async (event) => {
          if (event.defaultPrevented) return;
          if (!walletAdapter.connected || !candyMachine) return;
      
          try {
            setIsMinting(true);
            const nft = await metaplex.candyMachines().mint({ candyMachine }).run();
      
            console.log(nft);
            router.push(`/newMint?mint=${nft.nft.address.toBase58()}`);
          } catch (error) {
            alert(error);
          } finally {
            setIsMinting(false);
          }
        },
        [metaplex, walletAdapter, candyMachine]
    );
  
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
    }, [mint, metaplex, walletAdapter])
    const router = useRouter()

    

    return (
        <MainLayout>
            {/* REST OF YOUR CODE */}
            <Image src={metadata?.image ?? ""} alt="" />
            <Button
                bgColor="accent"
                color="white"
                maxWidth="380px"
                onClick={handleClick}
            >
                <HStack>
                    <Text>stake my buildoor</Text>
                    <ArrowForwardIcon />
                </HStack>
            </Button>
        </MainLayout>
    );
}
export default NewMint


NewMint.getInitialProps = async ({ query }) => {
    const { mint } = query;
    if (!mint) throw { error: "No mint" };

    try {
        const mintPubkey = new PublicKey(mint);
        return { mint: mintPubkey };
    } catch {
        throws({ error: "Invalid mint" });
    }
};