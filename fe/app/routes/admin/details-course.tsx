import { Button } from "~/components/ui/button";
import { redirect, useLoaderData } from "react-router";
import { ABI } from "~/constant/ABI";
import { CONTRACT_ADDRESS, CONTRACT_PHD_TOKEN } from "~/constant/CA";
import { createPublicClient, http } from "viem";
import { monadTestnet } from "viem/chains";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { useEffect, useState } from "react";
import BN from "bn.js";
import type { Route } from "../../+types/root";
import { User } from "lucide-react";
import { toast } from "sonner";

export async function loader({ params }: Route.LoaderArgs) {
  if (isNaN(Number(params.id))) {
    return redirect("/404");
  }

  if (params && params.id) {
    const client = createPublicClient({ chain: monadTestnet, transport: http() });
    const data = await client.readContract({
      abi: ABI,
      address: CONTRACT_ADDRESS,
      functionName: "getStudents",
      args: [BigInt(params.id)],
    });

    if ((data as Record<string, string>).title === "") {
      return redirect("/404");
    }

    return {
      students: data,
      idCourse: params.id,
    };
  } else {
    return redirect("/404");
  }
}

export default function Details() {
  const loaderData = useLoaderData();
  const { students, idCourse } = loaderData;

  // const [loading, setLoading] = useState(false);

  /* -------------------------------------------------------------------------- */
  /*                                   Enroll                                   */
  /* -------------------------------------------------------------------------- */
  const {
    data: dataHasMarkAsCompleted,
    error: errorMarkAsCompleted,
    isPending: isPendingMarkAsCompleted,
    writeContract: doMarkAsCompleted,
  } = useWriteContract();

  const {
    data: dataReceiptMarkAsCompleted,
    isLoading: isLoadingReceiptMarkAsCompleted,
    error: errorWaitingReceipt,
    isSuccess: isSuccessWaitingMarkAsCompleted,
  } = useWaitForTransactionReceipt({
    hash: dataHasMarkAsCompleted,
  });

  useEffect(() => {
    if (isSuccessWaitingMarkAsCompleted) {
      toast.success(`Success marked student as completed the course`);
    }
  }, [isSuccessWaitingMarkAsCompleted]);

  return (
    <div className="flex flex-col gap-12 w-full">
      {(students as Array<string>).map((item, idx) => (
        <div className="flex flex-col col-span-full gap-4" key={idx}>
          <div className="flex flex-row gap-4 items-center">
            <User className="size-4" />
            {item}
          </div>
          <Button
            className="w-max"
            onClick={() => {
              doMarkAsCompleted({
                abi: ABI,
                address: CONTRACT_ADDRESS,
                functionName: "markCompleted",
                args: [idCourse, item],
              });
            }}
          >
            Mark As Complete
          </Button>
        </div>
      ))}
    </div>
  );
}
