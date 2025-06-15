import { Button } from "~/components/ui/button";
import { redirect, useLoaderData } from "react-router";
import type { Route } from "./+types/course-details";
import { ABI } from "~/constant/ABI";
import { CONTRACT_ADDRESS, CONTRACT_PHD_TOKEN } from "~/constant/CA";
import { createPublicClient, http } from "viem";
import { monadTestnet } from "viem/chains";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { useEffect, useState } from "react";
import BN from "bn.js";

export async function loader({ params }: Route.LoaderArgs) {
  if (isNaN(Number(params.id))) {
    return redirect("/404");
  }

  if (params && params.id) {
    const client = createPublicClient({ chain: monadTestnet, transport: http() });
    const data = await client.readContract({
      abi: ABI,
      address: CONTRACT_ADDRESS,
      functionName: "getCourse",
      args: [BigInt(params.id)],
    });

    if ((data as Record<string, string>).title === "") {
      console.log("kosong bang");
      return redirect("/404");
    }

    return {
      detail: data,
    };
  } else {
    return redirect("/404");
  }
}

export default function Details() {
  const loaderData = useLoaderData();
  const { detail } = loaderData;

  const [loading, setLoading] = useState(false);

  /* -------------------------------------------------------------------------- */
  /*                                   Enroll                                   */
  /* -------------------------------------------------------------------------- */
  const {
    data: dataHashEnroll,
    error: errorEnroll,
    isPending: isPendingEnroll,
    writeContract: doEnroll,
  } = useWriteContract();

  const {
    data: dataReceiptEnroll,
    isLoading: isLoadingReceiptEnroll,
    error: errorWaitingReceipt,
  } = useWaitForTransactionReceipt({
    hash: dataHashEnroll,
  });

  /* -------------------------------------------------------------------------- */
  /*                                   approve                                  */
  /* -------------------------------------------------------------------------- */
  const {
    data: approveHash,
    writeContract: writeApprove,
    isPending: isApproving,
    error: errorApprove,
  } = useWriteContract();

  function handleApprove() {
    // const
    const amountInWei = new BN(detail.stakeAmount).mul(new BN(10).pow(new BN(18)));

    writeApprove({
      abi: ABI,
      address: CONTRACT_PHD_TOKEN,
      functionName: "approve",
      args: [CONTRACT_ADDRESS, amountInWei],
    });
  }

  const { data: approveReceipt, isLoading: isWaitingForApproval } = useWaitForTransactionReceipt({
    hash: approveHash,
  });

  useEffect(() => {
    console.log("approveReceipt", approveReceipt);
    if (approveReceipt?.status === "success") {
      doEnroll({
        abi: ABI,
        address: CONTRACT_ADDRESS,
        functionName: "enrollInCourse",
        args: [detail.id],
      });
    }
  }, [approveReceipt]);

  useEffect(() => {
    setLoading(isPendingEnroll || isLoadingReceiptEnroll);
  }, [isPendingEnroll, isLoadingReceiptEnroll]);

  useEffect(() => {
    console.log(errorEnroll, errorWaitingReceipt);
  }, [errorEnroll, errorWaitingReceipt]);

  useEffect(() => {
    console.log("on render");
  }, []);

  return (
    <div className="flex flex-col gap-12 w-full">
      <div className="flex flex-col col-span-full gap-4">
        <p className="text-5xl">{detail.title}</p>
        <div className="flex flex-row gap-4 items-center">
          <div className="bg-white h-[1px] w-1/5"></div>
          <p className="text-xl">Lorem Ipsum</p>
        </div>
      </div>
      {/* <div className="flex flex-col gap-8"> */}
      <img src={detail.uri} alt="" className="aspect-[16/9] object-cover w-full rounded-lg" />
      {/* </div> */}
      <div className="flex flex-col gap-8 text-justify text-xl tracking-wide">
        {detail.description} -- Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit eum
        quod iste laborum, voluptatibus, similique possimus ipsum exercitationem fuga suscipit quas
        totam. Ipsam neque molestiae, nisi at iste ipsa commodi!
      </div>

      <Button className="w-max" size="lg" onClick={handleApprove}>
        Enroll
      </Button>
    </div>
  );
}
