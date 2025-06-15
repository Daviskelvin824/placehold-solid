import { LogoStaticAnimated } from "~/components/logo-static";

export default function ProfilePublic() {
  return (
    <div className="flex flex-col gap-12 w-full">
      <div className="flex flex-row gap-8 items-center">
        <img src="https://placehold.co/10" className="aspect-square h-32 rounded-full shrink" />
        <div className="flex flex-col gap-2 grow">
          <p className="text-4xl">Address</p>
          <p>Lorem</p>
        </div>
        <div className="shrink">
          <LogoStaticAnimated className="h-24" />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="bg-white h-[1px] w-3/4"></div>
      </div>
    </div>
  );
}
