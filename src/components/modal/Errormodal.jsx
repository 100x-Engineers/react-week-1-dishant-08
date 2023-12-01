import Button from "../button";

export default function ErrorModal() {
  return (
    <>
      <div className=" flex w-screen h-screen items-center justify-center ">
        <div className="flex w-[22.3125rem] p-10 flex-col gap-10 rounded-2xl bg-neutral-1000  ">
          <div className="flex flex-col items-start gap-3 self-stretch">
            <p className="font-Inter text-2xl font-bold text-neutral-50">
              {" "}
              Error
            </p>
            <p className="font-Inter text-xs  text-neutral-500">
              {" "}
              Oops, something went wrong. Please try again later.
            </p>
          </div>
          <Button variant="default" type="small">
            OK
          </Button>
        </div>
      </div>
    </>
  );
}
